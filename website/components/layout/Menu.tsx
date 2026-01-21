import { Trans } from "@lingui/react/macro"
import { Link, useMatchRoute } from "@tanstack/react-router"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "#blocks/sidebar.tsx"
import * as icons from "#icons.ts"

export function Menu() {
  const matchRoute = useMatchRoute()

  return (
    <SidebarProvider>
      <SidebarGroup className="w-full">
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={matchRoute({ to: "/links", fuzzy: true })}
                size="lg"
              >
                <Link to="/links">
                  <icons.Link className="w-6 h-6" />
                  <span className="text-xl">
                    <Trans>Links</Trans>
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={matchRoute({ to: "/feeds", fuzzy: true })}
                size="lg"
              >
                <Link to="/feeds">
                  <icons.Feed className="w-6 h-6" />
                  <span className="text-xl">
                    <Trans>Feeds</Trans>
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={matchRoute({ to: "/channels", fuzzy: true })}
                size="lg"
              >
                <Link to="/channels">
                  <icons.Channel className="w-6 h-6" />
                  <span className="text-xl">
                    <Trans>Channels</Trans>
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={matchRoute({ to: "/favorites", fuzzy: true })}
                size="lg"
              >
                <Link to="/favorites">
                  <icons.Star className="w-6 h-6" />
                  <span className="text-xl">
                    <Trans>Favorites</Trans>
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={matchRoute({ to: "/account", fuzzy: true })}
                size="lg"
              >
                <Link to="/account">
                  <icons.Account className="w-6 h-6" />
                  <span className="text-xl">
                    <Trans>Account</Trans>
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarProvider>
  )
}
