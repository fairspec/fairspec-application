import { Trans, useLingui } from "@lingui/react/macro"
import { Link, useMatches, useParams } from "@tanstack/react-router"
import { TypeAnimation } from "react-type-animation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "#blocks/breadcrumb.tsx"

export function Breadcrumbs() {
  const { t } = useLingui()
  const { languageId } = useParams({ strict: false })

  const matches = useMatches()
  const meta = matches.at(-1)?.meta?.find((meta: any) => meta.title)
  const title = meta?.title

  return (
    <Breadcrumb className="hidden md:block">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/" params={{ languageId }}>
              <Trans>Home</Trans>
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {title ? (
          <BreadcrumbItem>
            <BreadcrumbPage>{title}</BreadcrumbPage>
          </BreadcrumbItem>
        ) : (
          <TypeAnimation
            className="text-black dark:text-white"
            sequence={[
              t`Validate dataset`,
              1000,
              t`Validate table`,
              1000,
              t`Infer dialect`,
              1000,
              t`Infer data schema`,
              1000,
              t`Infer table schema`,
              1000,
              t`Select tools below`,
            ]}
          />
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
