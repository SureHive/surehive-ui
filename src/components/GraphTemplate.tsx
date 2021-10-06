import styled from 'styled-components'
import ParentSize from '@visx/responsive/lib/components/ParentSize'
import { classNames } from '../functions'
import { ReactNode } from 'react'

export const GraphContainer = styled.div.attrs(({ className, ...rest }) => ({
  className: classNames(
    'w-full dark:bg-dark-900 dark:border-dark-1000 border-white-200 sm:mb-5 border-b-0 sm:border-b-1',
    className
  ),
  ...rest,
}))`
  border-style: solid;
`

export const GraphBox = styled.div.attrs(({ className, ...rest }) => ({
  className: classNames(
    'w-full h-300px sm:h-400px sm:px-10 py-2 bg-white-to-transparent dark:bg-dark-to-transparent',
    className
  ),
  ...rest,
}))`
  height: ${({ height }) => height};
`

export const Graph = styled.div.attrs(({ className, ...rest }) => ({
  className: classNames('mb-3 h-238px sm:h-338px', className),
  ...rest,
}))`
  height: ${({ height }) => height};
  ${(props) => props.addCSS}
`

export const GraphTime = styled.div.attrs(({ className, ...rest }) => ({
  className: classNames('flex flex-row justify-between items-center text-xs dark:text-white', className),
  ...rest,
}))``

export const GraphTimeRangeSelector = styled.div.attrs(({ className, ...rest }) => ({
  className: classNames(
    'flex flex-row justify-center items-center gap-x-6 sm:gap-x-12 text-xs sm:text-sm text-dark-1000 dark:text-white shadow-graph-time-range-selector-light dark:shadow-graph-time-range-selector',
    className
  ),
  ...rest,
}))`
  height: ${({ height = '60px' }) => height};
`

interface GraphTemplateProps {
  className?: string
  graphBoxClassName?: string
  renderGraph: ({ width, height: number }) => ReactNode
  renderGraphDetails?: () => void
  renderGraphBottomTime: () => ReactNode
  timeRange?: string[]
}

export const GraphTemplate = (props: GraphTemplateProps) => {
  const {
    className = '',
    graphBoxClassName = '',
    renderGraph,
    renderGraphDetails = null,
    renderGraphBottomTime,
    timeRange = ['0:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00', '24:00'],
  } = props

  return (
    <GraphContainer className={className}>
      <GraphBox className={graphBoxClassName}>
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
      <GraphTimeRangeSelector>{renderGraphBottomTime()}</GraphTimeRangeSelector>
    </GraphContainer>
  )
}
