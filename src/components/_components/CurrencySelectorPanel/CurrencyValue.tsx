import React from 'react'
import { useActiveWeb3React } from '../../../hooks/useActiveWeb3React'
import { useCurrencyBalance } from '../../../state/wallet/hooks'
import { Currency } from '@sushiswap/sdk'
import Button from '../../Button'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'

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
        className="text-white-100 w-full bg-dark-900 rounded-full leading-3"
        style={{ opacity: 1, height: '27px', width: '73px', lineHeight: '2px', fontSize: '12px' }}
      >
        {props.i18n._(t`Max`)}
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
        <div></div>
        <div>{props.showMaxButton && selectedCurrencyBalance && <MaxButton i18n={i18n} {...props} />}</div>
      </div>
    </>
  )
}

export default CurrencyValue
