import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { useRouter } from 'next/router'

const Back = ({ showText = true, className = 'w-4 h-4' }) => {
  const { i18n } = useLingui()
  const router = useRouter()
  return (
    <div>
      <a
        onClick={router.back}
        className="flex items-center space-x-2 text-base text-center cursor-pointer font text-secondary hover:text-high-emphesis"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
        {showText ? <span>{i18n._(t`Go Back`)}</span> : null}
      </a>
    </div>
  )
}

export default Back
