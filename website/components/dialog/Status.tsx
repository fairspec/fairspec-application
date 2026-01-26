import type { ReactNode } from "react"
import * as icons from "#icons.ts"

export type StatusType = "pending" | "success" | "error" | "fault"

export interface StatusProps {
  statusType?: StatusType
  pendingTitle: string
  successTitle: string
  errorTitle: string
}

export function Status(props: StatusProps) {
  const { statusType } = props

  const getIcon = (): ReactNode => {
    if (statusType === "pending")
      return (
        <icons.Pending
          size={100}
          className="animate-spin text-yellow-500 w-20 h-20 sm:w-10 sm:h-10"
        />
      )
    if (statusType === "success")
      return (
        <icons.Success size={100} className="text-green-500 w-20 h-20 sm:w-10 sm:h-10" />
      )
    if (statusType === "error")
      return <icons.Error size={100} className="text-red-500 w-20 h-20 sm:w-10 sm:h-10" />
    return null
  }

  const getTitle = (): string => {
    if (statusType === "pending") return props.pendingTitle
    if (statusType === "success") return props.successTitle
    if (statusType === "error") return props.errorTitle
    return ""
  }

  return (
    <div className="flex justify-center items-center flex-col gap-6 sm:gap-3 sm:my-5">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        {getIcon()}
        <span className="text-4xl font-semibold">{getTitle()}</span>
      </div>
    </div>
  )
}
