import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { sendDay3FollowupEmail, sendDay7FollowupEmail } from '@/lib/emails'

export async function GET(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET
  const authHeader = req.headers.get('authorization')

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const now = new Date()
  let day3Sent = 0
  let day7Sent = 0

  // ── Day 3 emails ──
  // Target: free users whose account is between 3 and 4 days old, not yet emailed
  const day3WindowEnd = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString()
  const day3WindowStart = new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString()

  const { data: day3Users, error: day3Error } = await supabaseAdmin
    .from('users')
    .select('id, email, created_at')
    .eq('tier', 'free')
    .eq('day3_email_sent', false)
    .gte('created_at', day3WindowStart)
    .lt('created_at', day3WindowEnd)

  if (day3Error) {
    console.error('[cron/followup] day3 query error:', day3Error)
  }

  for (const user of day3Users ?? []) {
    if (!user.email) continue

    const { data: runs } = await supabaseAdmin
      .from('analysis_runs')
      .select('issue_count')
      .eq('user_id', user.id)

    const issueCount = (runs ?? []).reduce(
      (sum: number, r: { issue_count: number | null }) => sum + (r.issue_count ?? 0),
      0
    )

    try {
      await sendDay3FollowupEmail({ userEmail: user.email, issueCount })
      await supabaseAdmin
        .from('users')
        .update({ day3_email_sent: true })
        .eq('id', user.id)
      day3Sent++
      console.log('[cron/followup] day3 sent to', user.id)
    } catch (err) {
      console.error('[cron/followup] day3 failed for', user.id, err)
    }
  }

  // ── Day 7 emails ──
  // Target: free users whose account is between 7 and 8 days old, not yet emailed
  const day7WindowEnd = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString()
  const day7WindowStart = new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000).toISOString()

  const { data: day7Users, error: day7Error } = await supabaseAdmin
    .from('users')
    .select('id, email, created_at')
    .eq('tier', 'free')
    .eq('day7_email_sent', false)
    .gte('created_at', day7WindowStart)
    .lt('created_at', day7WindowEnd)

  if (day7Error) {
    console.error('[cron/followup] day7 query error:', day7Error)
  }

  for (const user of day7Users ?? []) {
    if (!user.email) continue

    const { data: firstRun } = await supabaseAdmin
      .from('analysis_runs')
      .select('created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: true })
      .limit(1)
      .maybeSingle()

    const scanDate = firstRun
      ? new Date(firstRun.created_at).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })
      : 'recently'

    try {
      await sendDay7FollowupEmail({ userEmail: user.email, scanDate })
      await supabaseAdmin
        .from('users')
        .update({ day7_email_sent: true })
        .eq('id', user.id)
      day7Sent++
      console.log('[cron/followup] day7 sent to', user.id)
    } catch (err) {
      console.error('[cron/followup] day7 failed for', user.id, err)
    }
  }

  return NextResponse.json({ ok: true, day3Sent, day7Sent })
}
