import CryptoJS from 'crypto-js'
import { SECRET_KEY } from '../constants/env.config'

export const encrypt = (text: string) => {
    try {
        return CryptoJS.AES.encrypt(text, SECRET_KEY).toString()
    } catch (error) {
        console.error('Encryption error:', error)
        return null
    }
}

export const decrypt = (encryptedText: string) => {
    try {
        const bytes = CryptoJS.AES.decrypt(encryptedText, SECRET_KEY)
        return bytes.toString(CryptoJS.enc.Utf8)
    } catch (error) {
        console.error('Decryption error:', error)
        return null
    }
}
