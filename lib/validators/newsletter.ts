import { z } from "zod"

export const newsletterSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(120, "Email must be 120 characters or less"),
})

export type NewsletterValues = z.infer<typeof newsletterSchema>
