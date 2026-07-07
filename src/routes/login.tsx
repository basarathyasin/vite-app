/* eslint-disable react-refresh/only-export-components */
import { AuthRedirect } from "@/components/auth/AuthRedirect"
import { LoginForm } from "@/components/auth/login/login-form"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/login")({
  component: LoginPage,
})

function LoginPage() {
  return (
    <div className="w-full max-w-[380px]">
      <AuthRedirect />
      <LoginForm />
    </div>
  )
}
