import React from 'react'
import styled from 'styled-components'
import { classNames } from '../functions'

export const ColouredDot = styled.div.attrs(({ className, ...rest }) => ({
  className: classNames('rounded-full', className),
  ...rest,
}))`
  height: ${({ size }) => size};
  width: ${({ size }) => size};
`

export const Line = styled.div.attrs(({ className, ...rest }) => ({
  className: classNames('bg-white-200', className),
  ...rest,
}))`
  width: ${({ width = '100%' }) => width};
  height: ${({ height = '1px' }) => height};
`
