import { useMutation } from "@tanstack/react-query"
import { useId } from "react"
import { toast } from "sonner"
import { engine } from "#services/engine.ts"

export function useCreateLink() {
  const id = useId()

  return useMutation(
    engine.table.validate.mutationOptions({
      onError: () => {
        toast.error("Link import failed", { id })
      },
    }),
  )
}
