import styled from 'styled-components'
import { classNames } from '../functions'

export const TableContainer = styled.table.attrs(({ className, ...rest }) => ({
  className: classNames('flex flex-col w-full px-5 py-2 bg-white dark:bg-dark-852', className),
  ...rest,
}))`
  height: ${({ height = '100%' }) => height};
`

export const TableHeader = styled.thead.attrs(({ className, ...rest }) => ({
  className: classNames('grid', className),
  ...rest,
}))`
  height: ${({ height }) => height};
  max-height: ${({ height }) => height};
  ${(props) => props.addCSS}
`

export const TableHeaderRow = styled.tr.attrs(({ className, ...rest }) => ({
  className: classNames('flex flex-row items-center w-full border-white-200 dark:border-dark-500', className),
  ...rest,
}))`
  height: ${({ height }) => height};
  border-style: solid;
  border-bottom-width: 1px;
  ${(props) => props.addCSS}
`

export const TableBody = styled.tbody.attrs(({ className, ...rest }) => ({
  className: classNames('grid', className),
  ...rest,
}))`
  height: ${({ height }) => height};
  ${(props) => props.addCSS}
`

export const TableRow = styled.tr.attrs(({ className, ...rest }) => ({
  className: classNames('flex flex-row w-full border-white-200 dark:border-dark-500', className),
  ...rest,
}))`
  height: ${({ height }) => height};
  border-style: solid;
  border-bottom-width: 1px;
  ${(props) => props.addCSS}
`

export const TableCell = styled.td.attrs(({ className }) => ({
  className: classNames('flex items-center', className),
}))`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  max-width: ${({ maxWidth }) => maxWidth};
  ${(props) => props.addCSS}
`
