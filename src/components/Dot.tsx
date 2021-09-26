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
