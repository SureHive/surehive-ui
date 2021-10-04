import React from 'react'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { TableContainer, TableHeader, TableBody, TableCell, TableHeaderRow } from '../styles/table'
import { classNames } from '../functions'

export default function Table({
  columns,
  columnConfigs,
  data,
  height = null,
  headerHeight,
  bodyHeight = null,
  className,
  renderBody,
  bodyClassName = null,
  headerClassName = null,
}) {
  const { i18n } = useLingui()

  return (
    <TableContainer height={height} className={className}>
      <TableHeader height={headerHeight}>
        <TableHeaderRow className={headerClassName}>
          {columns.map((column) => {
            const { label, field } = column
            return (
              <TableCell key={field} {...columnConfigs[field]}>
                {i18n._(t`${label}`)}
              </TableCell>
            )
          })}
        </TableHeaderRow>
      </TableHeader>
      <TableBody className={bodyClassName} height={bodyHeight}>
        {renderBody(data, columns, columnConfigs)}
      </TableBody>
    </TableContainer>
  )
}
