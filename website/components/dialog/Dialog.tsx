import { Trans } from "@lingui/react/macro"
import type { ReactNode } from "react"
import { useEffect, useState } from "react"
import { Button } from "#elements/button.tsx"
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerTitle,
} from "#elements/drawer.tsx"

export function Dialog(props: {
  open?: boolean
  children: ReactNode
  fullScreen?: boolean
  onOpenChange: (open: boolean) => void
}) {
  const snapPoints = [0.5, 1] as const
  const [snap, setSnap] = useState<number | string | null>(snapPoints[0])

  useEffect(() => {
    setSnap(props.fullScreen ? snapPoints[1] : snapPoints[0])
  }, [props.fullScreen])

  return (
    <Drawer
      open={props.open}
      onOpenChange={props.onOpenChange}
      activeSnapPoint={snap}
      snapPoints={snapPoints as any}
      setActiveSnapPoint={setSnap}
      fadeFromIndex={0}
    >
      <DrawerContent>
        <div className="mx-auto w-full max-w-4xl h-full flex flex-col gap-5 md:gap-10 px-4">
          <DrawerTitle className="hidden">
            <Trans>Dialog</Trans>
          </DrawerTitle>
          <div
            className={
              props.fullScreen ? "flex-1 overflow-y-auto" : "overflow-y-hidden"
            }
          >
            {props.children}
          </div>
          <DrawerFooter>
            <Button
              onClick={() => props.onOpenChange(false)}
              variant="outline"
              className="w-full"
            >
              <Trans>Close</Trans>
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
