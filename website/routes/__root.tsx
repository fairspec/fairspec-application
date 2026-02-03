import { i18n } from "@lingui/core"
import { t } from "@lingui/core/macro"
import { I18nProvider } from "@lingui/react"
import { TanStackDevtools } from "@tanstack/react-devtools"
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools"
import {
  createRootRoute,
  HeadContent,
  notFound,
  Outlet,
  Scripts,
  useParams,
} from "@tanstack/react-router"
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools"
import type * as React from "react"
import { Layout } from "#components/layout/Layout.tsx"
import { DefaultCatchBoundary } from "#components/system/DefaultCatchBoundary.tsx"
import { NotFound } from "#components/system/NotFound.tsx"
import { LanguageIdDefault, Languages } from "#constants/language.ts"
import { Toaster } from "#elements/sonner.tsx"
import * as settings from "#settings.ts"
import generalCss from "#styles/general.css?url"

export const Route = createRootRoute({
  head: ({ matches }) => {
    const match = matches.at(-1)
    const path = match?.fullPath
    const params = match?.params as any

    const language = Object.values(Languages).find(
      language => language.slug === params?.languageSlug,
    )

    // TODO: should be a builtin function in the future
    // https://github.com/TanStack/router/discussions/6551
    const makeLink = (languageSlug?: string) => {
      const replacement = languageSlug ? `/${languageSlug}` : ""
      const compiledPath = path?.replace("/{-$languageSlug}", replacement)
      return `${settings.HOST}${compiledPath}`
    }

    return {
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
        {
          rel: "canonical",
          href: makeLink(language?.slug),
        },
        {
          rel: "alternate",
          hreflang: "x-default",
          href: makeLink(),
        },
        ...Object.values(Languages).map(language => ({
          rel: "alternate",
          hreflang: language.id,
          href: makeLink(language.slug),
        })),
      ],
      scripts: [
        {
          // TODO: remove on desktop?
          src: "https://plausible.io/js/script.js",
          "data-domain": "fairspec.org",
          defer: true,
        },
      ],
    }
  },
  // TODO: improve NotFound page in this case
  // @ts-expect-error
  beforeLoad: ({ params }) => {
    if ("languageSlug" in params) {
      const language = Object.values(Languages).find(
        language => language.slug === params.languageSlug,
      )

      if (!language) {
        throw notFound()
      }
    }
  },
  // TODO: improve NotFound page
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
