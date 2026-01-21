import { Trans } from "@lingui/react/macro"
import { Link } from "@tanstack/react-router"

export function Sitemap() {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 border-y border-gray-200 py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <SitemapColumn title={<Trans>Product</Trans>}>
            <SitemapItem to="/" label={<Trans>Features</Trans>} />
            <SitemapItem to="/" label={<Trans>Pricing</Trans>} />
            <SitemapItem to="/" label={<Trans>Terms of Service</Trans>} />
            <SitemapItem to="/" label={<Trans>Privacy Policy</Trans>} />
            <SitemapItem to="/" label={<Trans>Security</Trans>} />
            <SitemapItem to="/" label={<Trans>Support</Trans>} />
          </SitemapColumn>

          <SitemapColumn title={<Trans>Downloads</Trans>}>
            <SitemapItem to="/" label={<Trans>iOS</Trans>} />
            <SitemapItem to="/" label={<Trans>Android</Trans>} />
            <SitemapItem to="/" label={<Trans>Chrome Extension</Trans>} />
            <SitemapItem to="/" label={<Trans>Edge Extension</Trans>} />
            <SitemapItem to="/" label={<Trans>Safari Extension</Trans>} />
            <SitemapItem to="/" label={<Trans>Firefox Extension</Trans>} />
          </SitemapColumn>

          <SitemapColumn title={<Trans>Migrations</Trans>}>
            <SitemapItem to="/" label="Google Keep" />
            <SitemapItem to="/" label="Instapaper" />
            <SitemapItem to="/" label="Raindrop" />
            <SitemapItem to="/" label="Pocket" />
            <SitemapItem to="/" label="Matter" />
            <SitemapItem to="/" label="Feedly" />
            <SitemapItem to="/" label="Inoreader" />
          </SitemapColumn>
        </div>
      </div>
    </div>
  )
}

function SitemapColumn(props: {
  title: React.ReactNode
  children: React.ReactNode
}) {
  const { title, children } = props

  return (
    <div>
      <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">
        {title}
      </h3>
      <ul className="space-y-2 flex flex-col items-center">{children}</ul>
    </div>
  )
}

function SitemapItem(props: {
  to: string
  label: React.ReactNode
  external?: boolean
}) {
  const { to, label, external } = props

  return (
    <li>
      <Link
        to={to}
        {...(external && { target: "_blank", rel: "noopener noreferrer" })}
        className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
      >
        {label}
      </Link>
    </li>
  )
}
