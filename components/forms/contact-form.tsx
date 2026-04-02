"use client";

import { useMemo } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useContactApi } from "@/hooks/use-contact-api"
import { contactFormSchema, type ContactFormValues } from "@/lib/validators/contact"

const defaultValues: ContactFormValues = {
  name: "",
  email: "",
  message: "",
}

export function ContactForm() {
  const { sendMessage, isSubmitting, isSuccess, isError, successMessage, error, resetState } = useContactApi()

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
    mode: "onTouched",
    reValidateMode: "onChange",
  })

  const messageLength = form.watch("message")?.length ?? 0
  const isFormDisabled = isSubmitting

  const statusTone = useMemo(() => {
    if (isSuccess) {
      return "text-emerald-600 bg-emerald-500/10 border-emerald-500/30"
    }

    if (isError) {
      return "text-red-600 bg-red-500/10 border-red-500/30 dark:text-red-400"
    }

    return ""
  }, [isError, isSuccess])

  const onSubmit = async (values: ContactFormValues) => {
    const result = await sendMessage(values)

    if (result.ok) {
      form.reset(defaultValues)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-5" noValidate>
        {(isSuccess || isError) && (
          <div className={`rounded-xl border px-4 py-3 text-sm ${statusTone}`}>
            {isSuccess ? successMessage : error}
          </div>
        )}

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your name"
                  disabled={isFormDisabled}
                  {...field}
                  onChange={(event) => {
                    field.onChange(event)
                    if (isSuccess || isError) {
                      resetState()
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  disabled={isFormDisabled}
                  {...field}
                  onChange={(event) => {
                    field.onChange(event)
                    if (isSuccess || isError) {
                      resetState()
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us what you need"
                  rows={6}
                  maxLength={1000}
                  disabled={isFormDisabled}
                  {...field}
                  onChange={(event) => {
                    field.onChange(event)
                    if (isSuccess || isError) {
                      resetState()
                    }
                  }}
                />
              </FormControl>
              <div className="flex items-center justify-between">
                <FormMessage />
                <span className="text-xs text-muted-foreground">{messageLength}/1000</span>
              </div>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="inline-flex items-center justify-center rounded-full px-7"
          disabled={isFormDisabled}
          style={{
            background: "linear-gradient(135deg, var(--brand) 0%, var(--brand-light) 100%)",
            boxShadow: "0 4px 20px var(--brand-glow)",
          }}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Sending...
            </>
          ) : (
            "Send Message"
          )}
        </Button>
      </form>
    </Form>
  )
}
