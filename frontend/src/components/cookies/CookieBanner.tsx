'use client'

import React from 'react'
import { useEffect, useState } from 'react'
import { setConsent, getConsent } from './useConsent'
import CookieSettingsModal from './CookiesSettingsModals'

const CookieBanner = () => {
  const [visible, setVisible] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  useEffect(() => {
    const consent = getConsent()
    if (Object.keys(consent).length === 0) setVisible(true)
  }, [])

  const handleAccept = () => {
    setConsent({ functional: true, analytics: true, marketing: true })
    setVisible(false)
    window.location.reload()
  }

  const handleDecline = () => {
    setConsent({ functional: true, analytics: false, marketing: false })
    setVisible(false)
  }

  return (
    <>
      {visible && (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t p-4 shadow-md z-50">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-800 text-sm">
              Ce site utilise des cookies pour améliorer votre expérience. Vous pouvez accepter, refuser ou personnaliser vos choix.
            </p>
            <div className="flex gap-2">
              <button onClick={handleDecline} className="border px-4 py-2 rounded text-sm">
                Refuser
              </button>
              <button onClick={() => setShowSettings(true)} className="border px-4 py-2 rounded text-sm">
                Paramétrer
              </button>
              <button onClick={handleAccept} className="bg-black text-white px-4 py-2 rounded text-sm">
                Accepter
              </button>
            </div>
          </div>
        </div>
      )}
      {showSettings && <CookieSettingsModal onClose={() => setShowSettings(false)} />}
    </>
  )
}

export { CookieBanner }
