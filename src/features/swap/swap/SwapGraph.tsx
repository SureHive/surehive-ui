import styles from './swap.module.css'
import ParentSize from '@visx/responsive/lib/components/ParentSize'
import GraphChart from './GraphChart'
import { useUserArcherUseRelay } from '../../../state/user/hooks'
import { ARCHER_RELAY_URI } from '../../../constants'
import { useDerivedSwapInfo, useSwapState } from '../../../state/swap/hooks'
import { useActiveWeb3React } from '../../../hooks/useActiveWeb3React'
import { Field } from '../../../state/swap/actions'
import DoubleCurrencyLogo from '../../../components/DoubleLogo'
import React from 'react'
import Image from '../../../components/Image'

export default function SwapGraph({ currentTheme }) {
  const { chainId } = useActiveWeb3React()
  const [useArcher] = useUserArcherUseRelay()

  // archer
  const archerRelay = chainId ? ARCHER_RELAY_URI?.[chainId] : undefined
  const doArcher = archerRelay !== undefined && useArcher

  const { currencies } = useDerivedSwapInfo(doArcher)
  const currency = currencies[Field.INPUT]
  const otherCurrency = currencies[Field.OUTPUT]

  const GraphDetails = () => {
    return (
      <div className="grid p-2" style={{ height: '60px' }}>
        <div className="flex flex-row items-center dark:text-white text-dark-600 mobile:place-self-center">
          <DoubleCurrencyLogo currency0={currency} currency1={otherCurrency} size={40} />
          <p className="ml-5 text-base mobile:text-2xl">
            {currency?.symbol.toUpperCase()} / {otherCurrency?.symbol.toUpperCase() || 'USDC'}
          </p>
          <div className="cursor-pointer" style={{ marginLeft: '15px', marginTop: '3px' }}>
            <Image src={'/images/global/icon-switch-currency.svg'} width={'18px'} height={'18px'} />
          </div>
        </div>
        <div className="text-blue-100 mobile:text-orange text-xs mt-2 mobile:place-self-center">
          {'+179.1588 USDC (+6.09) Past 24 Hours'}
        </div>
      </div>
    )
  }

  return (
    <div className={styles.swapGraphBox}>
      <div className={styles.swapGraph}>
        <div className={styles.swapGraphInner}>
          <GraphDetails />
          <ParentSize>
            {({ width, height }) => <GraphChart width={width} height={height - 60} currentTheme={currentTheme} />}
          </ParentSize>
        </div>
        <div className={styles.swapGraphInnerTime}>
          <div>0:00</div>
          <div>03:00</div>
          <div>06:00</div>
          <div>09:00</div>
          <div>12:00</div>
          <div>15:00</div>
          <div>18:00</div>
          <div>21:00</div>
          <div>24:00</div>
        </div>
      </div>
      <div className={styles.swapGraphBottomLabel}>
        <p>Time</p>
        <div className="mobile:py-1 p-2 bg-dark-500 text-white rounded-full">24 Hours</div>
        <p>1 Week</p>
        <p>1 Month</p>
      </div>
    </div>
  )
}
