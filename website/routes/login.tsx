import { SignIn } from "@clerk/tanstack-react-start"
import { createFileRoute } from "@tanstack/react-router"
import { Card, CardContent, CardHeader, CardTitle } from "#blocks/card.tsx"
import { Help } from "#icons.ts"

export const Route = createFileRoute("/login")({
  component: Component,
})

function Component() {
  return (
    <div className="flex flex-col md:flex-row gap-10">
      <div className="flex-1 flex justify-start">
        <SignIn routing="path" path="/login" afterSignInUrl="/links" />
      </div>
      <div className="hidden md:flex flex-1">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Help className="size-5" />
              Help
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              Login is essential to access all features and keep your data
              synchronized across devices. Your account ensures secure access to
              your password manager and encrypted vault.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
