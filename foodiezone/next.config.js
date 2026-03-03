/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  sw: '/sw.js',
})

module.exports = withPWA({
  reactStrictMode: true,
  experimental: {
    webpackBuildWorker: true
  },
  webpack: (config) => {
    // Disable webpack 5 features that conflict with PWA
    config.experiments = {
      ...config.experiments,
      topLevelAwait: false,
      layers: false
    }
    return config
  },
  turbopack: {},
  // Railway specific configuration
  output: 'standalone',
  // Ensure proper port binding for Railway
  serverRuntimeConfig: {
    port: process.env.PORT || 3000
  }
})
