export const queryString = (params: Record<string, any>): string => {
    const query = Object.entries(params)
        .filter(([, value]) => Boolean(value)) // bỏ falsy value
        .map(([key, value]) => encodeURIComponent(key) + '=' + encodeURIComponent(String(value)))
        .join('&')

    return query ? `?${query}` : ''
}
