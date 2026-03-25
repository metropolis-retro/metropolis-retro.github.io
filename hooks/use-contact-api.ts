"use client";

import { useCallback, useState } from "react"
import type { ContactFormValues } from "@/lib/validators/contact"

type ContactApiStatus = "idle" | "submitting" | "success" | "error"

type ContactApiState = {
  status: ContactApiStatus
  error: string | null
  successMessage: string | null
}

const initialState: ContactApiState = {
  status: "idle",
  error: null,
  successMessage: null,
}

export function useContactApi() {
  const [state, setState] = useState<ContactApiState>(initialState)

  const resetState = useCallback(() => {
    setState(initialState)
  }, [])

  const sendMessage = useCallback(async (payload: ContactFormValues) => {
    setState({
      status: "submitting",
      error: null,
      successMessage: null,
    })

    try {
      const response = await fetch("/api/contact", {
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
        throw new Error(data.error ?? "Failed to send message")
      }

      setState({
        status: "success",
        error: null,
        successMessage: data.message ?? "Your message was sent successfully.",
      })

      return {
        ok: true as const,
      }
    } catch (error) {
      setState({
        status: "error",
        error: error instanceof Error ? error.message : "Something went wrong",
        successMessage: null,
      })

      return {
        ok: false as const,
      }
    }
  }, [])

  return {
    ...state,
    isSubmitting: state.status === "submitting",
    isSuccess: state.status === "success",
    isError: state.status === "error",
    sendMessage,
    resetState,
  }
}
