import styles from './swap.module.css'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'

const SwapPanel = ({}) => {
  const { i18n } = useLingui()

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
              <div className={styles.currencyBox}></div>
              <div className={styles.balanceBox}></div>
              <div className={styles.balanceDropdown}></div>
              <p className="font-normal tracking-normal">{i18n._(t`TO (Estimated)`)}</p>
              <div className={styles.currencyBox}></div>
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
                value={'120 minutes'}
              />
              <LabelValuePair
                className="flex justify-between tracking-normal font-normal p-1"
                label={'Slippage Tolerance'}
                value={'3%'}
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
