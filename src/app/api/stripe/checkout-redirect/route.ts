import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const plan = req.nextUrl.searchParams.get("plan");
  if (!plan) {
    return NextResponse.redirect(new URL("/pricing", req.url));
  }
  // Redirect to dashboard where user is authenticated and can trigger checkout
  return NextResponse.redirect(
    new URL(`/dashboard?checkout=${plan}`, req.url)
  );
}