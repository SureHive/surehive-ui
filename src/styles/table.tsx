import styled from 'styled-components'
import { classNames } from '../functions'

export const TableContainer = styled.div.attrs(({ className, ...rest }) => ({
  className: classNames('flex flex-col w-full px-5 py-2 bg-white dark:bg-dark-852', className),
  ...rest,
}))`
  height: ${({ height = '100%' }) => height};
`

export const TableHeader = styled.div.attrs(({ className, ...rest }) => ({
  className: classNames('flex flex-row items-center w-full border-white-200 dark:border-dark-500', className),
  ...rest,
}))`
  height: ${({ height }) => height};
  border-bottom: 1px solid;
  ${(props) => props.addCSS}
`

export const TableBody = styled.div.attrs(({ className, ...rest }) => ({
  className: classNames('grid overflow-y-auto overscroll-contain', className),
  ...rest,
}))`
  height: ${({ height }) => height};
  ${(props) => props.addCSS}
`

export const TableCell = styled.div.attrs(({ className }) => ({
  className: classNames('flex items-center', className),
}))`
  width: ${({ width = '100%' }) => width};
  max-width: ${({ maxWidth = 'auto' }) => maxWidth};
  ${(props) => props.addCSS}
`
