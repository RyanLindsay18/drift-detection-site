import { Resend } from "resend";

export async function POST(request: Request) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const waitlistToEmail = process.env.WAITLIST_TO_EMAIL;

  console.log("[waitlist] hit");
  console.log("[waitlist] key present:", !!resendApiKey);
  console.log("[waitlist] to email:", waitlistToEmail ?? "NOT SET");

  if (!resendApiKey || !waitlistToEmail) {
    console.error("[waitlist] Missing env vars");
    return Response.json(
      { error: "Server configuration missing." },
      { status: 500 }
    );
  }

  let email: string | undefined;
  try {
    const body = (await request.json()) as { email?: string };
    email = body.email?.trim();
  } catch (e) {
    console.error("[waitlist] Failed to parse body:", e);
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!email) {
    return Response.json({ error: "Email is required." }, { status: 400 });
  }

  console.log("[waitlist] submitting email:", email);

  const resend = new Resend(resendApiKey);

  try {
    const result = await resend.emails.send({
      from: "Drift Detection <onboarding@resend.dev>",
      to: waitlistToEmail,
      subject: "New Drift Detection beta signup",
      replyTo: email,
      text: `New beta signup: ${email}`,
    });

    console.log("[waitlist] Resend result:", JSON.stringify(result));

    if (result.error) {
      console.error("[waitlist] Resend error:", JSON.stringify(result.error));
      return Response.json(
        { error: result.error.message },
        { status: 500 }
      );
    }

    return Response.json({ ok: true, id: result.data?.id });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[waitlist] Exception:", message);
    return Response.json({ error: message }, { status: 500 });
  }
}