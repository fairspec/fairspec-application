export function Code(props: React.ComponentProps<"code">) {
  return (
    <code className="text-lg font-bold bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">
      {props.children}
    </code>
  )
}
