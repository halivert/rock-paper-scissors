export function filterObject<T extends Object>(
  obj: T,
  filterFn: (item: [keyof T, T[keyof T]]) => boolean
): Partial<T> {
  const entries = Object.entries(obj) as [keyof T, T[keyof T]][]
  return Object.fromEntries(entries.filter(filterFn)) as Partial<T>
}

export function getBooleanQueryParam(paramName: string): boolean {
  const params = new URLSearchParams(document.location.search)

  const param = params.get(paramName)

  if (param == null) return false

  return ["true", "1", ""].includes(param)
}
