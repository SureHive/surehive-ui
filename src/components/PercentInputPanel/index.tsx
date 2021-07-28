import { Input as PercentInput } from '../PercentInput'
import React from 'react'

interface PercentInputPanelProps {
  value: string
  onUserInput: (value: string) => void
  id: string
}

export default function PercentInputPanel({ value, onUserInput, id }: PercentInputPanelProps) {
  return (
    <div id={id} className="p-5 rounded bg-gray-200">
      <div className="flex flex-col justify-between space-y-3 sm:space-y-0 sm:flex-row">
        <div className="w-full text-dark-700 sm:w-2/5" style={{ margin: 'auto 0px' }}>
          Amount to Remove
        </div>
        <div className="flex items-center w-full p-3 space-x-3 text-xl font-bold rounded bg-gray-200 sm:w-3/5">
          <PercentInput
            className="token-amount-input"
            value={value}
            onUserInput={(val) => {
              onUserInput(val)
            }}
            align="right"
          />
          <div className="pl-2 text-xl font-bold">%</div>
        </div>
      </div>
    </div>
  )
}
