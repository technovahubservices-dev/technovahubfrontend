// ─── STORAGE KEYS ─────────────────────────────────────────────────────────
export const SK = {
  CHAT:  'tvh_chat_v3',
  LANG:  'tvh_lang',
  THEME: 'tvh_theme',
  TTS:   'tvh_tts',
  LEADS: 'tvh_leads',
  NAME:  'tvh_user_name',
  CTX:   'tvh_user_ctx',
  TNC:   'tvh_tnc',
}

// ─── LAYOUT DEFAULTS ──────────────────────────────────────────────────────
export const DEFAULT_POS  = { bottom: 172, right: 24 }
export const DEFAULT_SIZE = { w: 380, h: 500 }

// ─── API CONFIG ───────────────────────────────────────────────────────────
// Keep admin APIs and chatbot APIs on separate backend bases.
const env = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env : {}

const isLocalhost = typeof window !== 'undefined'
  && ['localhost', '127.0.0.1', '[::1]'].includes(window.location.hostname)

export const API_BASE_URL = env.VITE_API_BASE_URL || (isLocalhost
  ? 'http://localhost:10000'
  : 'https://technovahub-solution-backend-yabn.onrender.com')
export const CHAT_API_BASE_URL = env.VITE_CHAT_API_BASE_URL || 'https://technovabackend-alhf.onrender.com'

export const API_URL = `${API_BASE_URL}/api`
export const CHAT_API_URL = `${CHAT_API_BASE_URL}/api`
