import { Banner } from "./Banner.tsx"
import { Content } from "./Content.tsx"
import { Footer } from "./Footer.tsx"
import { Header } from "./Header.tsx"
import { Menu } from "./Menu.tsx"

export function Layout(props: { children?: React.ReactNode }) {
  return (
    <div>
      <div className="fixed top-0 left-0 right-0">
        <Header />
        <Banner />
      </div>
      <div className="fixed top-0 left-0 w-100 pt-27">
        <Menu />
      </div>
      <div className="mt-27 ml-100">
        <Content>{props.children}</Content>
        <Footer />
      </div>
    </div>
  )
}
