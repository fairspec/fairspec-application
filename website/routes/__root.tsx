import { i18n } from "@lingui/core"
import { I18nProvider } from "@lingui/react"
import { TanStackDevtools } from "@tanstack/react-devtools"
import type { QueryClient } from "@tanstack/react-query"
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools"
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
  useParams,
} from "@tanstack/react-router"
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools"
import type * as React from "react"
import { Toaster } from "#blocks/sonner.tsx"
import { Layout } from "#components/layout/Layout.tsx"
import { DefaultCatchBoundary } from "#components/system/DefaultCatchBoundary.tsx"
import { NotFound } from "#components/system/NotFound.tsx"
import { LanguageIdDefault } from "#constants/language.ts"
import generalCss from "#styles/general.css?url"

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
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
  }),
  errorComponent: props => {
    return (
      <Document>
        <DefaultCatchBoundary {...props} />
      </Document>
    )
  },
  notFoundComponent: () => <NotFound />,
  component: Component,
})

function Document(props: { children: React.ReactNode }) {
  const { languageId } = useParams({ strict: false })

  return (
    <I18nProvider i18n={i18n}>
      <html lang={languageId ?? LanguageIdDefault}>
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

function Component() {
  return (
    <Document>
      <Outlet />
    </Document>
  )
}
