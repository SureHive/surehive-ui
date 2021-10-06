import Table from '../Table'
import { TableRow, TableCell } from '../../styles/table'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { classNames } from '../../functions'
import CurrencyLogo from '../CurrencyLogo'
import { ColouredDot } from '../Shapes'

const columns = [
  { label: 'Type', field: 'type' },
  { label: 'In', field: 'in' },
  { label: 'Out', field: 'out' },
  { label: 'Date / Time', field: 'dateTime' },
  { label: 'Status', field: 'status' },
]

const columnConfigs = {
  type: { width: '15%', className: 'pl-10' },
  in: { width: '30%', className: '' },
  out: { width: '30%', className: '' },
  dateTime: { width: '15%', className: '' },
  status: { width: '10%', className: '' },
}

const getStatusColor = (status) => {
  if (status.toLowerCase() === 'pending') {
    return 'bg-blue-100'
  }
  if (status.toLowerCase() === 'completed') {
    return 'bg-light-green'
  }
  return 'bg-orange'
}

const Row = ({ rowData, columns, columnConfigs }) => {
  const { i18n } = useLingui()
  return (
    <TableRow
      className="flex flex-row items-center w-full text-sm text-dark-1000 dark:text-white dark:border-dark-500 border-white-200"
      style={{ height: '60px' }}
    >
      <TableCell {...columnConfigs.type}>{i18n._(t`${rowData.type}`)}</TableCell>
      <TableCell {...columnConfigs.in} className={classNames(columnConfigs.in.className, 'space-x-2')}>
        <CurrencyLogo currency={rowData.in.currency} size={'32'} className="rounded-full" />
        <span>{`+${rowData.in.value} ${rowData.in.currency.symbol.toUpperCase()}`}</span>
      </TableCell>
      <TableCell {...columnConfigs.out} className={classNames(columnConfigs.out.className, 'space-x-2')}>
        <CurrencyLogo currency={rowData.out.currency} size={'32'} className="rounded-full" />
        <span>{`-${rowData.out.value} ${rowData.out.currency.symbol.toUpperCase()}`}</span>
      </TableCell>
      <TableCell {...columnConfigs.dateTime} className={classNames(columnConfigs.dateTime.className, 'grid')}>
        <span>{rowData.dateTime.date}</span>
        <span className="text-xs text-gray">{rowData.dateTime.time}</span>
      </TableCell>
      <TableCell {...columnConfigs.status} className={classNames(columnConfigs.status.className, 'space-x-2')}>
        <ColouredDot size={'10px'} className={getStatusColor(rowData.status)} />
        <span>{rowData.status}</span>
      </TableCell>
    </TableRow>
  )
}

const renderBody = (data, columns, columnConfigs) => {
  return data.map((rowData, i) => <Row key={i} rowData={rowData} columns={columns} columnConfigs={columnConfigs} />)
}

const TransactionTable = ({ data }) => {
  return (
    <Table
      columns={columns}
      columnConfigs={columnConfigs}
      data={data}
      headerHeight={'40px'}
      bodyHeight={'251px'}
      renderBody={renderBody}
      className="flex flex-col bg-white dark:bg-dark-852 rounded-lg text-xs text-gray px-0"
      bodyClassName="sm:overflow-y-auto sm:overscroll-y-contain"
      headerClassName="w-full"
    />
  )
}

export default TransactionTable
