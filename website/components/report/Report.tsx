import type { FairspecError } from "@fairspec/metadata"
import { Trans, useLingui } from "@lingui/react/macro"
import { groupBy } from "es-toolkit"
import { useState } from "react"
import { objectKeys } from "ts-extras"
import { Error } from "#components/error/Error.tsx"
import { Card } from "#elements/card.tsx"
import { Separator } from "#elements/separator.tsx"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "#elements/tabs.tsx"

export function Report(props: { errors?: FairspecError[] }) {
  const { t } = useLingui()
  const { errors } = props

  const errorsByType = {
    all: errors ?? [],
    ...groupBy(errors ?? [], error => error.type),
  }

  const errorTypes = objectKeys(errorsByType)
  const [selectedType, setSelectedType] = useState<string>(
    errorTypes?.[0] ?? "all",
  )

  if (!errors?.length) {
    return null
  }

  return (
    <Tabs value={selectedType} onValueChange={value => setSelectedType(value)}>
      <div className="flex flex-col gap-6">
        <div className="relative flex items-center">
          <Separator className="flex-1" />
          <span className="px-4 text-sm text-muted-foreground">
            <Trans>Errors</Trans>
          </span>
          <Separator className="flex-1" />
        </div>

        <TabsList variant="line" className="justify-start">
          {errorTypes.map(type => {
            return (
              <TabsTrigger
                key={type}
                value={type}
                className={`w-full sm:w-auto uppercase ${selectedType === type ? "font-bold" : "font-normal"}`}
              >
                {t`${type}`} ({errorsByType[type].length})
              </TabsTrigger>
            )
          })}
        </TabsList>

        {errorTypes.map(type => {
          return (
            <TabsContent key={type} value={type}>
              <div className="overflow-auto">
                <div className="flex flex-col gap-4">
                  {errorsByType[type].map((error, index) => (
                    <Card key={index} className="bg-gray-50 dark:bg-gray-900">
                      <Error error={error} />
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          )
        })}
      </div>
    </Tabs>
  )
}
