import { useState, useCallback, useRef } from 'react'
import { SK } from '../data/constants.js'
import { useLocalStorage } from './useLocalStorage.js'

function buildGreeting(lang, name) {
  if (lang === 'tg') {
    return {
      content: `Vanakkam${name ? ` ${name}` : ''}! TechnovaHub-ku welcome.\n\nNaan ungalukku help panna mudiyum:\n✓ Software development\n✓ AI solutions\n✓ Automation services\n✓ Mobile applications\n✓ Internship programs\n✓ Technical consultation\n\nEnna help venum?`,
      chips: ['Software development', 'AI solutions', 'Automation services', 'Internship programs', 'Courses', 'Contact team', 'Get quote'],
    }
  }

  return {
    content: `Welcome to TechnovaHub${name ? `, ${name}` : ''}.\n\nI can help you with:\n✓ Software Development\n✓ AI Solutions\n✓ Automation Services\n✓ Mobile Applications\n✓ Internship Programs\n✓ Technical Consultation\n\nHow can I assist you today?`,
    chips: ['Software Development', 'AI Solutions', 'Automation Services', 'Internship', 'Courses', 'Contact Team', 'Get Quote'],
  }
}

export function useChatState() {
  const [lang, setLang] = useLocalStorage(SK.LANG, 'en')
  const [userName, setUserName] = useLocalStorage(SK.NAME, '')
  const [tncRaw, setTncRaw] = useLocalStorage(SK.TNC, '0')
  const tncDone = tncRaw === '1'

  const [messages, setMessages] = useState(() => {
    if (tncRaw !== '1') return []
    try {
      const stored = typeof window !== 'undefined' ? window.localStorage.getItem(SK.CHAT) : null
      return JSON.parse(stored || '[]')
    } catch {
      return []
    }
  })

  const greetRef = useRef(false)

  const persistMessages = useCallback((msgs) => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(SK.CHAT, JSON.stringify(msgs.slice(-120)))
      }
    } catch {
      /* localStorage unavailable */
    }
  }, [])

  const addMessage = useCallback((msg) => {
    setMessages((prev) => {
      const next = [...prev, msg]
      persistMessages(next)
      return next
    })
  }, [persistMessages])

  const setMessagesAndPersist = useCallback((updater) => {
    setMessages((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater
      persistMessages(next)
      return next
    })
  }, [persistMessages])

  const clearChat = useCallback(() => {
    setMessages([])
    greetRef.current = false
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(SK.CHAT)
      }
    } catch {
      /* */
    }
    setTimeout(() => {
      setMessages([{ role: 'assistant', ...buildGreeting(lang, userName), time: new Date().toISOString() }])
      greetRef.current = true
    }, 50)
  }, [lang, userName])

  const exportChat = useCallback(() => {
    const lines = ['TechnovaHub Assistant Chat Export', new Date().toLocaleString(), '-'.repeat(42), '']
    messages.forEach((m) => {
      lines.push(`${m.role === 'user' ? 'You' : 'TechnovaHub'}: ${m.content}`)
      lines.push('')
    })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([lines.join('\n')], { type: 'text/plain' }))
    a.download = `tvh-chat-${Date.now()}.txt`
    a.click()
  }, [messages])

  const initGreeting = useCallback((open) => {
    if (open && tncDone && !greetRef.current && messages.length === 0) {
      greetRef.current = true
      const msg = { role: 'assistant', ...buildGreeting(lang, userName), time: new Date().toISOString() }
      setMessages([msg])
      persistMessages([msg])
    }
  }, [tncDone, messages.length, lang, userName, persistMessages])

  return {
    messages,
    setMessages: setMessagesAndPersist,
    addMessage,
    lang,
    setLang,
    userName,
    setUserName,
    tncRaw,
    setTncRaw,
    tncDone,
    greetRef,
    clearChat,
    exportChat,
    initGreeting,
    buildGreeting,
  }
}
