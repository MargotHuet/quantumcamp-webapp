'use client'

import React from 'react'
import { useState } from 'react'
import { setConsent } from './useConsent'

interface Props {
  onClose: () => void
}

export default function CookieSettingsModal({ onClose }: Props) {
  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)

  const handleSave = () => {
    setConsent({
      functional: true,
      analytics,
      marketing,
    })
    onClose()
    window.location.reload()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Paramètres des cookies</h2>

        <div className="space-y-3">
          <div>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked disabled />
              Cookies fonctionnels (toujours actifs)
            </label>
          </div>
          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
              />
              Cookies analytiques
            </label>
          </div>
          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
              />
              Cookies marketing
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Annuler
          </button>
          <button onClick={handleSave} className="bg-black text-white px-4 py-2 rounded">
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  )
}
