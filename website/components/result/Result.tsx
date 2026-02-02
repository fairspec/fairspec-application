import { Trans } from "@lingui/react/macro"
import type { ReactNode } from "react"
import { Button } from "#elements/button.tsx"
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerTitle,
} from "#elements/drawer.tsx"

export function Result(props: {
  open?: boolean
  children: ReactNode
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Drawer open={props.open} onOpenChange={props.onOpenChange}>
      <DrawerContent className="flex flex-col">
        <DrawerTitle className="hidden">
          <Trans>Result</Trans>
        </DrawerTitle>
        <div className="max-w-6xl w-full mx-auto px-4 pt-6 flex-1 overflow-y-auto">
          {props.children}
        </div>
        <DrawerFooter className="max-w-6xl w-full mx-auto">
          <Button
            onClick={() => props.onOpenChange(false)}
            variant="outline"
            className="w-full text-xl h-12"
            size="lg"
          >
            <Trans>Close</Trans>
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
