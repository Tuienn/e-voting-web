export const saveDataStorage = (key: string, data: any, type: 'local' | 'session' = 'local') => {
    let storage = localStorage
    if (type === 'session') {
        storage = sessionStorage
    }
    if (Array.isArray(data) || typeof data === 'object') {
        storage.setItem(key, JSON.stringify(data))
    } else if (data === null || data === undefined) {
        console.error('No data to save into local')
        return
    } else {
        storage.setItem(key, data)
    }
}

export const getDataStorage = (key: string, type: 'local' | 'session' = 'local') => {
    let storage = localStorage
    if (type === 'session') {
        storage = sessionStorage
    }
    const dataStorage = storage.getItem(key)
    if (dataStorage === null) {
        return null
    } else {
        try {
            const data = JSON.parse(dataStorage)
            return data
        } catch {
            return dataStorage
        }
    }
}

export const removeDataStorage = (key: string, type: 'local' | 'session' = 'local') => {
    let storage = localStorage
    if (type === 'session') {
        storage = sessionStorage
    }
    storage.removeItem(key)
}
