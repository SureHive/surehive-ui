import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import styles from './pool.module.css'
import { SidePanelContainer, SidePanelBox, SidePanelLabelValuePair } from '../../components/SidePanel'
import { PanelHeader, CurrencyInfo, TotalLiquidityBox, BreakdownBox, MyLiquidityBox } from './const'
import { Line } from '../../components/Shapes'
import { FilledButton } from '../../components/Button'
import { useRouter } from 'next/router'

const ExpandedPool = ({ currency, otherCurrency, currentTheme, hasLiquidity = false }) => {
  const { i18n } = useLingui()

  const router = useRouter()
  const handleClick = (e) => {
    e.preventDefault()
    router.push({
      pathname: '/pool/edit',
      query: {
        currency: currency.symbol,
        otherCurrency: otherCurrency.symbol,
      },
    })
  }

  return (
    <SidePanelContainer className="px-10 pt-5 pb-10 space-y-5">
      <PanelHeader value={i18n._(t`Pools`)} type={i18n._(t`Public`)} currentTheme={currentTheme} />
      <CurrencyInfo currency={currency} otherCurrency={otherCurrency} />
      <SidePanelBox className="p-5 gap-y-8">
        <TotalLiquidityBox currency={currency} otherCurrency={otherCurrency} />
        {hasLiquidity && <MyLiquidityBox currency={currency} otherCurrency={otherCurrency} />}
        {!hasLiquidity && <h3 className="font-medium">{i18n._(t`Breakdown`)}</h3>}
        <BreakdownBox fees={{}} volume={{}} traders={{}} />
        {!hasLiquidity && <Line className="bg-dark-500 mt-2" />}
        <div className="text-xs space-y-2">
          <SidePanelLabelValuePair
            className="flex justify-between tracking-normal font-normal p-1 px-3"
            label={'nSure Fee'}
            value={`0.00002 ${currency.tokenInfo.symbol.toUpperCase()}`}
            logo={'/images/global/icon-nsure-blue.svg'}
          />
          <SidePanelLabelValuePair
            className="flex justify-between tracking-normal font-normal p-1 px-3"
            label={'Slippage Tolerance'}
            value={'0.2%'}
            logo={'/images/global/icon-slippage-blue.svg'}
          />
          <SidePanelLabelValuePair
            className={styles.guideImpact}
            label={'Guide Price'}
            value={'1.1145'}
            logo={'/images/global/icon-price-impact-blue.svg'}
          />
        </div>
        <FilledButton width={'100%'} height={'48px'} className="text-xs mt-10" onClick={handleClick}>
          {i18n._(t`${hasLiquidity ? 'Edit Liquidity' : 'Add Liquidity'}`)}
        </FilledButton>
      </SidePanelBox>
    </SidePanelContainer>
  )
}

export default ExpandedPool
