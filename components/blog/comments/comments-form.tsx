import { Loader2 } from "lucide-react"
import type { UseFormReturn } from "react-hook-form"

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
import type { BlogCommentFormValues } from "@/lib/validators/blog-comment"

type CommentsFormProps = {
  form: UseFormReturn<BlogCommentFormValues>
  isSubmitting: boolean
  isError: boolean
  hasSuccess: boolean
  contentLength: number
  onSubmit: (values: BlogCommentFormValues) => Promise<void>
  onInputChange: () => void
}

export function CommentsForm({
  form,
  isSubmitting,
  isError,
  hasSuccess,
  contentLength,
  onSubmit,
  onInputChange,
}: CommentsFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-5" noValidate>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <FormField
            control={form.control}
            name="authorName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Chess player name"
                    disabled={isSubmitting}
                    {...field}
                    onChange={(event) => {
                      field.onChange(event)
                      if (hasSuccess || isError) {
                        onInputChange()
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
            name="authorEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    disabled={isSubmitting}
                    {...field}
                    onChange={(event) => {
                      field.onChange(event)
                      if (hasSuccess || isError) {
                        onInputChange()
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your comment</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Share your thoughts about this post..."
                  rows={5}
                  maxLength={1200}
                  disabled={isSubmitting}
                  {...field}
                  onChange={(event) => {
                    field.onChange(event)
                    if (hasSuccess || isError) {
                      onInputChange()
                    }
                  }}
                />
              </FormControl>
              <div className="flex items-center justify-between">
                <FormMessage />
                <span className="text-xs text-muted-foreground">{contentLength}/1200</span>
              </div>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center rounded-full px-7"
          style={{
            background: "linear-gradient(135deg, var(--brand) 0%, var(--brand-light) 100%)",
            boxShadow: "0 4px 20px var(--brand-glow)",
          }}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Publishing...
            </>
          ) : (
            "Post Comment"
          )}
        </Button>
      </form>
    </Form>
  )
}
