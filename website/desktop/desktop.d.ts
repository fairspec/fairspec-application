declare global {
  interface Window {
    desktop?: {
      openFileDialog: (options: {
        filters?: { name: string; extensions: string[] }[]
      }) => Promise<string | null>
    }
  }

  const desktop:
    | {
        openFileDialog: (options: {
          filters?: { name: string; extensions: string[] }[]
        }) => Promise<string | null>
      }
    | undefined
}

export {}
