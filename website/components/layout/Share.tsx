import { Trans, useLingui } from "@lingui/react/macro"
import * as share from "react-share"
import { Button } from "#elements/button.tsx"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "#elements/dropdown-menu.tsx"
import * as icons from "#icons.ts"
import * as settings from "#settings.ts"

export function Share() {
  const { t } = useLingui()

  if ("desktop" in globalThis) {
    return null
  }

  const currentUrl = globalThis.location?.href || ""
  const items = SHARE_PROVIDERS.map(provider => {
    const Component = provider.component
    return (
      <DropdownMenuItem key={provider.name} className="cursor-pointer">
        <Component url={currentUrl} />
      </DropdownMenuItem>
    )
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            size="default"
            title={t`Share Page`}
            className="rounded-xl cursor-pointer"
          />
        }
      >
        <icons.Share strokeWidth={settings.ICON_STROKE_WIDTH} />
        <span className="hidden">
          <Trans>Share</Trans>
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col gap-4 p-2">
        {items}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function Facebook(props: { url: string }) {
  return (
    <share.FacebookShareButton
      url={props.url}
      className="w-full block cursor-pointer"
      style={{
        all: "unset",
        cursor: "pointer",
        display: "block",
        width: "100%",
      }}
    >
      <div className="flex gap-2 flex-nowrap items-center cursor-pointer">
        <share.FacebookIcon size={settings.ICON_SIZE} round />
        Facebook
      </div>
    </share.FacebookShareButton>
  )
}

function Twitter(props: { url: string }) {
  return (
    <share.TwitterShareButton
      url={props.url}
      className="w-full block cursor-pointer"
      style={{
        all: "unset",
        cursor: "pointer",
        display: "block",
        width: "100%",
      }}
    >
      <div className="flex gap-2 flex-nowrap items-center cursor-pointer">
        <share.TwitterIcon size={settings.ICON_SIZE} round />
        Twitter
      </div>
    </share.TwitterShareButton>
  )
}

function LinkedIn(props: { url: string }) {
  return (
    <share.LinkedinShareButton
      url={props.url}
      className="w-full block cursor-pointer"
      style={{
        all: "unset",
        cursor: "pointer",
        display: "block",
        width: "100%",
      }}
    >
      <div className="flex gap-2 flex-nowrap items-center cursor-pointer">
        <share.LinkedinIcon size={settings.ICON_SIZE} round />
        LinkedIn
      </div>
    </share.LinkedinShareButton>
  )
}

function WhatsApp(props: { url: string }) {
  return (
    <share.WhatsappShareButton
      url={props.url}
      className="w-full block cursor-pointer"
      style={{
        all: "unset",
        cursor: "pointer",
        display: "block",
        width: "100%",
      }}
    >
      <div className="flex gap-2 flex-nowrap items-center cursor-pointer">
        <share.WhatsappIcon size={settings.ICON_SIZE} round />
        WhatsApp
      </div>
    </share.WhatsappShareButton>
  )
}

function Telegram(props: { url: string }) {
  return (
    <share.TelegramShareButton
      url={props.url}
      className="w-full block cursor-pointer"
      style={{
        all: "unset",
        cursor: "pointer",
        display: "block",
        width: "100%",
      }}
    >
      <div className="flex gap-2 flex-nowrap items-center cursor-pointer">
        <share.TelegramIcon size={settings.ICON_SIZE} round />
        Telegram
      </div>
    </share.TelegramShareButton>
  )
}

function Reddit(props: { url: string }) {
  return (
    <share.RedditShareButton
      url={props.url}
      className="w-full block cursor-pointer"
      style={{
        all: "unset",
        cursor: "pointer",
        display: "block",
        width: "100%",
      }}
    >
      <div className="flex gap-2 flex-nowrap items-center cursor-pointer">
        <share.RedditIcon size={settings.ICON_SIZE} round />
        Reddit
      </div>
    </share.RedditShareButton>
  )
}

function Email(props: { url: string }) {
  return (
    <share.EmailShareButton
      url={props.url}
      className="w-full block cursor-pointer"
      style={{
        all: "unset",
        cursor: "pointer",
        display: "block",
        width: "100%",
      }}
    >
      <div className="flex gap-2 flex-nowrap items-center cursor-pointer">
        <share.EmailIcon size={settings.ICON_SIZE} round />
        Email
      </div>
    </share.EmailShareButton>
  )
}

const SHARE_PROVIDERS = [
  { name: "Facebook", component: Facebook },
  { name: "Twitter", component: Twitter },
  { name: "LinkedIn", component: LinkedIn },
  { name: "WhatsApp", component: WhatsApp },
  { name: "Telegram", component: Telegram },
  { name: "Reddit", component: Reddit },
  { name: "Email", component: Email },
]
