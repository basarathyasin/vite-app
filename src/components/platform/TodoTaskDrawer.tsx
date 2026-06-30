import type { ReactNode } from "react"

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { cn } from "@/lib/utils"

export type TodoTaskDrawerClassNames = {
  content?: string
  header?: string
  body?: string
}

export type TodoTaskDrawerProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: ReactNode
  children: ReactNode
  classNames?: TodoTaskDrawerClassNames
}

export function TodoTaskDrawer({
  open,
  onOpenChange,
  title = "Task",
  children,
  classNames,
}: TodoTaskDrawerProps) {
  return (
    <Drawer direction="right" open={open} onOpenChange={onOpenChange}>
      <DrawerContent
        className={cn("h-svh w-[min(420px,92vw)]", classNames?.content)}
      >
        <DrawerHeader
          className={cn("border-b px-5 py-5 text-left", classNames?.header)}
        >
          <DrawerTitle className="text-lg font-semibold">{title}</DrawerTitle>
        </DrawerHeader>

        <div className={cn("min-h-0 flex-1 overflow-hidden", classNames?.body)}>
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  )
}
