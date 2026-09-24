/** Prefix a site path with the deploy base (e.g. `/SharpHire`). */
export function withBase(path: string, base: string = import.meta.env.BASE_URL): string {
  return `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}
