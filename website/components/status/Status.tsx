import type { ReactNode } from "react"
import * as icons from "#icons.ts"

export interface StatusProps {
  status?: "pending" | "success" | "error" | "fault"
  pendingTitle: string
  successTitle: string
  errorTitle: string
}

export function Status(props: StatusProps) {
  const { status } = props

  const getIcon = (): ReactNode => {
    if (status === "pending")
      return (
        <icons.Pending
          size={100}
          className="animate-spin text-yellow-500 w-20 h-20 sm:w-10 sm:h-10"
        />
      )
    if (status === "success")
      return (
        <icons.Success size={100} className="text-green-500 w-20 h-20 sm:w-10 sm:h-10" />
      )
    if (status === "error")
      return <icons.Error size={100} className="text-red-500 w-20 h-20 sm:w-10 sm:h-10" />
    return null
  }

  const getTitle = (): string => {
    if (status === "pending") return props.pendingTitle
    if (status === "success") return props.successTitle
    if (status === "error") return props.errorTitle
    return ""
  }

  return (
    <div className="flex justify-center items-center flex-col gap-6 sm:gap-3 sm:my-5">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        {getIcon()}
        <span className="text-4xl font-semibold sm:text-xl">{getTitle()}</span>
      </div>
    </div>
  )
}
