import DOMPurify from 'isomorphic-dompurify';

export default function sanitizeBlockContent(blockContent: string) {
  let result = blockContent

  // Wrap content in a div
  result = `<div class="widget block block-static-block">${result}</div>`

  // Remove all widgets
  const widgetRegex = /\{\{\s?widget[\s\S]*?\}\}/g
  result = result.replace(widgetRegex, '')

  // Convert store URLs
  const storeUrlRegex = /\{\{store\s+url\s*=\s*["'][^"']*["']\s*}}/g
  if (!process.env.MAGENTO_BASE_URL) {
    return result
  }
  result = result.replace(storeUrlRegex, process.env.MAGENTO_BASE_URL + '/')

  // Convert media URLs
  const mediaUrlRegex = /\{\{media\s+url\s*=\s*["']([^"']+)["']\s*}}/g
  if (!process.env.MAGENTO_BASE_URL) {
    return result
  }
  result = result.replace(
    mediaUrlRegex,
    `${process.env.MAGENTO_BASE_URL}/media/$1`
  )

  // Replace all backend links with frontend links
  result = result
    .replace(
      new RegExp(`href="${process.env.MAGENTO_BASE_URL}(.*?\\.html)"`, 'g'),
      `href="${process.env.BASE_URL}$1"`
    )
    .replace(/\.html"/g, '"')

  return DOMPurify.sanitize(result)
}
