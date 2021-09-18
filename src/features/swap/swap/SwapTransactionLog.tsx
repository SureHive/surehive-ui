import styles from './swap.module.css'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import Image from 'next/image'

const SwapTableHeader = () => {
  const { i18n } = useLingui()

  return (
    <div className="flex items-center grid grid-cols-8 p-5 text-gray text-xs" style={{ height: '50px' }}>
      <div>{i18n._(t`Type`)}</div>
      <div className="col-span-2">{i18n._(t`In`)}</div>
      <div className="col-span-2">{i18n._(t`Out`)}</div>
      <div className="col-span-2">{i18n._(t`Date / Time`)}</div>
      <div>{i18n._(t`Status`)}</div>
    </div>
  )
}

const SwapTableRow = () => {
  const { i18n } = useLingui()

  return (
    <div
      className="flex items-center grid grid-cols-8 px-5 text-sm border-t-2 border-solid dark:border-dark-500 border-white-200"
      style={{ height: '60px' }}
    >
      <div>{i18n._(t`Swap`)}</div>
      <div className="flex col-span-2 items-center space-x-2">
        <Image
          src={'/images/tokens/eth-square.jpg'}
          alt={'logo'}
          width={'32px'}
          height={'32px'}
          className="rounded-full"
        />
        <div>{'+2 ETH'}</div>
      </div>
      <div className="flex col-span-2 items-center space-x-2">
        <Image
          src={'/images/tokens/usdc-square.jpg'}
          alt={'logo'}
          width={'32px'}
          height={'32px'}
          className="rounded-full"
        />
        <div>{'-5.5 USDC'}</div>
      </div>
      <div className="flex col-span-2 flex-col">
        <div>12 Aug 2021</div>
        <div className="text-xs text-gray">12:23</div>
      </div>
      <div className="flex flex-row items-center space-x-2">
        <div style={{ backgroundColor: '#3772FF', height: '10px', width: '10px' }} className="rounded-full" />
        <div>{'Pending'}</div>
      </div>
    </div>
  )
}

export default function SwapTransactionLog() {
  const { i18n } = useLingui()

  return (
    <div className="grid w-full p-10 space-y-3">
      <h1 className="dark:text-white-100 text-dark-600 text-sm">{i18n._(t`TRANSACTION LOG`)}</h1>
      <div className={styles.SwapTransactionLogPanel}>
        <SwapTableHeader />
        <SwapTableRow />
        <SwapTableRow />
        <SwapTableRow />
      </div>
    </div>
  )
}
