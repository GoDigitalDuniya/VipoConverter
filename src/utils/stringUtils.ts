/**
 * Converts a kebab-case or snake_case string into a human-readable title.
 * 
 * @example
 * prettyName("data-storage") // "Data Storage"
 * prettyName("dynamic_viscosity") // "Dynamic Viscosity"
 * 
 * @param key - The string to convert
 * @returns A prettified title string
 */
export function prettyName(key?: string): string {
  if (!key) return "";
  return key
    .replace(/[-_]/g, " ")
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
}
