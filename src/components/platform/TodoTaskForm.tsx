import { Controller, useForm, type Resolver } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { DrawerFooter } from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import {
  TodoDatePicker,
  type TodoDatePickerCopy,
} from "@/components/platform/TodoDatePicker"
import {
  TodoPrioritySelect,
  type TodoPriorityOption,
} from "@/components/platform/TodoPrioritySelect"
import { cn } from "@/lib/utils"
import type { TodoPriority } from "@/components/platform/TodoTable"

export type TodoTaskFormValues = {
  title: string
  priority: TodoPriority
  dueDate: string
}

export type TodoTaskFormCopy = {
  titleLabel: string
  titlePlaceholder: string
  priorityLabel: string
  cancelButton: string
  submitButton: string
  datePicker?: Partial<TodoDatePickerCopy>
}

export type TodoTaskFormClassNames = {
  field?: string
  footer?: string
}

export type TodoTaskFormProps = {
  onSubmit: (values: TodoTaskFormValues) => void
  onCancel: () => void
  priorityOptions: TodoPriorityOption[]
  copy?: Partial<TodoTaskFormCopy>
  defaultValues?: Partial<TodoTaskFormValues>
  classNames?: TodoTaskFormClassNames
}

const defaultCopy: TodoTaskFormCopy = {
  titleLabel: "Task title",
  titlePlaceholder: "Write the task title",
  priorityLabel: "Priority",
  cancelButton: "Cancel",
  submitButton: "Create task",
}

const todoTaskFormSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  priority: z.enum(["low", "medium", "high"]),
  dueDate: z
    .string()
    .min(1, "Due date is required")
    .refine((value) => value >= getTodayDateValue(), "Date cannot be in the past"),
})

const todoTaskFormResolver: Resolver<TodoTaskFormValues> = async (values) => {
  const result = todoTaskFormSchema.safeParse(values)

  if (result.success) {
    return {
      values: result.data,
      errors: {},
    }
  }

  return {
    values: {},
    errors: result.error.issues.reduce<Record<string, { type: string; message: string }>>(
      (errors, issue) => {
        const field = issue.path[0]

        if (typeof field === "string") {
          errors[field] = {
            type: issue.code,
            message: issue.message,
          }
        }

        return errors
      },
      {},
    ),
  }
}

function getTodayDateValue() {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, "0")
  const day = String(today.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

function getInitialValues(
  defaultValues?: Partial<TodoTaskFormValues>,
): TodoTaskFormValues {
  return {
    title: defaultValues?.title ?? "",
    priority: defaultValues?.priority ?? "medium",
    dueDate: defaultValues?.dueDate ?? "",
  }
}

export function TodoTaskForm({
  onSubmit,
  onCancel,
  priorityOptions,
  copy,
  defaultValues,
  classNames,
}: TodoTaskFormProps) {
  const text = { ...defaultCopy, ...copy }
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<TodoTaskFormValues>({
    defaultValues: getInitialValues(defaultValues),
    resolver: todoTaskFormResolver,
  })

  const submitTask = (values: TodoTaskFormValues) => {
    onSubmit({
      ...values,
      title: values.title.trim(),
      dueDate: values.dueDate,
    })
    reset(getInitialValues(defaultValues))
  }

  return (
    <form onSubmit={handleSubmit(submitTask)} className="flex h-full flex-col">
      <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5">
        <label className={cn("block space-y-2", classNames?.field)}>
          <span className="text-sm font-medium text-[#191C1D]">
            {text.titleLabel}
          </span>
          <Input
            placeholder={text.titlePlaceholder}
            autoFocus
            aria-invalid={Boolean(errors.title)}
            {...register("title")}
          />
          {errors.title && (
            <p className="text-sm text-red-600">{errors.title.message}</p>
          )}
        </label>

        <Controller
          control={control}
          name="priority"
          render={({ field }) => (
            <TodoPrioritySelect
              value={field.value}
              onChange={field.onChange}
              options={priorityOptions}
              label={text.priorityLabel}
              className={classNames?.field}
            />
          )}
        />

        <Controller
          control={control}
          name="dueDate"
          render={({ field }) => (
            <TodoDatePicker
              value={field.value}
              onChange={field.onChange}
              copy={text.datePicker}
              className={classNames?.field}
              error={errors.dueDate?.message}
            />
          )}
        />
      </div>

      <DrawerFooter className={cn("border-t p-5 sm:flex-row", classNames?.footer)}>
        <Button
          type="button"
          variant="outline"
          className="sm:flex-1"
          onClick={onCancel}
        >
          {text.cancelButton}
        </Button>
        <Button type="submit" className="sm:flex-1">
          {text.submitButton}
        </Button>
      </DrawerFooter>
    </form>
  )
}
