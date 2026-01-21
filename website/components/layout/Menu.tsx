import { Trans } from "@lingui/react/macro"
import { Link, useMatchRoute } from "@tanstack/react-router"
import * as icons from "#icons.ts"

export function Menu() {
  const matchRoute = useMatchRoute()

  return (
    <nav className="sticky top-4">
      <div className="flex flex-col gap-4">
        <MenuItem
          to="/links"
          Icon={icons.Link}
          label={<Trans>Links</Trans>}
          selected={matchRoute({ to: "/links", fuzzy: true })}
        />
        <MenuItem
          to="/feeds"
          Icon={icons.Feed}
          label={<Trans>Feeds</Trans>}
          selected={matchRoute({ to: "/feeds", fuzzy: true })}
        />
        <MenuItem
          to="/channels"
          Icon={icons.Channel}
          label={<Trans>Channels</Trans>}
          selected={matchRoute({ to: "/channels", fuzzy: true })}
        />
        <MenuItem
          to="/favorites"
          Icon={icons.Star}
          label={<Trans>Favorites</Trans>}
          selected={matchRoute({ to: "/favorites", fuzzy: true })}
        />
        <MenuItem
          to="/account"
          Icon={icons.Account}
          label={<Trans>Account</Trans>}
          selected={matchRoute({ to: "/account", fuzzy: true })}
        />
      </div>
    </nav>
  )
}

function MenuItem(props: {
  to: string
  Icon: React.ComponentType<{ className?: string }>
  label: React.ReactNode
  selected?: boolean
}) {
  const { to, Icon, label, selected } = props

  return (
    <Link
      to={to}
      className={
        selected
          ? "flex items-center gap-4 px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          : "flex items-center gap-4 px-4 py-2 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      }
    >
      <Icon className="w-6 h-6" />
      <span className="text-xl">{label}</span>
    </Link>
  )
}
