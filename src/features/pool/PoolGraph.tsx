import React, { useMemo, useState } from 'react'
import { GraphTemplate } from '../../components/GraphTemplate'
import { scaleBand, scaleLinear } from '@visx/scale'
import { BarRounded } from '@visx/shape'
import { Group } from '@visx/group'
import { LinearGradient } from '@visx/gradient'
import { Line } from '../../components/Shapes'
import { FilledButton } from '../../components/Button'
import letterFrequency, { LetterFrequency } from '@visx/mock-data/lib/mocks/letterFrequency'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import DoubleCurrencyLogo from '../../components/DoubleLogo'
import { Type } from './const'

enum GraphView {
  FEES,
  LIQUIDITY,
  VOLUME,
}

const Chart = ({ width, height, data, getValue, getValueFrequency }) => {
  // bounds
  const xMax = width
  const yMax = height

  // scales, memoize for performance
  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [0, xMax],
        round: true,
        domain: data.map(getValue),
        padding: 0.7,
      }),
    [data, getValue, xMax]
  )
  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...data.map(getValueFrequency))],
      }),
    [data, getValueFrequency, yMax]
  )

  return (
    <svg width={width} height={height}>
      <LinearGradient id="bar-gradient" from={'#3772FF'} fromOpacity={1} to={'#004BFF'} toOpacity={0} />
      <Group>
        {data.map((d) => {
          const value = getValue(d)
          const barWidth = xScale.bandwidth()
          const barHeight = yMax - (yScale(getValueFrequency(d)) ?? 0)
          const barX = xScale(value)
          const barY = yMax - barHeight
          return (
            <BarRounded
              key={`pool-bar-${value}`}
              radius={10}
              all={true}
              x={barX}
              y={barY}
              width={barWidth}
              height={barHeight}
              fill="url(#bar-gradient)"
            />
          )
        })}
      </Group>
    </svg>
  )
}

const PoolGraph = ({ currency, otherCurrency, currentTheme }) => {
  const { i18n } = useLingui()
  const [currentGraphView, setGraphView] = useState<GraphView>(GraphView.FEES)

  // mock data
  const data = letterFrequency.slice(5)
  const getLetter = (d: LetterFrequency) => d.letter
  const getLetterFrequency = (d: LetterFrequency) => Number(d.frequency) * 100

  const GraphChangeButton = ({ graphView, label }) => {
    if (graphView === currentGraphView) {
      return (
        <FilledButton className="px-3" height={'28px'} borderRadius={'3px'} onClick={() => setGraphView(graphView)}>
          {i18n._(t`${label}`)}
        </FilledButton>
      )
    }
    return (
      <div
        className="flex items-center justify-center cursor-pointer"
        style={{ height: '28px' }}
        onClick={() => setGraphView(graphView)}
      >
        {i18n._(t`${label}`)}
      </div>
    )
  }

  const GraphDetails = () => (
    <div
      className="grid justify-items-center sm:justify-items-start sm:px-10 bg-draw-menu-light dark:bg-draw-menu-dark bg-1000% sm:bg-auto sm:bg-white sm:dark:bg-dark-1000 pt-2"
      style={{ height: '100px' }}
    >
      <div className="flex sm:hidden flex-row w-full items-center justify-around">
        <div>
          <DoubleCurrencyLogo currency0={currency} currency1={otherCurrency} size={40} isRound={true} />
        </div>
        <span className="text-dark-1000 dark:text-white text-lg">
          {`${currency.symbol.toUpperCase()} / ${otherCurrency.symbol.toUpperCase()}`}
        </span>
        <Type value={'Public'} />
      </div>
      <span className="hidden sm:flex text-dark-1000 dark:text-white text-2xl">
        {`1 ${currency.symbol.toUpperCase()} = 1.0002 ${otherCurrency.symbol.toUpperCase()}`}
      </span>
      <span className="text-sm text-blue-100">{'$22,648,985.9676'}</span>
      <div className="flex flex-row space-x-3 text-xs">
        <GraphChangeButton graphView={GraphView.FEES} label="Fees" />
        <GraphChangeButton graphView={GraphView.LIQUIDITY} label="Liquidity" />
        <GraphChangeButton graphView={GraphView.VOLUME} label="Volume" />
      </div>
    </div>
  )

  return (
    <div className="dark:bg-dark-900 bg-white">
      <GraphDetails />
      <Line className="bg-white-200 dark:bg-dark-900" />
      <GraphTemplate
        graphBoxClassName="bg-draw-menu-light dark:bg-draw-menu-dark bg-1000% sm:bg-auto sm:bg-white-to-transparent sm:dark:bg-dark-to-transparent"
        renderGraph={({ width, height }) => (
          <div>
            <Chart
              width={width}
              height={height}
              data={data}
              getValue={getLetter}
              getValueFrequency={getLetterFrequency}
            />
          </div>
        )}
      />
    </div>
  )
}

export default PoolGraph
