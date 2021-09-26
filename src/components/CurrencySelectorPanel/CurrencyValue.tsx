import React from 'react'
import { useActiveWeb3React } from '../../hooks/useActiveWeb3React'
import { useCurrencyBalance } from '../../state/wallet/hooks'
import { Currency } from '@sushiswap/sdk'
import Button from '../Button'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Input as NumericalInput } from '../NumericalInput'

interface CurrencyValueProps {
  currency?: Currency
  value?: string
  onUserInput?: (value: string) => void
  onMax?: () => void
  showMaxButton: boolean
}

const MaxButton = (props) => {
  return (
    <div
      className="flex items-center rounded-full"
      style={{
        width: '75px',
        height: '29px',
        padding: '2px',
        backgroundImage: 'linear-gradient(238deg, #004BFF 0%, #3772FF 42%, #0004F7 100%)',
      }}
    >
      <Button
        onClick={props.onMax}
        className="flex items-center justify-evenly dark:text-white-100 text-dark-600 w-full dark:bg-dark-830 bg-white-200 rounded-full leading-3"
        style={{ opacity: 1, height: '25px', width: '73px', lineHeight: '2px', fontSize: '12px', padding: '0px' }}
      >
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: '18px', height: '18px' }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div>{props.i18n._(t`Max`)}</div>
      </Button>
    </div>
  )
}

const CurrencyValue = (props: CurrencyValueProps) => {
  const { i18n } = useLingui()
  const { account } = useActiveWeb3React()
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, props.currency ?? undefined)

  return (
    <>
      <div className="flex flex-row items-center relative">
        <div>
          {selectedCurrencyBalance && (
            <NumericalInput
              value={props.value}
              className="dark:bg-dark-600 bg-white dark:text-white-100 text-black text-right mr-2"
              onUserInput={(val) => {
                props.onUserInput(val)
              }}
            />
          )}
        </div>
        <div>{props.showMaxButton && selectedCurrencyBalance && <MaxButton i18n={i18n} {...props} />}</div>
      </div>
    </>
  )
}

export default CurrencyValue
