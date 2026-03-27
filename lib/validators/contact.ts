import { z } from "zod"

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(80, "Name must be 80 characters or less"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(120, "Email must be 120 characters or less"),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be 1000 characters or less"),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>
