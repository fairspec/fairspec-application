import { useLingui } from "@lingui/react/macro"
import { Link } from "@tanstack/react-router"
import { ChevronRight } from "lucide-react"
import { useState } from "react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "#elements/collapsible.tsx"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "#elements/sidebar.tsx"
import * as icons from "#icons.ts"

export function Menu() {
  const { t } = useLingui()

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
        { label: t`Validate Dataset`, path: "/{-$languageSlug}/dataset/validate" },
        { label: t`Infer Dataset`, path: "/{-$languageSlug}/dataset/infer" },
      ],
    },
    {
      id: "table",
      label: t`Table`,
      icon: icons.Table,
      items: [
        { label: t`Validate Table`, path: "/{-$languageSlug}/table/validate" },
        { label: t`Infer Schema`, path: "/{-$languageSlug}/table/infer-schema" },
        { label: t`Infer Dialect`, path: "/{-$languageSlug}/file/infer-dialect" },
      ],
    },
    {
      id: "data",
      label: t`Data`,
      icon: icons.Data,
      items: [
        { label: t`Validate Data`, path: "/{-$languageSlug}/data/validate" },
        { label: t`Infer Schema`, path: "/{-$languageSlug}/data/infer-schema" },
        { label: t`Infer Dialect`, path: "/{-$languageSlug}/file/infer-dialect" },
      ],
    },
    {
      id: "file",
      label: t`File`,
      icon: icons.File,
      items: [
        { label: t`Validate File`, path: "/{-$languageSlug}/file/validate" },
        { label: t`Infer Dialect`, path: "/{-$languageSlug}/file/infer-dialect" },
      ],
    },
  ]

  return (
    <SidebarGroup className="p-4">
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
                  <CollapsibleTrigger
                    render={<SidebarMenuButton className="font-bold text-lg" />}
                  >
                    <Icon />
                    <span>{menuItem.label}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {menuItem.items.map(item => (
                        <SidebarMenuSubItem key={item.path}>
                          <SidebarMenuSubButton
                            render={<Link to={item.path} />}
                            className="text-base"
                          >
                            <span>{item.label}</span>
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
  )
}
