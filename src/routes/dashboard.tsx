/* eslint-disable react-refresh/only-export-components */
import { RequireAuth } from "@/components/auth/RequireAuth"
import { DashboardShell } from "@/components/platform/DashboardShell"
import DashboardPage from "@/pages/dashboard/DashboardPage"
import { Outlet, createFileRoute, useRouterState } from "@tanstack/react-router"

export const Route = createFileRoute("/dashboard")({
  component: DashboardRoutePage,
})

function DashboardRoutePage() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })

  return (
    <RequireAuth>
      <DashboardShell>
        {pathname === "/dashboard" ? <DashboardPage /> : <Outlet />}
      </DashboardShell>
    </RequireAuth>
  )
}
