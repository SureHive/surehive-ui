import styles from './swap.module.css'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { useActiveWeb3React } from '../../../hooks/useActiveWeb3React'
import CurrencySelectorPanel from '../../../components/_components/CurrencySelectorPanel'
import { ARCHER_RELAY_URI } from '../../../constants'
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
import { secondsToMinute } from '../../../functions/convert/secondsToMinute'
import { useCallback, useMemo, useState } from 'react'
import { Currency, CurrencyAmount, Token } from '@sushiswap/sdk'
import { useUSDCValue } from '../../../hooks/useUSDCPrice'
import { computeFiatValuePriceImpact, maxAmountSpend } from '../../../functions'
import useWrapCallback, { WrapType } from '../../../hooks/useWrapCallback'

const getTtlForDisplay = (ttl: number): string => {
  const ttlInMinutes = secondsToMinute(ttl)
  if (ttlInMinutes > 0) {
    return `${ttlInMinutes} minutes`
  }
  return `${ttl} seconds`
}

const SwapPanel = ({}) => {
  const [approvalSubmitted, setApprovalSubmitted] = useState<boolean>(false)

  const { i18n } = useLingui()
  const { account, chainId } = useActiveWeb3React()

  const loadedUrlParams = useDefaultsFromURLSearch()

  const [loadedInputCurrency, loadedOutputCurrency] = [
    useCurrency(loadedUrlParams?.inputCurrencyId),
    useCurrency(loadedUrlParams?.outputCurrencyId),
  ]

  const [dismissTokenWarning, setDismissTokenWarning] = useState<boolean>(false)
  const urlLoadedTokens: Token[] = useMemo(
    () => [loadedInputCurrency, loadedOutputCurrency]?.filter((c): c is Token => c?.isToken ?? false) ?? [],
    [loadedInputCurrency, loadedOutputCurrency]
  )

  // get custom setting values for user
  const [ttl] = useUserTransactionTTL()
  const [useArcher] = useUserArcherUseRelay()
  const [archerETHTip] = useUserArcherETHTip()
  const [archerGasPrice] = useUserArcherGasPrice()

  console.log('archerETHTip')
  console.log(archerETHTip)
  console.log('archerGasPrice')
  console.log(archerGasPrice)

  // archer
  const archerRelay = chainId ? ARCHER_RELAY_URI?.[chainId] : undefined
  const doArcher = archerRelay !== undefined && useArcher

  // swap state
  const { independentField, typedValue, recipient } = useSwapState()
  const dependentField: Field = independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT

  const {
    v2Trade,
    currencyBalances,
    parsedAmount,
    currencies,
    inputError: swapInputError,
    allowedSlippage,
  } = useDerivedSwapInfo(doArcher)

  console.log('parsedAmount')
  console.log(parsedAmount)
  console.log('currencyBalances')
  console.log(currencyBalances)

  const {
    wrapType,
    execute: onWrap,
    inputError: wrapInputError,
  } = useWrapCallback(currencies[Field.INPUT], currencies[Field.OUTPUT], typedValue)

  const showWrap: boolean = wrapType !== WrapType.NOT_APPLICABLE
  const trade = showWrap ? undefined : v2Trade

  const parsedAmounts = useMemo(
    () =>
      showWrap
        ? {
            [Field.INPUT]: parsedAmount,
            [Field.OUTPUT]: parsedAmount,
          }
        : {
            [Field.INPUT]: independentField === Field.INPUT ? parsedAmount : trade?.inputAmount,
            [Field.OUTPUT]: independentField === Field.OUTPUT ? parsedAmount : trade?.outputAmount,
          },
    [independentField, parsedAmount, showWrap, trade]
  )

  const fiatValueInput = useUSDCValue(parsedAmounts[Field.INPUT])
  const fiatValueOutput = useUSDCValue(parsedAmounts[Field.OUTPUT])
  const priceImpact = computeFiatValuePriceImpact(fiatValueInput, fiatValueOutput)

  console.log('fiatValueInput')
  console.log(fiatValueInput)
  console.log('fiatValueOutput')
  console.log(fiatValueOutput)
  console.log('priceImpact')
  console.log(priceImpact)

  const { onSwitchTokens, onCurrencySelection, onUserInput, onChangeRecipient } = useSwapActionHandlers()

  const handleInputSelect = useCallback(
    (inputCurrency) => {
      setApprovalSubmitted(false) // reset 2 step UI for approvals
      onCurrencySelection(Field.INPUT, inputCurrency)
    },
    [onCurrencySelection]
  )

  // const handleMaxInput = useCallback(() => {
  //   maxInputAmount && onUserInput(Field.INPUT, maxInputAmount.toExact())
  // }, [maxInputAmount, onUserInput])

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

  const maxInputAmount: CurrencyAmount<Currency> | undefined = maxAmountSpend(currencyBalances[Field.INPUT])
  const showMaxButton = Boolean(maxInputAmount?.greaterThan(0) && !parsedAmounts[Field.INPUT]?.equalTo(maxInputAmount))

  const handleMaxInput = useCallback(() => {
    maxInputAmount && onUserInput(Field.INPUT, maxInputAmount.toExact())
  }, [maxInputAmount, onUserInput])

  const LabelValuePair = ({ className, label, value }) => {
    return (
      <div className={className}>
        <div>
          <span>{label}</span>
        </div>
        <div>
          <p>{value}</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="col-span-1">
        <div className="grid flex flex-col gap-y-6 p-10 dark:text-white-100 text-dark-600">
          <div className="flex flex-row pl-3">
            <h1 className={styles.swapLabel}>{i18n._(t`Swap`)}</h1>
          </div>
          <div className={styles.swapPanel}>
            <div className={styles.ratePanel}></div>
            <div className="flex flex-col gap-y-3 px-4">
              <p className="font-normal tracking-normal">{i18n._(t`FROM`)}</p>
              <div className={styles.currencyBox}>
                <CurrencySelectorPanel
                  currency={currencies[Field.INPUT]}
                  otherCurrency={currencies[Field.OUTPUT]}
                  onCurrencySelect={handleInputSelect}
                  value={formattedAmounts[Field.INPUT]}
                  onUserInput={handleTypeInput}
                  onMax={handleMaxInput}
                  showMaxButton={showMaxButton}
                  showCommonBases={true}
                />
              </div>
              <div className={styles.balanceBox}></div>
              <div className={styles.balanceDropdown}></div>
              <p className="font-normal tracking-normal">{i18n._(t`TO (Estimated)`)}</p>
              <div className={styles.currencyBox}>
                <CurrencySelectorPanel
                  currency={currencies[Field.OUTPUT]}
                  otherCurrency={currencies[Field.INPUT]}
                  onCurrencySelect={handleOutputSelect}
                  value={formattedAmounts[Field.OUTPUT]}
                  showMaxButton={false}
                />
              </div>
              <LabelValuePair
                className="flex justify-between text-xs tracking-tight font-normal p-1"
                label={'Minimum Received'}
                value={'2,953.35 USDC'}
              />
              <div className={styles.line} />
              <LabelValuePair
                className="flex justify-between tracking-normal font-normal p-1"
                label={'nSure Fee'}
                value={'0.00002 ETH'}
              />
              <LabelValuePair
                className="flex justify-between tracking-normal font-normal p-1"
                label={'Liquidity Provider Fee'}
                value={'0.000012 ETH'}
              />
              <LabelValuePair
                className="flex justify-between tracking-normal font-normal p-1"
                label={'Gas Cost'}
                value={'Moderate - 18 gwei'}
              />
              <div className={styles.line} />
              <LabelValuePair
                className="flex justify-between tracking-normal font-normal p-1"
                label={'Transaction Deadline'}
                value={getTtlForDisplay(ttl)}
              />
              <LabelValuePair
                className="flex justify-between tracking-normal font-normal p-1"
                label={'Slippage Tolerance'}
                value={`${allowedSlippage.toFixed()}%`}
              />
              <LabelValuePair className={styles.priceImpact} label={'Price Impact'} value={'+12%'} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SwapPanel
