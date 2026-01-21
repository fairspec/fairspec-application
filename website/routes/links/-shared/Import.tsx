import { useState } from "react"
import { Button } from "#blocks/button.tsx"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "#blocks/dialog.tsx"
import { Field, FieldDescription, FieldLabel } from "#blocks/field.tsx"
import { Input } from "#blocks/input.tsx"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "#blocks/tabs.tsx"
import * as icons from "#icons.ts"
import * as settings from "#settings.ts"
import { useCreateLink } from "./queries.ts"

export function Import() {
  return (
    <Dialog>
      <ImportButton />
      <ImportDialog />
    </Dialog>
  )
}

function ImportButton() {
  return (
    <DialogTrigger asChild>
      <Button
        variant="ghost"
        size="default"
        className="rounded-xl cursor-pointer"
      >
        <icons.Add strokeWidth={settings.ICON_STROKE_WIDTH} />
        <span className="text-xl">Import</span>
      </Button>
    </DialogTrigger>
  )
}

function ImportDialog() {
  const [url, setUrl] = useState("")
  const createLink = useCreateLink()

  // TODO: Rebase on tanstack-forms
  const handleSubmit = async () => {
    await createLink.mutateAsync({ url })
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Import Links</DialogTitle>
      </DialogHeader>

      <Tabs defaultValue="url" className="gap-4">
        <TabsList>
          <TabsTrigger value="url">URL</TabsTrigger>
          <TabsTrigger value="urls" disabled>
            URLs
          </TabsTrigger>
          <TabsTrigger value="pocket" disabled>
            Pocket
          </TabsTrigger>
          <TabsTrigger value="google-keep" disabled>
            Google Keep
          </TabsTrigger>
        </TabsList>

        <TabsContent value="url" className="flex flex-col gap-4">
          <Field className="gap-1">
            <FieldLabel htmlFor="url">Link URL</FieldLabel>
            <Input
              id="url"
              type="url"
              value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder="https://example.com"
            />
            <FieldDescription>
              Paste a publicly available URL to import a link
            </FieldDescription>
          </Field>
        </TabsContent>
      </Tabs>

      <DialogClose asChild>
        <DialogFooter>
          <Button variant="outline" className="cursor-pointer">
            Cancel
          </Button>
          <Button
            className="cursor-pointer"
            disabled={!url}
            onClick={handleSubmit}
          >
            Import
          </Button>
        </DialogFooter>
      </DialogClose>
    </DialogContent>
  )
}
