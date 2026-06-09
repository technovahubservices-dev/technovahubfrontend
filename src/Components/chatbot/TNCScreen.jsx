import React from 'react'

export default function TNCScreen({ onAccept, onDecline }) {
  return (
    <div className="tvh-tnc">
      <div className="tvh-tnc-logo">⚡</div>
      <h3>Before we chat</h3>
      <p>
        TechnovaHub Assistant uses AI to answer your questions about our courses, products, and services.
        By continuing, you agree to our{' '}
        <a href="https://technovahub.in/privacy" target="_blank" rel="noopener">Privacy Policy</a>.
        Your conversations may be used to improve the service.
      </p>
      <div className="tvh-tnc-btns">
        <button className="tvh-tnc-yes" onClick={onAccept}>Accept &amp; Chat →</button>
        <button className="tvh-tnc-no"  onClick={onDecline}>Decline</button>
      </div>
    </div>
  )
}
