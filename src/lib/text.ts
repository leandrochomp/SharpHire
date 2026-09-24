/** Plain-text excerpt of a Markdown body for meta descriptions. */
export function excerpt(markdown: string, max = 155): string {
  const text = markdown
    .replace(/^#+\s.*$/gm, '') // headings
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1') // links/images -> text
    .replace(/^\s*(?:[-*+]|\d+\.|>)\s+/gm, '') // list/quote markers
    .replace(/[*_`]/g, '') // emphasis/code
    .replace(/\s+/g, ' ')
    .trim();
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trimEnd()}…`;
}
