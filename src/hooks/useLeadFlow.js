import { useState, useCallback } from 'react'
import { API_URL } from '../data/constants.js'

export function useLeadFlow({ setMessages }) {
  const [showLead, setShowLead] = useState(false)
  const [leadDone, setLeadDone] = useState(false)
  const [leadData, setLeadData] = useState({ name: '', email: '', phone: '', createdAt: '' })
  const [leadLoading, setLeadLoading] = useState(false)
  const [leadErrors, setLeadErrors] = useState({})

  const openLeadForm = useCallback(() => {
    setLeadDone(false)
    setLeadErrors({})
    setLeadData({ name: '', email: '', phone: '', createdAt: '' })
    setShowLead(true)
  }, [])
  const closeLeadForm = useCallback(() => setShowLead(false), [])

  const validateLead = useCallback(() => {
    const errors = {}
    const name = (leadData.name || '').trim()
    const email = (leadData.email || '').trim()
    const phone = (leadData.phone || '').replace(/[\s-]/g, '')
    if (!name || name.length < 2) errors.name = 'Name must be at least 2 characters.'
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email address.'
    if (!/^(\+91)?[6-9]\d{9}$/.test(phone)) errors.phone = 'Enter a valid Indian mobile number.'
    return errors
  }, [leadData])

  const submitLead = useCallback(async () => {
    const errors = validateLead()
    if (Object.keys(errors).length > 0) {
      setLeadErrors(errors)
      return
    }

    setLeadLoading(true)
    setLeadErrors({})
    const createdAt = new Date().toISOString()

    try {
      const res = await fetch(`${API_URL}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...leadData, createdAt, source: 'chatbot' }),
      })

      if (res.status === 201) {
        const data = await res.json().catch(() => ({}))
        setLeadDone(true)
        setShowLead(false)
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: data.sheetSaved
            ? 'Done! We saved your contact details and the sheet entry was sent successfully.\n\n📞 +91 9629600230\n📧 technovahubcareer@gmail.com'
            : 'Done! We saved your contact details in MongoDB, but the sheet entry needs checking.\n\n📞 +91 9629600230\n📧 technovahubcareer@gmail.com',
          time: new Date().toISOString(),
        }])
      } else if (res.status === 400) {
        const data = await res.json()
        setLeadErrors(data.errors || {})
      } else {
        setLeadErrors({ _network: 'Something went wrong. Please try again.' })
      }
    } catch {
      setLeadErrors({ _network: 'Network error. Please check your connection and try again.' })
    } finally {
      setLeadLoading(false)
    }
  }, [leadData, setMessages, validateLead])

  return {
    showLead, leadDone, leadData, setLeadData,
    leadLoading, leadErrors,
    openLeadForm, closeLeadForm,
    submitLead,
  }
}
