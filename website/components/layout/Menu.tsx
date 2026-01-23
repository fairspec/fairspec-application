import { Link, useParams } from "@tanstack/react-router"
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

// TODO: recover
// import { Trans } from "@lingui/react/macro"
function Trans({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export const menuItems = [
  {
    id: "dataset",
    label: "Dataset",
    icon: icons.Dataset,
    items: [
      { label: "Validate Dataset", path: "/$languageId/dataset/validate" },
      { label: "Infer Dataset", path: "/$languageId/dataset/infer" },
    ],
  },
  {
    id: "table",
    label: "Table",
    icon: icons.Table,
    items: [
      { label: "Validate Table", path: "/$languageId/table/validate" },
      { label: "Infer Schema", path: "/$languageId/table/infer-schema" },
    ],
  },
  {
    id: "data",
    label: "Data",
    icon: icons.Data,
    items: [
      { label: "Validate Data", path: "/$languageId/data/validate" },
      { label: "Infer Schema", path: "/$languageId/data/infer-schema" },
    ],
  },
  {
    id: "file",
    label: "File",
    icon: icons.File,
    items: [
      { label: "Validate File", path: "/$languageId/file/validate" },
      { label: "Infer Dialect", path: "/$languageId/file/infer-dialect" },
    ],
  },
]

export function Menu() {
  const { languageId } = useParams({ strict: false })

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
                              <Link to={item.path} params={{ languageId }}>
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
