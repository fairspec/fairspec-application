import { i18n } from "@lingui/core"
import { t } from "@lingui/core/macro"
import { I18nProvider } from "@lingui/react"
import { TanStackDevtools } from "@tanstack/react-devtools"
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools"
import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
  useParams,
} from "@tanstack/react-router"
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools"
import type * as React from "react"
import { Layout } from "#components/layout/Layout.tsx"
import { DefaultCatchBoundary } from "#components/system/DefaultCatchBoundary.tsx"
import { NotFound } from "#components/system/NotFound.tsx"
import { LanguageIdDefault } from "#constants/language.ts"
import { Toaster } from "#elements/sonner.tsx"
import generalCss from "#styles/general.css?url"

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        title: "Fairspec Application",
      },
      {
        name: "description",
        content: t`Visual tool for managing and validating tabular and structured data`,
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
    ],
    links: [
      { rel: "stylesheet", href: generalCss },
      {
        rel: "icon",
        type: "image/png",
        href: "/fairspec-logo.png",
      },
    ],
    scripts: [
      {
        src: "https://plausible.io/js/script.js",
        "data-domain": "fairspec.org",
        defer: true,
      },
    ],
  }),
  notFoundComponent: () => <NotFound />,
  errorComponent: props => {
    return (
      <Document>
        <DefaultCatchBoundary {...props} />
      </Document>
    )
  },
  component: () => {
    return (
      <Document>
        <Outlet />
      </Document>
    )
  },
})

function Document(props: { children: React.ReactNode }) {
  const { languageSlug } = useParams({ strict: false })

  return (
    <I18nProvider i18n={i18n}>
      <html lang={languageSlug ?? LanguageIdDefault}>
        <head>
          <HeadContent />
        </head>
        <body>
          <Layout>{props.children}</Layout>
          <Toaster position="top-center" />
          <TanStackDevtools
            config={{ hideUntilHover: true }}
            plugins={[
              {
                name: "TanStack Query",
                render: <ReactQueryDevtoolsPanel />,
                defaultOpen: true,
              },
              {
                name: "TanStack Router",
                render: <TanStackRouterDevtoolsPanel />,
                defaultOpen: false,
              },
            ]}
          />
          <Scripts />
        </body>
      </html>
    </I18nProvider>
  )
}
