import { useMutation } from "@tanstack/react-query"
import { useId } from "react"
import { toast } from "sonner"
import { engine } from "#services/engine.ts"

export function useCreateLink() {
  const id = useId()

  return useMutation(
    engine.link.create.mutationOptions({
      onMutate: () => {
        toast.loading("Importing link", { id })
      },
      onSuccess: () => {
        toast.success("Link imported", { id })
      },
      onError: () => {
        toast.error("Link import failed", { id })
      },
    }),
  )
}
