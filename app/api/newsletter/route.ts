import { NextResponse } from "next/server"
import { newsletterSchema } from "@/lib/validators/newsletter"

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const parsed = newsletterSchema.safeParse(json)

    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];

      return NextResponse.json(
        {
          error: firstIssue?.message ?? "Invalid subscription data",
        },
        { status: 400 },
      )
    }

    // TODO: Integrate with your newsletter provider (e.g. ConvertKit, Mailchimp, Brevo).
    console.info("Newsletter subscription", {
      email: parsed.data.email,
    })

    return NextResponse.json(
      {
        message: "You are subscribed. We will send event updates soon.",
      },
      { status: 200 },
    )
  } catch {
    return NextResponse.json(
      {
        error: "Unable to subscribe right now. Please try again.",
      },
      { status: 500 },
    )
  }
}
