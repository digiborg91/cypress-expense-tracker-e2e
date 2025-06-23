const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://track-expenses-v1.netlify.app/',
    env: {
      baseUrlReq: 'https://reqres.in/api',
      apiKey: 'reqres-free-v1'
    },
    setupNodeEvents(on, config) {
      // node event listeners here
    },
  }
})
