import Cookies from 'js-cookie'

export const getConsent = (): Record<string, boolean> => {
  const value = Cookies.get('cookie_consent')
  return value ? JSON.parse(value) : {}
}

export const setConsent = (consent: Record<string, boolean>) => {
  Cookies.set('cookie_consent', JSON.stringify(consent), { expires: 365 })
}

export const useConsent = () => {
  const consent = getConsent()
  return consent.analytics === true // ou adaptatif selon besoin
}
