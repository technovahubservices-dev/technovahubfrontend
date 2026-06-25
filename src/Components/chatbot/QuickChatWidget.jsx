import React, { useEffect, useRef, useState } from 'react'
import { SendHorizontal, MessageCircle, LoaderCircle } from 'lucide-react'
import { CHAT_API_URL } from '../../data/constants.js'
import { COMPANY_PROFILE } from '../../data/company.js'
import { useSession } from '../../hooks/useSession.js'

const SYSTEM_PROMPT = `${COMPANY_PROFILE}

You are TechnovaHub's official website chatbot.
Answer in a short format only.
Use a title line if needed, then keep the reply to 2 short lines.
If the user asks about a topic title or chooses a quick option, reply with only the most important points.
If the user asks about company, courses, products, contact, or pricing, answer directly.`

export default function QuickChatWidget() {
  const sessionId = useSession()
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi, I am TechnovaHub AI. Ask me anything about our courses, services, or products.' },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const listRef = useRef(null)

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight
  }, [messages])

  const sendMessage = async () => {
    const text = input.trim()
    if (!text || loading) return

    const nextMessages = [...messages, { role: 'user', content: text }]
    setMessages(nextMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch(`${CHAT_API_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          contents: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...nextMessages.map((m) => ({
              role: m.role === 'assistant' ? 'model' : 'user',
              parts: [{ text: m.content }],
            })),
          ],
        }),
      })

      if (!res.ok) {
        throw new Error('Chat request failed')
      }

      const data = await res.json()
      const reply = data?.reply || 'Sorry, I could not generate a response.'
      setMessages([...nextMessages, { role: 'assistant', content: reply }])
    } catch {
      setMessages([
        ...nextMessages,
        { role: 'assistant', content: 'Connection issue. Please try again in a moment.' },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed bottom-24 right-4 z-[100002] w-[420px] max-w-[calc(100vw-1rem)] h-[620px] rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#0b1020] text-white flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-500">
        <div className="flex items-center gap-2 font-semibold text-lg">
          <MessageCircle size={18} />
          Technova AI Assistant
        </div>
      </div>

      <div ref={listRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#0b1020]">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-[85%] rounded-2xl px-4 py-3 text-base leading-7 ${
              msg.role === 'user'
                ? 'ml-auto bg-blue-600 text-white rounded-br-md'
                : 'mr-auto bg-white/10 text-white rounded-bl-md'
            }`}
          >
            {msg.content}
          </div>
        ))}

        {loading && (
          <div className="mr-auto inline-flex items-center gap-2 rounded-2xl rounded-bl-md bg-white/10 px-3 py-2 text-sm text-white/80">
            <LoaderCircle className="animate-spin" size={16} />
            Thinking...
          </div>
        )}
      </div>

      <div className="border-t border-white/10 p-3 bg-[#0f1730]">
        <div className="flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                sendMessage()
              }
            }}
            placeholder="Ask a question..."
            rows={2}
            className="flex-1 resize-none rounded-xl bg-white/10 px-3 py-2 text-base outline-none placeholder:text-white/40"
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="h-10 w-10 shrink-0 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center"
            aria-label="Send message"
          >
            <SendHorizontal size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
