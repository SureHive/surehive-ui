import styled from 'styled-components'
import ParentSize from '@visx/responsive/lib/components/ParentSize'
import { classNames } from '../functions'
import { ReactNode } from 'react'

export const GraphContainer = styled.div.attrs(({ className, ...rest }) => ({
  className: classNames('w-full dark:bg-dark-900 dark:border-dark-1000 border-white-200 mb-5', className),
  ...rest,
}))`
  border-style: solid;
  border-bottom-width: 1px;
`

export const GraphBox = styled.div.attrs(({ className, ...rest }) => ({
  className: classNames('w-full px-10 py-2 bg-white-to-transparent dark:bg-dark-to-transparent', className),
  ...rest,
}))`
  height: ${({ height = '400px' }) => height};
`

export const Graph = styled.div.attrs(({ className, ...rest }) => ({
  className: classNames('mb-3', className),
  ...rest,
}))`
  height: ${({ height = '338px' }) => height};
  ${(props) => props.addCSS}
`

export const GraphTime = styled.div.attrs(({ className, ...rest }) => ({
  className: classNames('flex flex-row justify-between items-center text-xs dark:text-white', className),
  ...rest,
}))``

export const GraphTimeRangeSelector = styled.div.attrs(({ className, ...rest }) => ({
  className: classNames(
    'flex flex-row justify-center items-center gap-x-12 text-sm text-white dark:opacity-50 dark:text-dark-1000 shadow-graph-time-range-selector-light dark:shadow-graph-time-range-selector',
    className
  ),
  ...rest,
}))`
  height: ${({ height = '60px' }) => height};
  font-size: min(0.875rem, 14px);
`

interface GraphTemplateProps {
  className?: string
  renderGraph: ({ width, height: number }) => ReactNode
  renderGraphDetails?: () => void
  timeRange?: string[]
}

export const GraphTemplate = (props: GraphTemplateProps) => {
  const {
    className = '',
    renderGraph,
    renderGraphDetails = null,
    timeRange = ['0:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00', '24:00'],
  } = props

  return (
    <GraphContainer className={className}>
      <GraphBox>
        <Graph>
          {renderGraphDetails && renderGraphDetails()}
          <ParentSize>{({ width, height }) => renderGraph({ width, height: height })}</ParentSize>
        </Graph>
        <GraphTime>
          {timeRange.map((value, i) => (
            <div key={i}>{value}</div>
          ))}
        </GraphTime>
      </GraphBox>
      <GraphTimeRangeSelector></GraphTimeRangeSelector>
    </GraphContainer>
  )
}
