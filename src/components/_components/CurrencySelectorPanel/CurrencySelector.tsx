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
  currencyList?: string[]
  showCommonBases?: boolean
}

const CurrencySelector = (props: CurrencySelectorProps) => {
  const { i18n } = useLingui()
  const [modalOpen, setModalOpen] = useState(false)

  const handleDismissSearch = useCallback(() => {
    setModalOpen(false)
  }, [setModalOpen])

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
        <div style={{ lineHeight: '24px' }} className="text-gray text-xs mr-2">
          {props.currency ? (
            <span>{props.currency.symbol.toUpperCase()}</span>
          ) : (
            <span>{i18n._(t`Select a token`)}</span>
          )}
        </div>
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => {
            if (props.onCurrencySelect) {
              setModalOpen(true)
            }
          }}
        >
          <Image src="/images/global/icon-arrow-dropdown.svg" alt="icon-arrow-dropdown" height="24px" width="12px" />
        </div>
      </div>
      {props.onCurrencySelect && (
        <CurrencySearchModal
          isOpen={modalOpen}
          onDismiss={handleDismissSearch}
          onCurrencySelect={props.onCurrencySelect}
          selectedCurrency={props.currency}
          otherSelectedCurrency={props.otherCurrency}
          showCommonBases={props.showCommonBases}
        />
      )}
    </>
  )
}

export default CurrencySelector
