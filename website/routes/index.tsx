import { auth } from "@clerk/tanstack-react-start/server"
import { createFileRoute, redirect } from "@tanstack/react-router"
import { createServerFn } from "@tanstack/react-start"

const authStateFn = createServerFn({ method: "GET" }).handler(async () => {
  const { isAuthenticated, userId, getToken } = await auth()

  if (!isAuthenticated) {
    throw redirect({
      to: "/login",
    })
  }

  return { userId, token: await getToken() }
})

export const Route = createFileRoute("/")({
  component: Component,
  beforeLoad: async () => await authStateFn(),
  loader: async ({ context }) => {
    return { userId: context.userId, token: context.token }
  },
})

function Component() {
  const state = Route.useLoaderData()

  return (
    <h1>
      Welcome! Your ID is {state.userId} and token is {state.token}
    </h1>
  )
}
