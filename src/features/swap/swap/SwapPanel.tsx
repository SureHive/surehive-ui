import styles from './swap.module.css'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { useWalletManager } from '../../../hooks'
import CurrencySelectorPanel from '../../../components/CurrencySelectorPanel'
import { ARCHER_RELAY_URI, COMMON_BASES } from '../../../constants'
import {
  useDefaultsFromURLSearch,
  useDerivedSwapInfo,
  useSwapActionHandlers,
  useSwapState,
} from '../../../state/swap/hooks'
import {
  useUserArcherETHTip,
  useUserArcherGasPrice,
  useUserArcherUseRelay,
  useUserSlippageTolerance,
  useUserTransactionTTL,
} from '../../../state/user/hooks'
import { Field } from '../../../state/swap/actions'
import { useCurrency } from '../../../hooks/Tokens'
import { useCallback, useMemo, useState } from 'react'
import { Currency, CurrencyAmount, Percent, Token } from '@sushiswap/sdk'
import { useUSDCValue } from '../../../hooks/useUSDCPrice'
import { computeFiatValuePriceImpact, maxAmountSpend } from '../../../functions'
import useWrapCallback, { WrapType } from '../../../hooks/useWrapCallback'
import { ethers } from 'ethers'
import { getGasCostLevel } from '../../../functions/cost'
import { getTtlForDisplay } from './const'
import SwapLabelValuePair from './SwapLabelValuePair'
import SwapBalance from './SwapBalance'
import Image from 'next/image'
import Button from '../../../components/Button'
import SwapRatePanel from './SwapRatePanel'
import SwapSettings from './SwapSettings'
import { SidePanelContainer, SidePanelBox, SidePanelCurrencyBox } from '../../../components/SidePanel'

import { CurrencyOption, SwapSettingsValues, RatePanel } from './const'

const SwapPanel = ({ currentTheme, setShowSwapPreference }) => {
  const { account, chainId } = useWalletManager()
  const [approvalSubmitted, setApprovalSubmitted] = useState<boolean>(false)
  const [showSettings, setShowSettings] = useState<boolean>(false)

  const { i18n } = useLingui()
  const loadedUrlParams = useDefaultsFromURLSearch()
  const [loadedInputCurrency, loadedOutputCurrency] = [
    useCurrency(loadedUrlParams?.inputCurrencyId),
    useCurrency(loadedUrlParams?.outputCurrencyId),
  ]

  // // get custom setting values for user
  const [ttl] = useUserTransactionTTL()
  const userSlippageTolerance = useUserSlippageTolerance()

  // // const [useArcher] = useUserArcherUseRelay()
  // // const [archerETHTip] = useUserArcherETHTip()
  // // const [userGasPrice] = useUserArcherGasPrice()
  //
  // // archer
  // // const archerRelay = chainId ? ARCHER_RELAY_URI?.[chainId] : undefined
  // // const doArcher = archerRelay !== undefined && useArcher
  //
  // // swap state
  const { independentField, typedValue, recipient } = useSwapState()
  const dependentField: Field = independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT

  const { v2Trade, currencyBalances, parsedAmount, currencies, inputError: swapInputError } = useDerivedSwapInfo()
  console.log('currencyBalances')
  console.log(currencyBalances)

  const parsedAmounts = useMemo(
    () => ({
      [Field.INPUT]: parsedAmount,
      [Field.OUTPUT]: parsedAmount,
    }),
    [parsedAmount]
  )
  const fiatValueInput = useUSDCValue(parsedAmounts[Field.INPUT])
  const fiatValueOutput = useUSDCValue(parsedAmounts[Field.OUTPUT])
  const priceImpact = computeFiatValuePriceImpact(fiatValueInput, fiatValueOutput)

  /// TODO: useWrapCallback
  const showWrap = true

  const { onSwitchTokens, onCurrencySelection, onUserInput, onChangeRecipient } = useSwapActionHandlers()

  const handleInputSelect = useCallback(
    (inputCurrency) => {
      setApprovalSubmitted(false) // reset 2 step UI for approvals
      onCurrencySelection(Field.INPUT, inputCurrency)
    },
    [onCurrencySelection]
  )

  const handleOutputSelect = useCallback(
    (outputCurrency) => onCurrencySelection(Field.OUTPUT, outputCurrency),
    [onCurrencySelection]
  )

  const formattedAmounts = {
    [independentField]: typedValue,
    [dependentField]: showWrap
      ? parsedAmounts[independentField]?.toExact() ?? ''
      : parsedAmounts[dependentField]?.toSignificant(6) ?? '',
  }

  const handleTypeInput = useCallback(
    (value: string) => {
      onUserInput(Field.INPUT, value)
    },
    [onUserInput]
  )

  const handleTypeOutput = useCallback(
    (value: string) => {
      onUserInput(Field.OUTPUT, value)
    },
    [onUserInput]
  )

  const maxInputAmount: CurrencyAmount<Currency> | undefined = maxAmountSpend(currencyBalances[Field.INPUT])
  const showMaxButton = Boolean(maxInputAmount?.greaterThan(0) && !parsedAmounts[Field.INPUT]?.equalTo(maxInputAmount))

  const handleMaxInput = useCallback(() => {
    maxInputAmount && onUserInput(Field.INPUT, maxInputAmount.toExact())
  }, [maxInputAmount, onUserInput])

  const dropDownImage =
    currentTheme === 'dark' ? '/images/global/icon-swap-arrow.svg' : '/images/global/icon-swap-arrow-light.svg'

  return (
    <SidePanelContainer className="sm:px-10 sm:pt-5 sm:pb-10 sm:space-y-5">
      <div className="flex flex-row pl-3 mobile:hidden">
        <span className={styles.swapLabel}>{i18n._(t`Swap`)}</span>
      </div>
      <SidePanelBox className="relative">
        {showSettings && (
          <div
            className="flex w-full bg-white dark:bg-dark-600 rounded absolute -right-full top-7 -mr-12 z-10 p-8"
            style={{
              boxShadow: '0 64px 64px 0 rgba(0,0,0,0.12)',
              borderRadius: '9px',
            }}
          >
            <SwapSettings setShowSettings={setShowSettings} currentTheme={currentTheme} />
          </div>
        )}
        <RatePanel
          showSettings={showSettings}
          setShowSettings={setShowSettings}
          setShowSwapPreference={setShowSwapPreference}
          currentTheme={currentTheme}
        />
        <div className="flex flex-col gap-y-3 px-4">
          <CurrencyOption
            label={i18n._(t`FROM`)}
            currency={currencies[Field.INPUT]}
            otherCurrency={currencies[Field.OUTPUT]}
            onCurrencySelect={handleInputSelect}
            value={formattedAmounts[Field.INPUT]}
            onUserInput={handleTypeInput}
            onMax={handleMaxInput}
            showMaxButton={showMaxButton}
            currentTheme={currentTheme}
          />
          <div className={styles.balanceBox}>
            <SwapBalance
              inputCurrency={currencies[Field.INPUT]}
              outputCurrency={currencies[Field.OUTPUT]}
              currentTheme={currentTheme}
            />
          </div>
          <div className={styles.balanceDropdown}>
            <div style={{ cursor: 'pointer' }}>
              <Image src={dropDownImage} alt={'icon-swap-arrow.svg'} width={'50px'} height={'50px'} />
            </div>
          </div>
          <CurrencyOption
            label={i18n._(t`TO`)}
            currency={currencies[Field.OUTPUT]}
            otherCurrency={currencies[Field.INPUT]}
            onCurrencySelect={handleInputSelect}
            value={formattedAmounts[Field.OUTPUT]}
            onUserInput={handleTypeInput}
            onMax={handleMaxInput}
            showMaxButton={showMaxButton}
            currentTheme={currentTheme}
          />
          <SwapSettingsValues ttl={ttl} userSlippageTolerance={userSlippageTolerance} gasCost={'Moderate - 18 gwei'} />
          <Button className={styles.ConfirmSwapButton}>{i18n._(t`Confirm Swap`)}</Button>
        </div>
      </SidePanelBox>
    </SidePanelContainer>
  )
}

