import { Banner } from "./Banner.tsx"
import { Content } from "./Content.tsx"
import { Footer } from "./Footer.tsx"
import { Header } from "./Header.tsx"
import { Menu } from "./Menu.tsx"

export function Layout(props: { children?: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-8 max-md:pt-16">
      <div>
        <Header />
        <Banner />
      </div>
      <div className="mx-auto px-4 w-full">
        <div className="flex gap-8">
          <aside className="hidden md:block md:w-3/12">
            <Menu />
          </aside>
          <main className="w-full md:w-9/12">
            <Content>{props.children}</Content>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  )
}
