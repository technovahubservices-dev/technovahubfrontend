import { useState } from 'react'

const SESSION_KEY = 'tvh_session_id'

function createSessionId() {
  return globalThis.crypto?.randomUUID?.() ?? `tvh-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function getOrCreateSessionId() {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return createSessionId()
    const existing = window.localStorage.getItem(SESSION_KEY)
    if (existing) return existing
    const id = createSessionId()
    window.localStorage.setItem(SESSION_KEY, id)
    return id
  } catch {
    return createSessionId()
  }
}

export function useSession() {
  const [sessionId] = useState(getOrCreateSessionId)
  return sessionId
}