//
// const {
//   wrapType,
//   execute: onWrap,
//   inputError: wrapInputError,
// } = useWrapCallback(currencies[Field.INPUT], currencies[Field.OUTPUT], typedValue)
//
// const showWrap: boolean = wrapType !== WrapType.NOT_APPLICABLE
// const trade = showWrap ? undefined : v2Trade
//
// const parsedAmounts = useMemo(
//   () =>
//     showWrap
//       ? {
//           [Field.INPUT]: parsedAmount,
//           [Field.OUTPUT]: parsedAmount,
//         }
//       : {
//           [Field.INPUT]: independentField === Field.INPUT ? parsedAmount : trade?.inputAmount,
//           [Field.OUTPUT]: independentField === Field.OUTPUT ? parsedAmount : trade?.outputAmount,
//         },
//   [independentField, parsedAmount, showWrap, trade]
// )
// +
//
// const FromOption = () => (
//   <>
//     <p className="font-normal tracking-normal">{i18n._(t`FROM`)}</p>
//     <SidePanelCurrencyBox>
//       <CurrencySelectorPanel
//         currency={currencies[Field.INPUT]}
//         otherCurrency={currencies[Field.OUTPUT]}
//         onCurrencySelect={handleInputSelect}
//         value={formattedAmounts[Field.INPUT]}
//         onUserInput={handleTypeInput}
//         onMax={handleMaxInput}
//         showMaxButton={showMaxButton}
//         showCommonBases={true}
//         currentTheme={currentTheme}
//       />
//     </SidePanelCurrencyBox>
//   </>
// )
//
// const ToOption = () => (
//   <>
//     <p className="font-normal tracking-normal">{i18n._(t`TO (Estimated)`)}</p>
//     <SidePanelCurrencyBox>
//       <CurrencySelectorPanel
//         currency={currencies[Field.OUTPUT]}
//         otherCurrency={currencies[Field.INPUT]}
//         onCurrencySelect={handleOutputSelect}
//         value={formattedAmounts[Field.OUTPUT]}
//         onUserInput={handleTypeOutput}
//         showMaxButton={false}
//         showCommonBases={true}
//         currentTheme={currentTheme}
//       />
//     </SidePanelCurrencyBox>
//   </>
// )
//
//
//

export default SwapPanel
