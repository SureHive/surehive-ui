import React from 'react'
import { Currency } from '@sushiswap/sdk'
import CurrencyLogo from './CurrencyLogo'
import { classNames } from '../functions'

interface DoubleCurrencyLogoProps {
  size?: number
  currency0?: Currency
  currency1?: Currency
  className?: string
  isRound?: boolean
}

export default function DoubleCurrencyLogo({
  currency0,
  currency1,
  className,
  size = 16,
  isRound = true,
}: DoubleCurrencyLogoProps) {
  const currencyClassName = isRound ? 'rounded-full' : ''
  const width = size + size / 2

  return (
    <div className={classNames('relative flex flex-row', className)} style={{ width, height: size }}>
      <div className="z-10">
        <CurrencyLogo currency={currency0} size={size} className={currencyClassName} />
      </div>
      <div className="absolute left-1/2">
        <CurrencyLogo currency={currency1} size={size} className={currencyClassName} />
      </div>
    </div>
  )
}
