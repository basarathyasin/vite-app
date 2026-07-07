/* eslint-disable react-refresh/only-export-components */
import { AuthRedirect } from "@/components/auth/AuthRedirect"
import { SignupForm } from "@/components/auth/signup/signup-form"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/signup")({
  component: SignupPage,
})

function SignupPage() {
  return (
    <div className="w-full max-w-[440px]">
      <AuthRedirect />
      <SignupForm />
    </div>
  )
}
