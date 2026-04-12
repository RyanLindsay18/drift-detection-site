import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import OpenAI from 'openai'

const FREE_TIER_LIMIT = 10

export async function POST(request: NextRequest) {
  console.log('[analyze] hit')

  // Get auth token from header
  const authHeader = request.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const token = authHeader.replace('Bearer ', '')

  // Verify user with Supabase
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${token}` } } }
  )

  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    console.error('[analyze] auth error:', authError)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  console.log('[analyze] user:', user.id)

  // Get user profile and check tier + usage
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: profile, error: profileError } = await supabaseAdmin
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  if (profileError || !profile) {
    console.error('[analyze] profile error:', profileError)
    return NextResponse.json({ error: 'User profile not found' }, { status: 404 })
  }

  // Reset monthly count if needed
  const now = new Date()
  const resetAt = new Date(profile.month_reset_at)
  const needsReset = now.getMonth() !== resetAt.getMonth() || 
                     now.getFullYear() !== resetAt.getFullYear()

  if (needsReset) {
    await supabaseAdmin
      .from('users')
      .update({ 
        analyses_this_month: 0, 
        month_reset_at: now.toISOString() 
      })
      .eq('id', user.id)
    profile.analyses_this_month = 0
  }

  // Check rate limit for free tier
  if (profile.tier === 'free' && profile.analyses_this_month >= FREE_TIER_LIMIT) {
    return NextResponse.json({ 
      error: 'Monthly limit reached. Upgrade to Pro for unlimited analyses.',
      upgrade: true
    }, { status: 429 })
  }

  // Parse request body
  let body: { prompt?: string; fileCount?: number; repoNameHash?: string; byoApiKey?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  if (!body.prompt) {
    return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
  }

  // Call OpenAI with our key
  const openaiKey = body.byoApiKey || process.env.OPENAI_API_KEY
  if (!openaiKey) {
    console.error('[analyze] missing OPENAI_API_KEY')
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
  }

  const client = new OpenAI({ apiKey: openaiKey })
  const startTime = Date.now()

  let resultText: string
  try {
    const response = await client.responses.create({
      model: 'gpt-4o-mini',
      input: body.prompt
    })
    resultText = response.output_text || ''
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[analyze] OpenAI error:', message)
    return NextResponse.json({ error: 'Analysis failed: ' + message }, { status: 500 })
  }

  const duration = Date.now() - startTime

  if (!resultText.trim()) {
    return NextResponse.json({ error: 'No response from AI' }, { status: 500 })
  }

  // Parse the JSON result
  let analysis: Record<string, unknown>
  try {
    const cleaned = resultText.trim().replace(/^```json\n?/, '').replace(/\n?```$/, '')
    const parsed = JSON.parse(cleaned)
    
    // Validate required fields exist
    if (typeof parsed !== 'object' || parsed === null) {
      throw new Error('Response is not an object')
    }
    if (typeof parsed.driftScore !== 'number') {
      throw new Error('Missing or invalid driftScore')
    }
    if (!Array.isArray(parsed.issues)) {
      throw new Error('Missing or invalid issues array')
    }
    
    analysis = parsed
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown parse error'
    console.error('[analyze] JSON parse error:', message)
    return NextResponse.json({ 
      error: 'Analysis returned an unexpected format. Please try again.' 
    }, { status: 500 })
  }

  // Store the run in database
  await supabaseAdmin.from('analysis_runs').insert({
    user_id: user.id,
    repo_name_hash: body.repoNameHash || null,
    file_count: body.fileCount || null,
    drift_score: typeof analysis.driftScore === 'number' ? analysis.driftScore : null,
    issue_count: Array.isArray(analysis.issues) ? analysis.issues.length : null,
    drift_summary: typeof analysis.driftSummary === 'string' ? analysis.driftSummary : null,
    next_actions: Array.isArray(analysis.nextActions) ? analysis.nextActions : null,
    model: 'gpt-4o-mini',
    duration_ms: duration
  })

  // Increment usage count
  await supabaseAdmin
    .from('users')
    .update({ analyses_this_month: profile.analyses_this_month + 1 })
    .eq('id', user.id)

  console.log('[analyze] success, drift score:', analysis.driftScore)

  return NextResponse.json({ ok: true, analysis })
}