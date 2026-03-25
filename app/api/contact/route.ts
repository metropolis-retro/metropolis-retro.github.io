import { NextResponse } from "next/server"
import { contactFormSchema } from "@/lib/validators/contact"

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const parsed = contactFormSchema.safeParse(json)

    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];

      return NextResponse.json(
        {
          error: firstIssue?.message ?? "Invalid form data",
        },
        { status: 400 },
      )
    }

    // TODO: Resend, SendGrid, Mailgun, HubSpot, or a database insert.
    const payload = parsed.data
    console.info("New contact submission", {
      name: payload.name,
      email: payload.email,
      messageLength: payload.message.length,
    })

    return NextResponse.json(
      {
        message: "Thanks for reaching out. We will get back to you soon.",
      },
      { status: 200 },
    )
  } catch {
    return NextResponse.json(
      {
        error: "Unable to process your request at the moment. Please try again.",
      },
      { status: 500 },
    )
  }
}
