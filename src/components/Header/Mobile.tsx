import { LogoImage } from '../Logo/image'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { useRouter } from 'next/router'

function MobileAppBar({ label, currentTheme, showBackButton = false, backFunc = null }): JSX.Element {
  const { i18n } = useLingui()
  const router = useRouter()

  const renderLogo = () => {
    const logoColor = currentTheme === 'dark' ? 'white' : 'blue'
    return (
      <div>
        <LogoImage color={logoColor} />
      </div>
    )
  }

  const backArrow = () => {
    return (
      <div
        onClick={() => {
          backFunc ? backFunc() : router.back()
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </div>
    )
  }

  const MenuButton = () => {
    const fillColor = currentTheme === 'dark' ? 'white' : 'black'
    return (
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 20 20" fill={fillColor}>
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    )
  }

  return (
    <div
      className="fixed sm:hidden flex items-center justify-between w-full text-black dark:text-white dark:bg-dark-900 bg-white-130 border-b-1 border-white-100 dark:border-dark-500 text-lg px-3 z-50"
      style={{ height: '65px' }}
    >
      {showBackButton ? backArrow() : renderLogo()}
      <span>{i18n._(t`${label}`)}</span>
      <MenuButton />
    </div>
  )
}

export default MobileAppBar
