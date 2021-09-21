const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

module.exports = {
  // important: '#__next',
  // darkMode: true,
  mode: 'jit',
  future: {
    purgeLayersByDefault: true,
    applyComplexClasses: true,
  },
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  plugins: [require('tailwindcss-border-gradients')()],
  theme: {
    extend: {
      screens: {
        mobile: { max: '767px' },
      },
      spacing: {
        538: '538px',
        406: '406px',
      },
      minWidth: {
        904: '904px',
      },
      linearBorderGradients: {
        directions: {
          tr: 'to top right',
          r: 'to right',
        },
        colors: {
          'blue-light-blue': ['#004BFF', '#0004F7'],
          'pink-red-light-brown': ['#FE5A75', '#FEC464'],
          'blue-light-dark': ['#004BFF 0%', '#3772FF 42%', '#0004F7 100%'],
        },
        background: {
          'dark-900': '#141416',
          'dark-1000': '#161522',
          'dark-800': '#202231',
          'dark-600': '#23262F',
        },
        border: {
          1: '1px',
          2: '2px',
          3: '3px',
          4: '4px',
        },
      },
      backgroundImage: {
        'draw-menu-dark': 'url(/images/patterns/pattern-drawmenu.svg)',
        'draw-menu-light': 'url(/images/patterns/pattern-drawmenu-light.svg)',
      },
      colors: {
        purple: '#2B39990',
        blue: '#0993ec',
        pink: '#4DC1EF',
        green: '#7cff6b',
        red: '#ff3838',
        yellow: '#ffd166',
        white: '#FFFFFF',
        gray: '#B1B5C3',

        'blue-100': '#3772FF',

        'white-100': '#FCFCFD',
        'white-130': '#F8F8F9',
        'white-150': '#F4F5F6',
        'white-200': '#E6E8EC',
        'white-900': '#777E90',
        'opaque-blue': '#2B3990',
        'opaque-pink': '#4DC1EF',
        orange: '#FF6838',
        'pink-red': '#FE5A75',
        'light-brown': '#FEC464',
        'light-yellow': '#FFD166',
        'cyan-blue': '#0993EC',
        'dark-pink': '#221825',
        'dark-blue': '#292561',
        'dark-1000': '#000000',
        'dark-900': '#141416',
        'dark-870': '#18191D',
        'dark-860': '#17181B',
        'dark-852': '#1D1E23',
        'dark-850': '#1d1e2c',
        'dark-830': '#1a2444',
        'dark-800': '#202231',
        'dark-700': '#2E3348',
        'dark-600': '#23262F',
        'dark-500': '#353945',
        'low-emphesis': '#575757',
        primary: '#BFBFBF',
        secondary: '#7F7F7F',
        'high-emphesis': '#000',
      },
      backgroundColor: (theme) => ({
        ...theme('colors'),
      }),
      textColor: (theme) => ({
        ...theme('colors'),
      }),
      lineHeight: {
        '48px': '48px',
      },
      fontFamily: {
        sans: ['Noto Sans TC', 'DM Sans', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        hero: [
          '48px',
          {
            letterSpacing: '-0.02em;',
            lineHeight: '96px',
            fontWeight: 700,
          },
        ],
        sm: ['16px', '20px', {}],
      },
      borderRadius: {
        none: '0',
        px: '1px',
        DEFAULT: '0.625rem',
      },
      boxShadow: {
        swap: '0px 50px 250px -47px rgba(39, 176, 230, 0.29)',
        liquidity: '0px 50px 250px -47px rgba(123, 97, 255, 0.23)',
        'pink-glow': '0px 57px 90px -47px rgba(250, 82, 160, 0.15)',
        'blue-glow': '0px 57px 90px -47px rgba(39, 176, 230, 0.17)',
        'pink-glow-hovered': '0px 57px 90px -47px rgba(250, 82, 160, 0.30)',
        'blue-glow-hovered': '0px 57px 90px -47px rgba(39, 176, 230, 0.34)',
      },
      ringWidth: {
        DEFAULT: '1px',
      },
      padding: {
        px: '1px',
        '3px': '3px',
      },
      minHeight: {
        empty: '128px',
        cardContent: '230px',
        fitContent: 'fit-content',
      },
      dropShadow: {
        currencyLogo: '0px 3px 6px rgba(15, 15, 15, 0.25)',
      },
    },
  },
  variants: {
    linearBorderGradients: ['responsive', 'hover', 'dark'], // defaults to ['responsive']
    extend: {
      backgroundColor: ['checked', 'disabled', 'dark'],
      backgroundImage: ['hover', 'focus'],
      borderColor: ['checked', 'disabled'],
      cursor: ['disabled'],
      opacity: ['hover', 'disabled'],
      backgroundOpacity: {
        10: '0.1',
        20: '0.2',
        95: '0.95',
      },
      placeholderColor: ['hover', 'active'],
      ringWidth: ['disabled'],
      ringColor: ['disabled'],
    },
  },
}
