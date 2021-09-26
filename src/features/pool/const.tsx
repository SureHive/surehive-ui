import React from 'react'
import PoolRow from './PoolRow'

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
  pool: { width: '10%', className: 'pl-10' },
  type: { width: '10%', className: '' },
  feeRate: { width: '10%', className: '' },
  liquidity: { width: '20%', className: '' },
  tradeVolume: { width: '15%', className: '' },
  myLiquidity: { width: '15%', className: '' },
  impermantLoss: { width: '20%', className: '' },
}

export const renderBody = (data, columns, columnConfigs) => {
  return data.map((rowData, i) => <PoolRow key={i} rowData={rowData} columns={columns} columnConfigs={columnConfigs} />)
}
