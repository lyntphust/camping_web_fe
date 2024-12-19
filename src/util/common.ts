export function kebabCaseToCamelCase(str: string) {
  return str.replace(/-./g, (x) => x[1].toUpperCase());
}

export function upsertQueryParam(
  searchParams: URLSearchParams,
  key: string,
  value: string | number
) {
  const params = new URLSearchParams(searchParams);
  params.set(key, value.toString());

  return params.toString();
}

export function upsertQueryParams(
  searchParams: URLSearchParams,
  params: Record<string, string>
) {
  const result = new URLSearchParams(searchParams);

  for (const key in params) {
    if (!params[key] || params[key] === "") {
      result.delete(key);
      continue;
    }

    result.set(key, params[key]);
  }

  return result.toString();
}

export function parseJwt(token: string) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
}
