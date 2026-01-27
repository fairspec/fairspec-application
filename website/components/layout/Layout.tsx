import { Content } from "./Content.tsx"
import { Footer } from "./Footer.tsx"
import { Header } from "./Header.tsx"
import { Menu } from "./Menu.tsx"

export function Layout(props: { children?: React.ReactNode }) {
  return (
    <div>
      <div className="fixed top-0 left-0 right-0 z-10">
        <Header />
      </div>
      <div className="fixed top-16 left-0 right-0 z-20">
        <Footer />
      </div>
      <div className="fixed top-0 left-0 w-100 pt-28">
        <Menu />
      </div>
      <div className="mt-28 ml-100">
        <Content>{props.children}</Content>
      </div>
    </div>
  )
}
