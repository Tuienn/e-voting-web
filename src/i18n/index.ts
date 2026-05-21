import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import EN_HOME from './locales/en/home.json'
import EN_LAYOUT from './locales/en/layout.json'
import EN_AUTH from './locales/en/auth.json'
import EN_PERSONAL from './locales/en/personal.json'
import EN_ELECTION_MANAGEMENT from './locales/en/electionManagement.json'
import EN_USER_MANAGEMENT from './locales/en/userManagement.json'
import EN_$ELECTION_ID from './locales/en/$electionId.json'
import EN_COMMON from './locales/en/common.json'

import VI_HOME from './locales/vi/home.json'
import VI_LAYOUT from './locales/vi/layout.json'
import VI_AUTH from './locales/vi/auth.json'
import VI_PERSONAL from './locales/vi/personal.json'
import VI_ELECTION_MANAGEMENT from './locales/vi/electionManagement.json'
import VI_USER_MANAGEMENT from './locales/vi/userManagement.json'
import VI_$ELECTION_ID from './locales/vi/$electionId.json'
import VI_COMMON from './locales/vi/common.json'

export const resources = {
    en: {
        home: EN_HOME,
        layout: EN_LAYOUT,
        auth: EN_AUTH,
        personal: EN_PERSONAL,
        electionManagement: EN_ELECTION_MANAGEMENT,
        userManagement: EN_USER_MANAGEMENT,
        $electionId: EN_$ELECTION_ID,
        common: EN_COMMON
    },
    vi: {
        home: VI_HOME,
        layout: VI_LAYOUT,
        auth: VI_AUTH,
        personal: VI_PERSONAL,
        electionManagement: VI_ELECTION_MANAGEMENT,
        userManagement: VI_USER_MANAGEMENT,
        $electionId: VI_$ELECTION_ID,
        common: VI_COMMON
    }
}

export const defaultNS = 'home'

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        defaultNS,
        ns: ['home', 'layout', 'auth', 'personal', 'electionManagement', 'userManagement', '$electionId', 'common'],
        interpolation: {
            escapeValue: false
        },
        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage']
        }
    })

export default i18n
