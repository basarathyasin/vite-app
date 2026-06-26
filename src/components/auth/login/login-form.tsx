import { Link } from "@tanstack/react-router"
import { useForm } from "react-hook-form"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

type LoginFormData = {
  email: string
  password: string
}

type User = {
  name: string
  email: string
  password: string
}

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormData>()

  const onSubmit = async (data: LoginFormData) => {
    try {
      const storedUsers = localStorage.getItem("users")

      if (!storedUsers) {
        setError("email", {
          type: "manual",
          message: "No users found. Please sign up first.",
        })
        return
      }

      const parsed = JSON.parse(storedUsers)
      const users: User[] = Array.isArray(parsed) ? parsed : [parsed]

      const user = users.find(
        (user) => user.email === data.email && user.password === data.password,
      )

      if (!user) {
        setError("password", {
          type: "manual",
          message: "Invalid email or password.",
        })
        return
      }

      localStorage.setItem("isAuthenticated", "true")
      localStorage.setItem("currentUser", JSON.stringify(user))

      await new Promise((resolve) => setTimeout(resolve, 2000))

      window.location.replace("/dashboard")
    } catch (error) {
      console.error(error)

      setError("email", {
        type: "manual",
        message: "Something went wrong. Please try again.",
      })
    }
  }

  return (
    <div className={cn("flex flex-col", className)} {...props}>
      <Card className="rounded-xl border-[#E2E8F0] bg-white shadow-sm">
        <CardHeader className="gap-1.5 px-5 pt-5 text-center">
          <CardTitle className="text-xl font-semibold text-[#111827]">
            Login to your account
          </CardTitle>
          <CardDescription className="text-sm text-[#64748B]">
            Enter your email and password to continue.
          </CardDescription>
        </CardHeader>

        <CardContent className="px-5 pb-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup className="gap-4">
              <Field>
                <FieldLabel className="text-[#334155]">Email</FieldLabel>

                <Input
                  type="email"
                  placeholder="m@example.com"
                  className="h-10 border-[#CBD5E1] bg-white px-3"
                  aria-invalid={Boolean(errors.email)}
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </Field>

              <Field>
                <div className="flex items-center">
                  <FieldLabel className="text-[#334155]">Password</FieldLabel>

                  <a
                    href="#"
                    className="ml-auto text-sm text-[#2563EB] hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>

                <Input
                  type="password"
                  className="h-10 border-[#CBD5E1] bg-white px-3"
                  aria-invalid={Boolean(errors.password)}
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </Field>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-10 rounded-lg"
                width="full"
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>

              <FieldDescription className="text-center text-[#64748B]">
                Don&apos;t have an account?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-[#2563EB] hover:underline"
                >
                  Sign up
                </Link>
              </FieldDescription>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
