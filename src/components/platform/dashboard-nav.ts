import { CheckSquare, FolderKanban, Home, ListTodo } from "lucide-react"

export type DashboardNavItem = {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

export const dashboardNavItems: DashboardNavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    label: "Task",
    href: "/dashboard/tasks",
    icon: ListTodo,
  },
  {
    label: "Projects",
    href: "/dashboard/projects",
    icon: FolderKanban,
  },
  {
    label: "Completed",
    href: "/dashboard/completed",
    icon: CheckSquare,
  },
]
