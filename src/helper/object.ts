export function exportJSONFile(items: any, fileTitle: string) {
  // Convert Object to JSON
  const jsonObject = JSON.stringify(items, null, 2)

  const exportedFilenmae = fileTitle + '.json' || 'export.csv'

  const blob = new Blob([jsonObject], { type: 'application/json;charset=utf-8;' })

  const link = document.createElement('a')
  if (link.download !== undefined) {
    // feature detection
    // Browsers that support HTML5 download attribute
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', exportedFilenmae)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }
}
