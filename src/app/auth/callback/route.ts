import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const token_hash = requestUrl.searchParams.get('token_hash')
  const type = requestUrl.searchParams.get('type')

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  if (code) {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error && data.session) {
      const token = data.session.access_token
      return NextResponse.redirect(
        `vscode://driftpulse.driftpulse/auth/callback?token=${token}`
      )
    }
  }

  if (token_hash && type) {
    const { data, error } = await supabase.auth.verifyOtp({ token_hash, type: type as 'email' })
    if (!error && data.session) {
      const token = data.session.access_token
      return NextResponse.redirect(
        `vscode://driftpulse.driftpulse/auth/callback?token=${token}`
      )
    }
  }

  return NextResponse.redirect(new URL('/auth?error=auth_failed', request.url))
}