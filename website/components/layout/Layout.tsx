import {
  Sidebar,
  SidebarContent,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "#elements/sidebar.tsx"
import { Banner } from "./Banner.tsx"
import { Breadcrumbs } from "./Breadcrumbs.tsx"
import { Content } from "./Content.tsx"
import { Footer } from "./Footer.tsx"
import { Header } from "./Header.tsx"
import { Menu } from "./Menu.tsx"

export function Layout(props: { children?: React.ReactNode }) {
  return (
    <SidebarProvider
      defaultOpen={true}
      style={
        {
          "--sidebar-width": "20rem",
          "--sidebar-width-mobile": "20rem",
        } as React.CSSProperties
      }
    >
      <Sidebar collapsible="offcanvas" side="left">
        <SidebarContent className="md:pt-28">
          <Menu />
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <div className="fixed top-0 left-0 right-0 z-10">
          <Header />
        </div>
        <div className="fixed top-16 left-0 right-0 z-20">
          <div className="flex bg-gray-50 dark:bg-gray-800 gap-4 h-12 border-t border-gray-200 dark:border-gray-700 px-2 items-center border-b md:hidden">
            <SidebarTrigger />
            <Breadcrumbs />
          </div>
          <div className="hidden md:block">
            <Banner />
          </div>
        </div>
        <div className="mt-28">
          <Content>{props.children}</Content>
          <Footer />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
