import * as React from 'react'
import { Resend } from 'resend'
import { render } from '@react-email/render'
import { ScanCompleteEmail } from '@/emails/scan-complete'
import { Day3FollowupEmail } from '@/emails/day-3-followup'
import { Day7FollowupEmail } from '@/emails/day-7-followup'

const resend = new Resend(process.env.RESEND_API_KEY!)
const FROM = 'Ryan at Driftpulse <ryan@driftpulse.dev>'

export async function sendScanCompleteEmail(params: {
  userEmail: string
  driftScore: number
  topIssues: string[]
}) {
  const html = await render(<ScanCompleteEmail {...params} />)
  return resend.emails.send({
    from: FROM,
    to: params.userEmail,
    subject: 'Your Driftpulse scan is ready',
    html,
  })
}

export async function sendDay3FollowupEmail(params: {
  userEmail: string
  issueCount: number
}) {
  const html = await render(<Day3FollowupEmail {...params} />)
  return resend.emails.send({
    from: FROM,
    to: params.userEmail,
    subject: "The drift you can't see yet",
    html,
  })
}

export async function sendDay7FollowupEmail(params: {
  userEmail: string
  scanDate: string
}) {
  const html = await render(<Day7FollowupEmail {...params} />)
  return resend.emails.send({
    from: FROM,
    to: params.userEmail,
    subject: "Last nudge (then I'll leave you alone)",
    html,
  })
}
