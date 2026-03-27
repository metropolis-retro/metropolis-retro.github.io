"use client";

import { useCallback, useState } from "react"
import type { NewsletterValues } from "@/lib/validators/newsletter"

type NewsletterStatus = "idle" | "submitting" | "success" | "error"

type NewsletterState = {
  status: NewsletterStatus
  error: string | null
  successMessage: string | null
}

const initialState: NewsletterState = {
  status: "idle",
  error: null,
  successMessage: null,
}

export function useNewsletterApi() {
  const [state, setState] = useState<NewsletterState>(initialState)

  const resetState = useCallback(() => {
    setState(initialState)
  }, [])

  const subscribe = useCallback(async (payload: NewsletterValues) => {
    setState({
      status: "submitting",
      error: null,
      successMessage: null,
    })

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const data = (await response.json()) as {
        message?: string
        error?: string
      }

      if (!response.ok) {
        throw new Error(data.error ?? "Unable to subscribe")
      }

      setState({
        status: "success",
        error: null,
        successMessage: data.message ?? "Subscribed successfully.",
      })

      return { ok: true as const }
    } catch (error) {
      setState({
        status: "error",
        error: error instanceof Error ? error.message : "Something went wrong",
        successMessage: null,
      })

      return { ok: false as const }
    }
  }, [])

  return {
    ...state,
    isSubmitting: state.status === "submitting",
    isSuccess: state.status === "success",
    isError: state.status === "error",
    subscribe,
    resetState,
  }
}
