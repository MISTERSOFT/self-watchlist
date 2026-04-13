import string from '@adonisjs/core/helpers/string'

//
// NOTE:
// This extension is not a macro, so no need to load the extension into the AppProvider.
//

/**
 * Remove HTML tags from a string
 * @param html HTML as string
 * @returns A string without HTML tags
 */
const stripHtmlTags = (html: string): string => {
  if (!html) return ''

  return (
    html
      // Remove HTML tags
      .replace(/<[^>]*>/g, '')
      // Decode current HTML entities
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/&apos;/g, "'")
      // Clean spaces
      .replace(/\s+/g, ' ')
      .trim()
  )
}

const stringExtension = {
  ...string,
  stripHtmlTags,
}

export default stringExtension
