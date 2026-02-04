export function downloadJson(value: unknown, fileName: string) {
  const blob = new Blob([JSON.stringify(value, null, 2)], {
    type: "application/json",
  })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export async function saveJson(value: unknown, fileName: string) {
  const content = JSON.stringify(value, null, 2)

  if (globalThis.desktop) {
    const filePath = await globalThis.desktop.saveFileDialog({
      defaultPath: fileName,
      filters: [
        { name: "JSON Files", extensions: ["json"] },
        { name: "All Files", extensions: ["*"] },
      ],
    })

    if (!filePath) {
      return
    }

    await globalThis.desktop.writeFile({ filePath, content })
    return filePath
  }

  downloadJson(value, fileName)
  return undefined
}
