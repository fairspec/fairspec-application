import { Trans } from "@lingui/react/macro"
import { createFileRoute, Link } from "@tanstack/react-router"
import { Card, CardDescription, CardHeader, CardTitle } from "#blocks/card.tsx"
import { menuItems } from "#components/layout/Menu.tsx"

const cardDescriptions: Record<string, string> = {
  dataset:
    "Validate dataset metadata against specifications and automatically infer dataset structure from your data files",
  table:
    "Validate table structure for correctness and compliance, and automatically infer table schema definitions from your tabular data",
  data: "Validate data quality, check for inconsistencies and errors, and automatically infer comprehensive data schemas from your datasets",
  file: "Describe file contents and structure in detail, and automatically infer file formats and encoding specifications",
}

const iconColors: Record<string, string> = {
  dataset: "text-blue-500",
  table: "text-green-500",
  data: "text-purple-500",
  file: "text-orange-500",
}

export const Route = createFileRoute("/")({
  component: Component,
})

function Component() {
  return (
    <div className="py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {menuItems.map(item => {
          const Icon = item.icon
          const firstPath = item.items[0]?.path || "/"
          return (
            <Link key={item.id} to={firstPath}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full group">
                <CardHeader>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className={iconColors[item.id]}>
                        <Icon className="w-8 h-8 group-hover:animate-[spin_0.5s_ease-in-out_1]" />
                      </div>
                      <CardTitle className="text-2xl">
                        <Trans>{item.label}</Trans>
                      </CardTitle>
                    </div>
                    <CardDescription className="text-base">
                      <Trans>{cardDescriptions[item.id]}</Trans>
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
