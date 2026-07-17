import { Link } from "@tanstack/react-router"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
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
import { useAuth } from "@/hooks/useAuth"
import { loginStrapiUser } from "@/lib/auth/strapiAuth"

type LoginFormData = {
  email: string
  password: string
}

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormData>()

  const onSubmit = async (data: LoginFormData) => {
    try {
      const session = await loginStrapiUser(data)
      login(session)

      window.location.replace("/dashboard")
    } catch (error) {
      console.error(error)

      setError("password", {
        type: "manual",
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      })
    }
  }

  return (
    <div className={cn("flex flex-col", className)} {...props}>
      <Card className="rounded-xl border-[#E2E8F0] bg-white shadow-sm dark:border-white/10 dark:bg-[#111315]">
        <CardHeader className="gap-1.5 px-5 pt-5 text-center">
          <CardTitle className="text-xl font-semibold text-[#111827] dark:text-white">
            Login to your account
          </CardTitle>
          <CardDescription className="text-sm text-[#64748B] dark:text-zinc-400">
            Enter your email and password to continue.
          </CardDescription>
        </CardHeader>

        <CardContent className="px-5 pb-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup className="gap-4">
              <Field>
                <FieldLabel className="text-[#334155] dark:text-zinc-200">Email</FieldLabel>

                <Input
                  type="email"
                  placeholder="m@example.com"
                  className="h-10 border-[#CBD5E1] bg-white px-3 text-[#111827] placeholder:text-[#94A3B8] dark:border-white/15 dark:bg-white/10 dark:text-white dark:placeholder:text-zinc-500"
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
                  <FieldLabel className="text-[#334155] dark:text-zinc-200">Password</FieldLabel>

                  <a
                    href="#"
                    className="ml-auto text-sm text-[#2563EB] hover:underline dark:text-sky-400"
                  >
                    Forgot password?
                  </a>
                </div>

                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    className="h-10 border-[#CBD5E1] bg-white px-3 pr-10 text-[#111827] dark:border-white/15 dark:bg-white/10 dark:text-white"
                    aria-invalid={Boolean(errors.password)}
                    {...register("password")}
                  />
                  <Button
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-1 top-1/2 size-8 -translate-y-1/2 text-[#64748B] hover:bg-slate-100 dark:text-zinc-400 dark:hover:bg-white/10"
                    onClick={() => setShowPassword((current) => !current)}
                    size="icon-xs"
                    type="button"
                    variant="ghost"
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </Button>
                </div>
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

              <FieldDescription className="text-center text-[#64748B] dark:text-zinc-400">
                Don&apos;t have an account?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-[#2563EB] hover:underline dark:text-sky-400"
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
