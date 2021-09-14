import styles from './swap.module.css'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Input as NumericalInput } from '../../../components/NumericalInput'
import { getTtlForDisplay } from './const'
import { ethers } from 'ethers'
import Image from '../../../components/Image'
import React from 'react'

export default function SwapSettings({ setShowSettings }) {
  const { i18n } = useLingui()

  const SlippageOption = ({ value }) => {
    return (
      <div
        className="flex bg-dark-500 items-center justify-center mr-5"
        style={{ height: '56px', width: '56px', borderRadius: '12px', minWidth: '56px' }}
      >
        {value}%
      </div>
    )
  }

  const slippageToleranceOptions = () => {
    return (
      <div className="flex flex-row">
        <SlippageOption value={'1'} />
        <SlippageOption value={'2'} />
        <SlippageOption value={'3'} />
        <div className={styles.slippageOptionInput}>
          <NumericalInput
            value={''}
            className="dark:bg-dark-600 bg-white-100 dark:text-white-100 text-black items-center placeholder-white-100"
            onUserInput={() => {}}
            placeholder="Enter %"
          />
        </div>
      </div>
    )
  }

  const gasCostOption = ({ label, time, value }) => {
    return (
      <div className={styles.gasCostOption}>
        <p>{i18n._(t`${label}`)}</p>
        <p>~{getTtlForDisplay(time, false)}</p>
        <p>
          {ethers.utils.formatUnits(value, 'gwei')}
          {' gwei'}
        </p>
      </div>
    )
  }

  return (
    <div className={styles.swapSettings}>
      <div className="flex flex-col gap-y-10 w-full dark:text-white font-normal tracking-normal">
        <div className="flex flex-row items-center mb-3">
          <div
            className="mt-1 cursor-pointer"
            onClick={() => {
              setShowSettings(false)
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </div>
          <p className="ml-5 text-2xl">{i18n._(t`Swap Preferences`)}</p>
        </div>
        <div>
          <p className="text-sm mb-3">{i18n._(t`SLIPPAGE TOLERANCE`)}</p>
          {slippageToleranceOptions()}
        </div>
        <div>
          <p className="text-sm">{i18n._(t`TRANSACTION DEADLINE`)}</p>
          <div className={styles.swapSettingsTransactionDeadline}>
            <p>120 minutes</p>
            <div className="ml-2 mt-1" style={{ cursor: 'pointer' }} onClick={() => {}}>
              <Image
                src="/images/global/icon-arrow-dropdown.svg"
                alt="icon-arrow-dropdown"
                height="24px"
                width="12px"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <p className="text-sm mb-2">{i18n._(t`GAS COSTS`)}</p>
          {gasCostOption({ label: 'Fast', time: 15, value: 20000000000 })}
          <p className="text-xs text-right text-white-900 tracking-tight">{i18n._(t`average gas cost`)} 18.9 gwei</p>
          {gasCostOption({ label: 'Moderate', time: 60, value: 15000000000 })}
          <p className="text-xs text-right text-white-900 tracking-tight">{i18n._(t`average gas cost`)} 16.6 gwei</p>
          {gasCostOption({ label: 'Slow', time: 180, value: 12000000000 })}
          <p className="text-xs text-right text-white-900 tracking-tight">{i18n._(t`average gas cost`)} 13 gwei</p>
        </div>
      </div>
    </div>
  )
}
