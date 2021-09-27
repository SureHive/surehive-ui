import React from 'react'
import PoolRow from './PoolRow'
import { t } from '@lingui/macro'

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
