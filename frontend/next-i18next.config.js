module.exports = {
  i18n: {
    defaultLocale: 'fr',
    locales: ['en', 'fr'],
    localeDetection: true,
  },
  fallbackLng: {
    default: ['fr'],
  },
  debug: process.env.NODE_ENV === 'development',
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  
  /**
   * To avoid issues when deploying to some paas (vercel, netlify, etc.)
   * To also use the TypeScript version of the config, add `ts-node` package
   */
  serializeConfig: false,
}