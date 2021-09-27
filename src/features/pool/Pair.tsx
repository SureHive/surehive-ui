import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { SidePanelContainer, SidePanelBox, SidePanelLabelValuePair } from '../../components/SidePanel'
import { Type } from './const'
import DoubleCurrencyLogo from '../../components/DoubleLogo'
import { Line } from '../../components/Shapes'
import styles from './pool.module.css'
import { FilledButton } from '../../components/Button'

const PoolPairSidePanel = ({ currency, otherCurrency }) => {
  const { i18n } = useLingui()

  const PanelHeader = () => (
    <div className="space-y-1">
      <div className="w-full flex justify-between items-center">
        <div style={{ fontSize: '28px' }}>{i18n._(t`Pools`)}</div>
        <Type value={i18n._(t`Public`)} />
      </div>
      <div className="text-xs">{'9a8fihgbk4q598q36w4p6ilwy85kjber345…'}</div>
    </div>
  )

  const CurrencyInfo = () => (
    <div className="flex flex-row items-center space-x-5">
      <DoubleCurrencyLogo currency0={currency} currency1={otherCurrency} size={40} isRound={true} />
      <p className="ml-5 text-2xl">
        {`${currency.tokenInfo.symbol.toUpperCase()} / ${otherCurrency.tokenInfo.symbol.toUpperCase()}`}
      </p>
      <div className="bg-dark-500 px-2 py-1 text-white" style={{ borderRadius: '3px' }}>
        {'0.3%'}
      </div>
    </div>
  )

  const LiquidityBox = () => (
    <div
      className="bg-dark-1000"
      style={{
        boxShadow: '0 61px 61px -47px #1F2F46',
        borderRadius: '10px',
        height: '170px',
      }}
    ></div>
  )

  const BreakdownBox = () => (
    <div className="bg-dark-500" style={{ borderRadius: '4px' }}>
      <div className="bg-dark-1000" style={{ height: '28px', borderRadius: '4px' }}></div>
      <div style={{ height: '35px' }}></div>
      <div className="bg-dark-870" style={{ height: '35px', borderRadius: '4px' }}></div>
      <div style={{ height: '35px' }}></div>
    </div>
  )

  return (
    <SidePanelContainer className="px-10 py-2 space-y-5">
      <PanelHeader />
      <CurrencyInfo />
      <SidePanelBox height={'700px'} className="p-5 gap-y-8">
        <LiquidityBox />
        <h3 className="font-medium">{i18n._(t`Breakdown`)}</h3>
        <BreakdownBox />
        <Line className="bg-dark-500 mt-2" />
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
        <FilledButton width={'100%'} height={'48px'} className="text-xs mt-15">
          {i18n._(t`Add Liquidity`)}
        </FilledButton>
      </SidePanelBox>
    </SidePanelContainer>
  )
}

export default PoolPairSidePanel
