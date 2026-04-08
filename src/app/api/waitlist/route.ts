import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const waitlistToEmail = process.env.WAITLIST_TO_EMAIL;

const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string };
    const email = body.email?.trim();

    if (!email) {
      return Response.json({ error: "Email is required." }, { status: 400 });
    }

    if (!resendApiKey || !waitlistToEmail || !resend) {
      return Response.json(
        {
          error:
            "Server email configuration is missing. Add RESEND_API_KEY and WAITLIST_TO_EMAIL.",
        },
        { status: 500 }
      );
    }

    await resend.emails.send({
      from: "Drift Detection <onboarding@resend.dev>",
      to: waitlistToEmail,
      subject: "New Drift Detection beta signup",
      replyTo: email,
      text: `New beta signup: ${email}`,
    });

    return Response.json({ ok: true });
  } catch {
    return Response.json(
      { error: "Unable to submit right now. Please try again." },
      { status: 500 }
    );
  }
}