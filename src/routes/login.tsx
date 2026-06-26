/* eslint-disable react-refresh/only-export-components */
import { LoginForm } from "@/components/auth/login/login-form"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/login")({
  component: LoginPage,
})

function LoginPage() {
  return (
    <div className="w-full max-w-[380px]">
      <LoginForm />
    </div>
  )
}
