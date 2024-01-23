export function kebabCaseToCamelCase(str: string) {
  return str.replace(/-./g, (x) => x[1].toUpperCase())
}

interface QueryParamPair {
  key: string
  value: string | number
}

export function upsertQueryParam(
  searchParams: URLSearchParams,
  key: string,
  value: string | number
) {
  const params = new URLSearchParams(searchParams)
  params.set(key, value.toString())

  return params.toString()
}

export function upsertQueryParams(
  searchParams: URLSearchParams,
  params: Record<string, string>
) {
  const result = new URLSearchParams(searchParams)

  for (const key in params) {
    if (!params[key] || params[key] === '') {
      result.delete(key)
      continue
    }

    result.set(key, params[key])
  }

  return result.toString()
}
