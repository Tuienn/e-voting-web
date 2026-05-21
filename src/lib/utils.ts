import i18n from '../i18n'

export const queryString = (params: Record<string, any>): string => {
    const query = Object.entries(params)
        .filter(([, value]) => Boolean(value)) // bỏ falsy value
        .map(([key, value]) => encodeURIComponent(key) + '=' + encodeURIComponent(String(value)))
        .join('&')

    return query ? `?${query}` : ''
}

export function removeEmptyValues<T extends Record<string, any>>(obj: T) {
    return Object.fromEntries(
        Object.entries(obj).filter(([_, value]) => {
            return value !== undefined && value !== null && value !== ''
        })
    ) as Partial<T>
}

export const formatDateTime = (value?: string | null) => {
    if (!value) return '-'

    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return '-'

    return new Intl.DateTimeFormat(i18n.language, {
        dateStyle: 'medium',
        timeStyle: 'short'
    }).format(date)
}
