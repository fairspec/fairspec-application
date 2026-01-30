export interface DesktopAPI {
  engineIpc: string
  openFileDialog: (options: {
    filters?: { name: string; extensions: string[] }[]
  }) => Promise<string | null>
}

declare global {
  var desktop: DesktopAPI | undefined
}
