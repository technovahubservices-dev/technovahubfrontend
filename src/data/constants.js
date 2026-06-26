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

export const API_BASE_URL = env.VITE_API_BASE_URL || 'https://technovahub-solution-backend-vmz7.onrender.com'
export const CHAT_API_BASE_URL = env.VITE_CHAT_API_BASE_URL || 'https://technovabackend-si9o.onrender.com'

export const API_URL = `${API_BASE_URL}/api`
export const CHAT_API_URL = `${CHAT_API_BASE_URL}/api`
