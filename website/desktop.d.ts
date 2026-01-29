export interface DesktopAPI {
  openFileDialog: (options: {
    filters?: { name: string; extensions: string[] }[]
  }) => Promise<string | null>
}

declare global {
  var desktop: DesktopAPI | undefined
}
