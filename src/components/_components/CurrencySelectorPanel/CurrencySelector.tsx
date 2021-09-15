import { Currency } from '@sushiswap/sdk'
import CurrencyLogo from '../../CurrencyLogo'
import React, { useCallback, useState } from 'react'
import Image from '../../Image'
import Lottie from 'lottie-react'
import selectCoinAnimation from '../../../animation/select-coin.json'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import CurrencySearchModal from '../../../modals/SearchModal/CurrencySearchModal'

interface CurrencySelectorProps {
  currency?: Currency
  onCurrencySelect?: (currency: Currency) => void
  otherCurrency?: Currency
  label?: string
  currencyList?: Currency[]
  showCommonBases?: boolean
  currentTheme: string
  setShowDropdown: (value: boolean) => void
}

const CurrencySelector = (props: CurrencySelectorProps) => {
  const { i18n } = useLingui()

  const dropDownArrowImage =
    props.currentTheme === 'dark'
      ? '/images/global/icon-arrow-dropdown.svg'
      : '/images/global/icon-arrow-dropdown-light.svg'

  return (
    <>
      <div className="flex flex-row items-center relative">
        {props.currency ? (
          <div className="mr-2">
            <CurrencyLogo currency={props.currency} size={'32px'} className="rounded-full" />
          </div>
        ) : (
          <div style={{ width: 32, height: 32 }} className="mr-2">
            <Lottie animationData={selectCoinAnimation} autoplay loop />
          </div>
        )}
        <div style={{ lineHeight: '24px' }} className="dark:text-gray text-dark-600 text-xs mr-2">
          {props.currency ? (
            <span>{props.currency.symbol.toUpperCase()}</span>
          ) : (
            <span>{i18n._(t`Select a token`)}</span>
          )}
        </div>
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => {
            props.setShowDropdown(true)
          }}
        >
          <Image src={dropDownArrowImage} alt="icon-arrow-dropdown" height="24px" width="12px" />
        </div>
      </div>
    </>
  )
}

export default CurrencySelector
