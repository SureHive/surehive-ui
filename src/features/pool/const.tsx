import React from 'react'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import PoolRow from './PoolRow'
import DoubleCurrencyLogo from '../../components/DoubleLogo'
import CurrencyLogo from '../../components/CurrencyLogo'
import Image from 'next/image'

export const poolColumns = [
  { label: 'Pool', field: 'pool' },
  { label: 'Type', field: 'type' },
  { label: 'Fee Rate', field: 'feeRate' },
  { label: 'Liquidity', field: 'liquidity' },
  { label: 'Trade Volume', field: 'tradeVolume' },
  { label: 'My Liquidity', field: 'myLiquidity' },
  { label: 'EST Impermant Loss', field: 'impermantLoss' },
]

export const poolColumnConfigs = {
  pool: { width: '12%', className: 'pl-10' },
  type: { width: '8%', className: '' },
  feeRate: { width: '10%', className: '' },
  liquidity: { width: '20%', className: '' },
  tradeVolume: { width: '15%', className: '' },
  myLiquidity: { width: '15%', className: '' },
  impermantLoss: { width: '20%', className: '' },
}

export const renderBody = (data, columns, columnConfigs) => {
  return data.map((rowData, i) => <PoolRow key={i} rowData={rowData} columns={columns} columnConfigs={columnConfigs} />)
}

export const PanelHeader = ({ value, type, currentTheme, showBack = false, back = null }) => {
  const imagePath =
    currentTheme === 'dark' ? '/images/global/icon-external-link.svg' : '/images/global/icon-external-link-light.svg'

  return (
    <div className="space-y-1">
      <div className="w-full flex justify-between items-center">
        <div className="flex space-x-2 items-center">
          {showBack && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 cursor-pointer mt-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              onClick={back}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          )}
          <div style={{ fontSize: '28px' }}>{value}</div>
        </div>
        <Type value={type} />
      </div>
      <div className="flex items-center text-xs">
        <span>{'9a8fihgbk4q598q36w4p6ilwy85kjber345…'}</span>
        <div className="ml-2">
          <Image src={imagePath} width={'18px'} height={'18px'} />
        </div>
      </div>
    </div>
  )
}

export const CurrencyInfo = ({ currency, otherCurrency }) => (
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

export const Type = ({ value }) => (
  <div
    className="bg-black px-4 text-white"
    style={{
      fontSize: '10px',
      borderRadius: '6px',
      paddingTop: '2px',
      paddingBottom: '2px',
    }}
  >
    {value}
  </div>
)

export const BreakdownBox = ({ fees, volume, traders }) => {
  const { i18n } = useLingui()
  return (
    <div className="bg-dark-500 text-white text-xs" style={{ borderRadius: '4px' }}>
      <div
        className="grid grid-cols-3 place-content-center bg-dark-1000 text-gray"
        style={{ height: '28px', borderRadius: '4px' }}
      >
        <div />
        <span>{i18n._(t`24 hours`)}</span>
        <span>{i18n._(t`All time`)}</span>
      </div>
      <div className="grid grid-cols-3 place-content-center" style={{ height: '35px' }}>
        <span className="text-gray pl-5">{i18n._(t`Fees`)}</span>
        <span>{'$3,3K'}</span>
        <span>{'$688K'}</span>
      </div>
      <div
        className="bg-dark-870 grid grid-cols-3 place-content-center"
        style={{ height: '35px', borderRadius: '4px' }}
      >
        <span className="text-gray pl-5">{i18n._(t`Volume`)}</span>
        <span>{'$41,27M'}</span>
        <span>{'$6,6Tr'}</span>
      </div>
      <div className="grid grid-cols-3 place-content-center" style={{ height: '35px' }}>
        <span className="text-gray pl-5">{i18n._(t`Traders`)}</span>
        <span>{'45'}</span>
        <span>{'7927'}</span>
      </div>
    </div>
  )
}

export const TotalLiquidityBox = ({ currency, otherCurrency }) => {
  const { i18n } = useLingui()
  return (
    <div
      className="bg-white-150 dark:bg-dark-1000 p-10 space-y-4 text-dark-600 dark:text-white shadow-pool-liquidity-light dark:shadow-pool-liquidity"
      style={{
        borderRadius: '10px',
        height: '170px',
      }}
    >
      <span>{i18n._(t`Total Liquidity`)}</span>
      <div className="flex flex-row w-full h-full space-x-4">
        <CurrencyLogo currency={currency} size={60} className="rounded-full" />
        <div className="space-y-3 py-1">
          <CurrencyLogo currency={currency} size={20} className="rounded-full" />
          <CurrencyLogo currency={otherCurrency} size={20} className="rounded-full" />
        </div>
        <div className="w-full space-y-3 py-1">
          <div className="flex w-full justify-between">
            <span>{`${currency.symbol.toUpperCase()} (75.1%)`}</span>
            <span>{`184.56m`}</span>
          </div>
          <div className="flex w-full justify-between">
            <span>{`${otherCurrency.symbol.toUpperCase()} (25.9%)`}</span>
            <span>{`1284.56k`}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export const MyLiquidityBox = ({ currency, otherCurrency }) => {
  const { i18n } = useLingui()

  const CurrencyLiquidity = ({ currency, value }) => (
    <div className="flex space-x-3">
      <CurrencyLogo currency={currency} size={20} className="rounded-full" />
      <span>{`${value} ${currency.symbol.toUpperCase()}`}</span>
    </div>
  )

  return (
    <div
      className="bg-white-150 dark:bg-dark-1000 px-10 py-5 space-y-4 text-dark-600 dark:text-white shadow-pool-liquidity-light dark:shadow-pool-liquidity"
      style={{
        borderRadius: '10px',
        height: '113px',
      }}
    >
      <span>{i18n._(t`My Liquidity`)}</span>
      <div className="flex justify-between">
        <CurrencyLiquidity currency={currency} value={'10,00.03'} />
        <CurrencyLiquidity currency={otherCurrency} value={'9,090.12'} />
      </div>
    </div>
  )
}
