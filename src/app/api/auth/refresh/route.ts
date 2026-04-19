import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  let body: { refresh_token?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request body' }, { status: 400 })
  }

  if (!body.refresh_token) {
    return NextResponse.json({ ok: false, error: 'refresh_token is required' }, { status: 400 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data, error } = await supabase.auth.refreshSession({ refresh_token: body.refresh_token })

  if (error || !data.session) {
    return NextResponse.json({ ok: false, error: 'Session expired. Please sign in again.' }, { status: 401 })
  }

  return NextResponse.json({
    ok: true,
    token: data.session.access_token,
    refresh_token: data.session.refresh_token
  })
}
