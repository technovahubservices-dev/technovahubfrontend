import React, { forwardRef } from 'react'
import { sanitize } from '../../utils/sanitize.js'
import { fmtTime, formatAssistantText } from '../../utils/chatUtils.js'
import PricingCards from './PricingCards.jsx'
import CourseCards from './CourseCards.jsx'
import logo from '../../assets/images/logo.png'

const MessageList = forwardRef(function MessageList({
  lang, messages, streaming, loading, hlText, sendRef, resetInact, showLead, leadDone,
  leadFormNode, showContact, contactNode,
}, ref) {
  const emptyCopy = lang === 'tg'
    ? {
        title: 'TechnovaHub pathi enna venalum kelunga',
        chips: ['TechnovaHub enna seyyum?', 'Padippu details kaamikkavum', 'Nexion pricing'],
      }
    : {
        title: 'Ask me anything about TechnovaHub',
        chips: ['What does TechnovaHub do?', 'Show me courses', 'Nexion pricing'],
      }

  const renderMsg = (msg, i) => {
    const isU = msg.role === 'user'
    const hasQuickTitle = !isU && msg.quickReply && msg.replyTitle

    return (
      <div key={i} className={`tvh-msg${isU ? ' u' : ''}`}>
        <div className={`tvh-mav ${isU ? 'usr' : 'bot'}`}>
          {isU ? '👤' : <img src={logo} alt="TechnovaHub" className="tvh-mav-logo" />}
        </div>
        <div className="tvh-mb">
          {hasQuickTitle && <div className="tvh-topic-title">{msg.replyTitle}</div>}
          <div className={`tvh-bub ${isU ? 'usr' : 'bot'}`} dangerouslySetInnerHTML={{ __html: sanitize(hlText(isU ? msg.content : formatAssistantText(msg.content))) }} />
          {msg.showPricing && !isU && <PricingCards onContact={(title) => sendRef.current(`I want a Nexion demo`, { quickChoice: true, quickTitle: title })} />}
          {msg.showCourses && !isU && <CourseCards onSelect={c => sendRef.current(`Tell me about the ${c} course`, { quickChoice: true, quickTitle: c })} />}
          {msg.chips && !isU && (
            <div className="tvh-chips">
              {msg.chips.map((c, j) => (
                <button key={j} className="tvh-chip" onClick={() => { resetInact(); sendRef.current(c, { quickChoice: true, quickTitle: c }) }}>{c}</button>
              ))}
            </div>
          )}
          <span className="tvh-ts">{fmtTime(msg.time)}</span>
        </div>
      </div>
    )
  }

  return (
    <div ref={ref} className="tvh-msgs">
      {messages.length === 0 && !loading && !streaming && (
        <div className="tvh-empty">
          <div className="tvh-empty-icon"><img src={logo} alt="TechnovaHub" className="tvh-empty-logo" /></div>
          <div className="tvh-empty-text">{emptyCopy.title}</div>
          <div className="tvh-empty-chips">
            {emptyCopy.chips.map((q, i) => (
              <button key={i} className="tvh-chip" onClick={() => sendRef.current(q, { quickChoice: true, quickTitle: q })}>{q}</button>
            ))}
          </div>
        </div>
      )}

      {messages.map((m, i) => renderMsg(m, i))}

      {streaming && (
        <div className="tvh-msg">
          <div className="tvh-mav bot"><img src={logo} alt="TechnovaHub" className="tvh-mav-logo" /></div>
          <div className="tvh-mb">
            <div className="tvh-bub bot tvh-cur" dangerouslySetInnerHTML={{ __html: sanitize(hlText(formatAssistantText(streaming))) }} />
          </div>
        </div>
      )}

      {loading && !streaming && (
        <div className="tvh-msg">
          <div className="tvh-mav bot"><img src={logo} alt="TechnovaHub" className="tvh-mav-logo" /></div>
          <div className="tvh-mb">
            <div className="tvh-bub bot">
              <div className="tvh-skel">
                <div className="tvh-skel-line" />
                <div className="tvh-skel-line" />
                <div className="tvh-skel-line" />
              </div>
            </div>
          </div>
        </div>
      )}

      {showContact && (
        <div className="tvh-msg">
          <div className="tvh-mav bot"><img src={logo} alt="TechnovaHub" className="tvh-mav-logo" /></div>
          <div className="tvh-mb" style={{ maxWidth: '92%' }}>
            {contactNode}
          </div>
        </div>
      )}

      {showLead && !leadDone && (
        <div className="tvh-msg">
          <div className="tvh-mav bot"><img src={logo} alt="TechnovaHub" className="tvh-mav-logo" /></div>
          <div className="tvh-mb" style={{ maxWidth: '92%' }}>
            {leadFormNode}
          </div>
        </div>
      )}
    </div>
  )
})

export default MessageList
