import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { useRouter } from 'next/router'
import DoubleCurrencyLogo from '../../components/DoubleLogo'
import { TableRow, TableCell } from '../../styles/table'
import { classNames } from '../../functions'
import { ColouredDot } from '../../components/Shapes'
import { Type } from './const'

const merge = (config, className) => ({
  ...config,
  className: classNames(config.className, className),
})

const PoolRow = ({ rowData, columns, columnConfigs }) => {
  const { i18n } = useLingui()

  const Liquidity = ({ value, currency, color, extra = '' }) => (
    <div className="flex flex-row items-center space-x-2">
      <ColouredDot className={`${color}`} size={'5px'} />
      <div>{`${value} ${currency.tokenInfo.symbol.toUpperCase()} ${extra}`}</div>
    </div>
  )

  const router = useRouter()
  const handleClick = (e) => {
    e.preventDefault()
    router.push({
      pathname: '/pool/expanded',
      query: {
        currency: rowData.currency.tokenInfo.symbol,
        otherCurrency: rowData.otherCurrency.tokenInfo.symbol,
      },
    })
  }

  return (
    <TableRow
      className="flex flex-row items-center w-full text-black dark:text-white text-xs cursor-pointer"
      style={{ height: '60px' }}
      onClick={handleClick}
    >
      <TableCell {...columnConfigs.pool}>
        <DoubleCurrencyLogo currency0={rowData.currency} currency1={rowData.otherCurrency} size={32} />
      </TableCell>
      <TableCell {...columnConfigs.type}>
        <Type value={i18n._(t`${rowData.type}`)} />
      </TableCell>
      <TableCell {...merge(columnConfigs.feeRate, 'pl-2')}>{`${rowData.feeRate}%`}</TableCell>
      <TableCell {...merge(columnConfigs.liquidity, 'grid space-y-2 pl-2')}>
        <Liquidity value={rowData.liquidity[0]} currency={rowData.currency} color={'bg-red'} extra={'(75.1%)'} />
        <Liquidity value={rowData.liquidity[1]} currency={rowData.otherCurrency} color={'bg-blue'} extra={'(25.9%)'} />
      </TableCell>
      <TableCell {...merge(columnConfigs.tradeVolume, 'grid space-y-2 pl-2')}>
        <div>{`$${rowData.tradeVolume[0]} (24hr)`}</div>
        <div>{`$${rowData.tradeVolume[1]} (wk)`}</div>
      </TableCell>
      <TableCell {...merge(columnConfigs.myLiquidity, 'grid space-y-2 pl-2')}>
        <Liquidity value={rowData.myLiquidity[0]} currency={rowData.currency} color={'bg-red'} />
        <Liquidity value={rowData.myLiquidity[1]} currency={rowData.otherCurrency} color={'bg-blue'} />
      </TableCell>
      <TableCell {...merge(columnConfigs.impermantLoss, 'pl-2')}>
        {i18n._(t`Risk of ${rowData.impermantLoss}% loss`)}
      </TableCell>
    </TableRow>
  )
}

export default PoolRow
