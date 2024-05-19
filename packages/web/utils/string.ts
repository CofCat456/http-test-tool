export function stringifyUnquoted(obj: any) {
  return JSON.stringify(obj, null, 2)
    .replace(/"(\w+)":/g, '$1:')
    .replace(/"/g, '\'')
}
