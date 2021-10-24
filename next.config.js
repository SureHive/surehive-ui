const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

const linguiConfig = require('./lingui.config.js')

const { locales, sourceLocale } = linguiConfig

const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(
  withPWA({
    webpack5: true,
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.resolve.fallback.fs = false
      }

      if (!config.resolve.fallback) {
        config.resolve.fallback = { util: require.resolve('util') }
      } else {
        config.resolve.fallback.util = require.resolve('util')
      }

      config.experiments = {
        asyncWebAssembly: true,
      }
      config.module.rules.push({ test: /\.wasm$/, type: 'webassembly/async' })

      if (config.plugins) {
        config.plugins.push(new NodePolyfillPlugin())
      } else {
        config.plugins = [new NodePolyfillPlugin()]
      }

      return config
    },
    pwa: {
      dest: 'public',
      runtimeCaching,
      disable: process.env.NODE_ENV === 'development',
    },
    images: {
      domains: [
        'assets.surehive.io',
        'assets.sushi.com',
        'res.cloudinary.com',
        'raw.githubusercontent.com',
        'logos.covalenthq.com',
      ],
    },
    reactStrictMode: true,
    async redirects() {
      return [
        {
          source: '/',
          destination: '/wallet',
          permanent: true,
        },
        {
          source: '/zap',
          destination: '/',
          permanent: true,
        },
        {
          source: '/yield',
          destination: '/farm',
          permanent: true,
        },
        {
          source: '/bento',
          destination: '/bentobox',
          permanent: true,
        },
        {
          source: '/bento/kashi',
          destination: '/lend',
          permanent: true,
        },
      ]
    },
    async rewrites() {
      return [
        {
          source: '/stake',
          destination: '/bar',
        },
        {
          source: '/add/:token*',
          destination: '/exchange/add/:token*',
        },
        {
          source: '/remove/:token*',
          destination: '/exchange/remove/:token*',
        },
        {
          source: '/create/:token*',
          destination: '/exchange/add/:token*',
        },
        // {
        //   source: '/swaps',
        //   destination: '/exchange/swap',
        // },
        // {
        //   source: '/swaps/:token*',
        //   destination: '/exchange/swap/:token*',
        // },
        {
          source: '/limit-order',
          destination: '/exchange/limit-order',
        },
        {
          source: '/limit-order/:token*',
          destination: '/exchange/limit-order/:token*',
        },
        {
          source: '/open-order',
          destination: '/exchange/open-order',
        },
        {
          source: '/migrate',
          destination: '/exchange/migrate',
        },
        // {
        //   source: '/pools',
        //   destination: '/exchange/pool',
        // },
        {
          source: '/find',
          destination: '/exchange/find',
        },
        // Kashi
        {
          source: '/borrow',
          destination: '/kashi/borrow',
        },
        {
          source: '/borrow/:token*',
          destination: '/kashi/borrow/:token*',
        },
        {
          source: '/lend',
          destination: '/kashi/lend',
        },
        {
          source: '/lend/:token*',
          destination: '/kashi/lend/:token*',
        },
        // Onsen
        // {
        //   source: '/farm',
        //   destination: '/onsen',
        // },
        // {
        //   source: '/farm/:type*',
        //   destination: '/onsen/:type*',
        // },
        {
          source: '/me',
          destination: '/user',
        },
        {
          source: '/balances',
          destination: '/user/balances',
        },
      ]
    },
    i18n: {
      locales,
      defaultLocale: sourceLocale,
    },
  })
)

// Don't delete this console log, useful to see the config in Vercel deployments
console.log('next.config.js', JSON.stringify(module.exports, null, 2))
