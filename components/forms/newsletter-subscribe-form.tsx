"use client";

import { useMemo } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useNewsletterApi } from "@/hooks/use-newsletter-api"
import { newsletterSchema, type NewsletterValues } from "@/lib/validators/newsletter"

const defaultValues: NewsletterValues = {
  email: "",
}

export function NewsletterSubscribeForm() {
  const { subscribe, isSubmitting, isSuccess, isError, successMessage, error, resetState } = useNewsletterApi()

  const form = useForm<NewsletterValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues,
    mode: "onTouched",
    reValidateMode: "onChange",
  })

  const statusTone = useMemo(() => {
    if (isSuccess) {
      return "text-emerald-700 bg-emerald-50 border-emerald-200"
    }

    if (isError) {
      return "text-red-700 bg-red-50 border-red-200"
    }

    return ""
  }, [isError, isSuccess])

  const onSubmit = async (values: NewsletterValues) => {
    const result = await subscribe(values)

    if (result.ok) {
      form.reset(defaultValues)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3" noValidate>
        {(isSuccess || isError) && (
          <div className={`rounded-lg border px-3 py-2 text-xs ${statusTone}`}>
            {isSuccess ? successMessage : error}
          </div>
        )}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="h-10 rounded-lg bg-secondary border-0"
                  disabled={isSubmitting}
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

        <Button
          type="submit"
          className="rounded-lg py-2.5 text-sm font-medium text-primary-foreground"
          disabled={isSubmitting}
          style={{
            background: "linear-gradient(135deg, var(--brand) 0%, var(--brand-light) 100%)",
            boxShadow: "0 4px 20px var(--brand-glow)",
          }}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Subscribing...
            </>
          ) : (
            "Subscribe"
          )}
        </Button>
      </form>
    </Form>
  )
}
