import { Percent } from '@sushiswap/sdk'
import { secondsToMinute } from '../../../functions/convert/secondsToMinute'
import { SidePanelCurrencyBox } from '../../../components/SidePanel'
import CurrencySelectorPanel from '../../../components/CurrencySelectorPanel'
import SwapLabelValuePair from './SwapLabelValuePair'
import SwapRatePanel from './SwapRatePanel'
import styles from './swap.module.css'

export const getTtlForDisplay = (ttl: number, inFull = true): string => {
  const ttlInMinutes = secondsToMinute(ttl)
  if (ttlInMinutes > 0) {
    return inFull ? `${ttlInMinutes} minutes` : `${ttlInMinutes} min`
  }
  return inFull ? `${ttl} seconds` : `${ttl} sec`
}

export const CurrencyOption = ({
  label,
  currency,
  otherCurrency,
  onCurrencySelect,
  value,
  onUserInput,
  onMax,
  showMaxButton,
  currentTheme,
}) => (
  <>
    <p className="font-normal tracking-normal">{label}</p>
    <SidePanelCurrencyBox>
      <CurrencySelectorPanel
        currency={currency}
        otherCurrency={otherCurrency}
        onCurrencySelect={onCurrencySelect}
        value={value}
        onUserInput={onUserInput}
        onMax={onMax}
        showMaxButton={showMaxButton}
        showCommonBases={true}
        currentTheme={currentTheme}
      />
    </SidePanelCurrencyBox>
  </>
)

export const SwapSettingsValues = ({ ttl, userSlippageTolerance, gasCost }) => (
  <>
    <SwapLabelValuePair
      className="flex justify-between text-xs tracking-tight font-normal p-1"
      label={'Minimum Received'}
      value={'2,953.35 USDC'}
    />
    <div className={styles.line} />
    <SwapLabelValuePair
      className="flex justify-between tracking-normal font-normal p-1 px-3"
      label={'nSure Fee'}
      value={'0.00002 ETH'}
      logo={'/images/global/icon-nsure-blue.svg'}
    />
    <SwapLabelValuePair
      className="flex justify-between tracking-normal font-normal p-1  px-3"
      label={'Liquidity Provider Fee'}
      value={'0.000012 ETH'}
      logo={'/images/global/icon-liquidity-provider-fees-blue.svg'}
    />
    <SwapLabelValuePair
      className="flex justify-between tracking-normal font-normal p-1  px-3"
      label={'Gas Cost'}
      // value={
      //   userGasPrice
      //     ? `${getGasCostLevel(userGasPrice)} - ${ethers.utils.formatUnits(userGasPrice, 'gwei')} gwei`
      //     : '--'
      // }
      value={gasCost ? gasCost : '--'}
      logo={'/images/global/icon-gas-costs-blue.svg'}
    />
    <div className={styles.line} />
    <SwapLabelValuePair
      className="flex justify-between tracking-normal font-normal p-1 px-3"
      label={'Transaction Deadline'}
      value={getTtlForDisplay(ttl)}
      logo={'/images/global/icon-deadline-blue.svg'}
    />
    <SwapLabelValuePair
      className="flex justify-between tracking-normal font-normal p-1 px-3"
      label={'Slippage Tolerance'}
      value={userSlippageTolerance instanceof Percent ? `${userSlippageTolerance?.toFixed()} %` : '--'}
      logo={'/images/global/icon-slippage-blue.svg'}
    />
    <SwapLabelValuePair
      className={styles.priceImpact}
      label={'Price Impact'}
      value={'+ 12 %'}
      logo={'/images/global/icon-price-impact-blue.svg'}
    />
  </>
)

export const RatePanel = ({ showSettings, setShowSettings, setShowSwapPreference, currentTheme }) => (
  <div className={styles.ratePanel}>
    <SwapRatePanel
      showSettings={showSettings}
      setShowSettings={setShowSettings}
      setShowSwapPreference={setShowSwapPreference}
      currentTheme={currentTheme}
    />
  </div>
)
