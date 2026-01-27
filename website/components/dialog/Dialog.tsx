import { Trans } from "@lingui/react/macro"
import type { ReactNode } from "react"
import { Button } from "#elements/button.tsx"
import { Drawer, DrawerContent, DrawerFooter, DrawerTitle } from "#elements/drawer.tsx"

export function Dialog(props: {
  open?: boolean
  children: ReactNode
  fullScreen?: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Drawer open={props.open} onOpenChange={props.onOpenChange}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-6xl h-full flex flex-col px-4 gap-4 pt-6">
          <DrawerTitle className="hidden">
            <Trans>Dialog</Trans>
          </DrawerTitle>
          <div
            className={props.fullScreen ? "flex-1 overflow-y-auto" : "overflow-y-hidden"}
          >
            {props.children}
          </div>
          <DrawerFooter className="px-0 pt-0">
            <Button
              onClick={() => props.onOpenChange(false)}
              variant="outline"
              className="mt-4 w-full text-xl h-12"
              size="lg"
            >
              <Trans>Close</Trans>
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
