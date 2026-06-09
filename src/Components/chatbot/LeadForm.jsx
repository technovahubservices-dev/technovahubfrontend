import React from 'react'

export default function LeadForm({ data, setData, onSubmit, onClose, loading, errors }) {
  return (
    <div className="tvh-lead">
      <h4>Share your contact details and we will reach out soon</h4>
      <div style={{ fontSize: 11, color: 'var(--txt2)', marginBottom: 4 }}>
        Created at: auto-generated on submit
      </div>
      <input
        placeholder="Your name *"
        value={data.name}
        onChange={e => setData(d => ({ ...d, name: e.target.value }))}
        aria-label="Your name"
      />
      {errors?.name && <span style={{ color: 'var(--red)', fontSize: 11 }}>{errors.name}</span>}
      <input
        type="email"
        placeholder="Email address *"
        value={data.email}
        onChange={e => setData(d => ({ ...d, email: e.target.value }))}
        aria-label="Email address"
      />
      {errors?.email && <span style={{ color: 'var(--red)', fontSize: 11 }}>{errors.email}</span>}
      <input
        type="tel"
        placeholder="Phone * (+91...)"
        value={data.phone}
        onChange={e => setData(d => ({ ...d, phone: e.target.value }))}
        aria-label="Phone number"
      />
      {errors?.phone && <span style={{ color: 'var(--red)', fontSize: 11 }}>{errors.phone}</span>}
      {errors?._network && <span style={{ color: 'var(--red)', fontSize: 11 }}>{errors._network}</span>}
      <div className="tvh-lead-btns">
        <button className="tvh-lead-go" onClick={onSubmit} disabled={loading} aria-label="Submit lead form">
          {loading ? 'Submitting...' : 'Connect Me →'}
        </button>
        <button className="tvh-lead-skip" onClick={onClose} aria-label="Skip lead form">Skip</button>
      </div>
    </div>
  )
}
