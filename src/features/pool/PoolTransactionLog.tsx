import TransactionTable from '../../components/TransactionTable'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'

const fetchData = (currency, otherCurrency) => [
  {
    type: 'Swap',
    in: { currency, value: '2' },
    out: { currency: otherCurrency, value: '5.5' },
    dateTime: { date: '12 Aug 2021', time: '12:23' },
    status: 'Pending',
  },
  {
    type: 'Swap',
    in: { currency, value: '2' },
    out: { currency: otherCurrency, value: '5.5' },
    dateTime: { date: '12 Aug 2021', time: '12:23' },
    status: 'Completed',
  },
  {
    type: 'Swap',
    in: { currency, value: '2' },
    out: { currency: otherCurrency, value: '5.5' },
    dateTime: { date: '12 Aug 2021', time: '12:23' },
    status: 'Failed',
  },
  {
    type: 'Swap',
    in: { currency, value: '2' },
    out: { currency: otherCurrency, value: '5.5' },
    dateTime: { date: '12 Aug 2021', time: '12:23' },
    status: 'Pending',
  },
  {
    type: 'Swap',
    in: { currency, value: '2' },
    out: { currency: otherCurrency, value: '5.5' },
    dateTime: { date: '12 Aug 2021', time: '12:23' },
    status: 'Failed',
  },
]

const PoolTransactionLog = ({ currency, otherCurrency }) => {
  const { i18n } = useLingui()
  // mock for fetch transaction log data for both currencies
  const data = fetchData(currency, otherCurrency)

  return (
    <div
      className="hidden sm:grid px-10 space-y-3 bg-white dark:bg-dark-900"
      style={{
        boxShadow: '0 -4px 18px 0 rgba(11,19,43,0.00)',
      }}
    >
      <h1 className="dark:text-white-100 text-dark-600 text-base">{i18n._(t`TRANSACTION LOG`)}</h1>
      <TransactionTable data={data} />
    </div>
  )
}

export default PoolTransactionLog
