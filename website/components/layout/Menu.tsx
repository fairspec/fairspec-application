import { Trans } from "@lingui/react/macro"
import { Link } from "@tanstack/react-router"
import { ChevronRight } from "lucide-react"
import { useState } from "react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "#blocks/collapsible.tsx"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
} from "#blocks/sidebar.tsx"
import * as icons from "#icons.ts"
import { Credits } from "./Credits.tsx"

export const menuItems = [
  {
    id: "dataset",
    label: "Dataset",
    icon: icons.Dataset,
    items: [
      { label: "Validate Dataset", path: "/dataset/validate" },
      { label: "Infer Dataset", path: "/dataset/infer" },
    ],
  },
  {
    id: "table",
    label: "Table",
    icon: icons.Table,
    items: [
      { label: "Validate Table", path: "/table/validate" },
      { label: "Infer Schema", path: "/table/infer" },
    ],
  },
  {
    id: "data",
    label: "Data",
    icon: icons.Data,
    items: [
      { label: "Validate Data", path: "/data/validate" },
      { label: "Infer Schema", path: "/data/infer" },
    ],
  },
  {
    id: "file",
    label: "File",
    icon: icons.File,
    items: [
      { label: "Validate File", path: "/file/validate" },
      { label: "Infer Format", path: "/file/infer" },
    ],
  },
]

export function Menu() {
  const [openStates, setOpenStates] = useState<Record<string, boolean>>({
    dataset: true,
    table: true,
    data: true,
    file: true,
  })

  return (
    <SidebarProvider>
      <SidebarGroup className="p-5 bg-gray-50 dark:bg-gray-800">
        <SidebarGroupContent>
          <SidebarMenu>
            {menuItems.map(menuItem => {
              const Icon = menuItem.icon
              return (
                <Collapsible
                  key={menuItem.id}
                  open={openStates[menuItem.id]}
                  onOpenChange={(open: boolean) =>
                    setOpenStates(prev => ({ ...prev, [menuItem.id]: open }))
                  }
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton className="font-bold text-lg">
                        <Icon />
                        <span>
                          <Trans>{menuItem.label}</Trans>
                        </span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {menuItem.items.map(item => (
                          <SidebarMenuSubItem key={item.path}>
                            <SidebarMenuSubButton asChild className="text-base">
                              <Link to={item.path}>
                                <span>
                                  <Trans>{item.label}</Trans>
                                </span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              )
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarProvider>
  )
}
