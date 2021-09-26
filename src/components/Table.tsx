import React from 'react'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { TableContainer, TableHeader, TableBody, TableCell } from '../styles/table'

export default function Table({
  columns,
  columnConfigs,
  data,
  height = null,
  headerHeight,
  bodyHeight,
  className,
  renderBody,
}) {
  const { i18n } = useLingui()

  return (
    <TableContainer height={height} className={className}>
      <TableHeader height={headerHeight}>
        {columns.map((column) => {
          const { label, field } = column
          return (
            <TableCell key={field} {...columnConfigs[field]}>
              {i18n._(t`${label}`)}
            </TableCell>
          )
        })}
      </TableHeader>
      <TableBody height={bodyHeight}>{renderBody(data, columns, columnConfigs)}</TableBody>
    </TableContainer>
  )
}
