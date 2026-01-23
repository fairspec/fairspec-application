import { useLingui } from "@lingui/react/macro"
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

export function Menu() {
  const { t } = useLingui()
  const { languageId } = useParams({ strict: false })

  const [openStates, setOpenStates] = useState<Record<string, boolean>>({
    dataset: true,
    table: true,
    data: true,
    file: true,
  })

  const menuItems = [
    {
      id: "dataset",
      label: t`Dataset`,
      icon: icons.Dataset,
      items: [
        { label: t`Validate Dataset`, path: "/$languageId/dataset/validate" },
        { label: t`Infer Dataset`, path: "/$languageId/dataset/infer" },
      ],
    },
    {
      id: "table",
      label: t`Table`,
      icon: icons.Table,
      items: [
        { label: t`Validate Table`, path: "/$languageId/table/validate" },
        { label: t`Infer Schema`, path: "/$languageId/table/infer-schema" },
      ],
    },
    {
      id: "data",
      label: t`Data`,
      icon: icons.Data,
      items: [
        { label: t`Validate Data`, path: "/$languageId/data/validate" },
        { label: t`Infer Schema`, path: "/$languageId/data/infer-schema" },
      ],
    },
    {
      id: "file",
      label: t`File`,
      icon: icons.File,
      items: [
        { label: t`Validate File`, path: "/$languageId/file/validate" },
        { label: t`Infer Dialect`, path: "/$languageId/file/infer-dialect" },
      ],
    },
  ]

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
                        <span>{menuItem.label}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {menuItem.items.map(item => (
                          <SidebarMenuSubItem key={item.path}>
                            <SidebarMenuSubButton asChild className="text-base">
                              <Link to={item.path} params={{ languageId }}>
                                <span>{item.label}</span>
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
