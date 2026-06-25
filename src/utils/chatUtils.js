import { COMPANY_PROFILE } from '../data/company.js'

/**
 * Builds the Gemini system instruction string.
 * Isolated here so it can be tested and updated without touching UI components.
 */
export function buildSystemPrompt({ name, ctx, intent, frustrated, lang, quickTitle }) {
  const langRule = lang === 'tg'
    ? 'RESPOND IN TANGLISH ONLY. Use English letters and keep the reply in Tanglish. Do not use native script. Keep technical terms in English when needed.'
    : 'RESPOND IN ENGLISH ONLY.'

  const intentBlock = {
    student:    'USER TYPE: STUDENT. Be warm, encouraging. Mention job outcomes and career paths.',
    business:   'USER TYPE: BUSINESS. Lead with ROI. Numbers first. Specific outcomes.',
    developer:  'USER TYPE: DEVELOPER. Go deep on tech specs, APIs, architecture.',
    enterprise: 'USER TYPE: ENTERPRISE. Formal-direct. Mention SLA, TCS/HCL partnerships.',
  }[intent] || ''

  return `You are TechnovaHub Assistant — official AI chatbot for TechnovaHub (technovahub.in).
${name ? `User name: ${name}. Use it naturally.` : ''}
${ctx ? `User context: ${ctx}` : ''}
${intentBlock}
${frustrated ? 'USER FRUSTRATED: Extra warm, simple, empathetic. Offer human contact right away.' : ''}

CRITICAL LANGUAGE RULE: ${langRule}

STYLE (GenZ AI — sharp, warm, direct, no corporate BS):
- Answer DIRECTLY first. No "Here's a comprehensive overview", no "Certainly!", no "Great question!"
- Keep replies short: title line if helpful, then only 2 very short lines.
- If the user clicks a topic chip or asks about a specific title, give only the key points.
- If this reply is for a quick chip selection, start with the selected title on its own line and keep the rest to 2 short lines.
- Quick chip title: ${quickTitle || ''}
- Use bullet points with lines starting "• " for lists. Do not use `-` or `**` in the final reply.
- yes/no/ok/sure/continue/yes/right -> go DEEPER on previous topic naturally, don't ask them to repeat
- Single word replies -> respond directly and engage naturally
- EVERY response ends with one follow-up question OR [CHIPS: opt1 | opt2 | opt3]
- Pricing/demo interest -> mention you can connect them with the team
- Any problem -> +91 9629600230 | technovahubcareer@gmail.com
- Answer ALL questions about TechnovaHub — courses, products, fees, location, internships, everything

${COMPANY_PROFILE}`
}

// ─── INTENT / TRIGGER DETECTORS ──────────────────────────────────────────
export const detectIntent = (text) => {
  if (/course|learn|internship|career|college|fee|student|training|study/i.test(text)) return 'student'
  if (/company|automate|employee|customer|roi|business|revenue|crm|whatsapp|nexion/i.test(text)) return 'business'
  if (/api|integrate|code|github|stack|webhook|developer|sdk/i.test(text)) return 'developer'
  if (/enterprise|scale|procurement|contract|sla|white.?label/i.test(text)) return 'enterprise'
  return ''
}

export const detectName = (text, cb) => {
  const m = text.match(/(?:i.?m|i am|my name is|naan|call me)\s+([A-Za-z]{2,20})/i)
  if (m) cb(m[1])
}

export const detectFrustration = (msgs) =>
  msgs.filter(m => m.role === 'user').slice(-4).some(m =>
    /not helpful|useless|wrong|\?\?\?|terrible/i.test(m.content) ||
    (m.content.length > 3 && m.content === m.content.toUpperCase())
  )

export const needsLead    = (t) => /demo|pricing|trial|contact|enterprise|let.?s talk|book|call me/i.test(t)
export const needsPricing = (q, a) => /nexion.*pric|pric.*nexion|starter|growth plan|plan.*price/i.test(a) || /how much.*nexion|nexion.*cost|nexion.*price/i.test(q)
export const needsCourses = (q) => /course.*list|all course|show.*course|what course|courses.*offer/i.test(q)

// ─── SEARCH HELPERS ─────────────────────────────────────────────────────
export function searchMessages(messages, query) {
  if (!query || !query.trim()) return []
  const q = query.toLowerCase()
  return messages.reduce((acc, m, i) => {
    if (m.content.toLowerCase().includes(q)) acc.push(i)
    return acc
  }, [])
}

// ─── CHIP / TEXT HELPERS ──────────────────────────────────────────────────
export const parseChips = (t) => {
  const m = t?.match(/\[CHIPS:\s*([^\]]+)\]/i)
  return m ? m[1].split('|').map(s => s.trim()).filter(Boolean) : null
}

export const stripChips = (t) => t?.replace(/\[CHIPS:[^\]]+\]/gi, '').trim() || ''

export function formatAssistantText(text) {
  const lines = String(text || '').replace(/\r/g, '').split('\n')
  const out = []
  let inList = false

  const closeList = () => {
    if (inList) {
      out.push('</ul>')
      inList = false
    }
  }

  for (const line of lines) {
    const trimmed = line.trim()

    if (!trimmed) {
      closeList()
      out.push('<br/>')
      continue
    }

    const bulletMatch = trimmed.match(/^[-*•]\s+(.+)$/)
    if (bulletMatch) {
      if (!inList) {
        out.push('<ul>')
        inList = true
      }
      out.push(`<li>${bulletMatch[1]}</li>`)
      continue
    }

    closeList()
    out.push(trimmed.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>'))
  }

  closeList()
  return out.join('')
}

export const fmtTime = (d) => {
  try {
    if (!d) return ''
    const date = new Date(d)
    if (isNaN(date.getTime())) return ''
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  } catch { return '' }
}
