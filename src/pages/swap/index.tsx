import React from 'react'
import Head from 'next/head'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import Container from '../../components/Container'
import SwapPanel from '../../features/swap/swap/SwapPanel'
import SwapGraph from '../../features/swap/swap/SwapGraph'
import SwapTransactionLog from '../../features/swap/swap/SwapTransactionLog'
import { useTheme } from 'next-themes'

export default function Swap(): JSX.Element {
  const { i18n } = useLingui()
  const { systemTheme, theme } = useTheme()

  const currentTheme = theme === 'system' ? systemTheme : theme

  return (
    <>
      <Head>
        <title>{i18n._(t`SureHive`)} | Swap</title>
        <meta
          key="description"
          name="description"
          content="SureHive allows for swapping of ERC20 compatible tokens across multiple networks"
        />
      </Head>
      <Container maxWidth="full" className="grid h-full">
        <div className="flex dark:bg-dark-900 bg-white-130">
          <div style={{ width: '538px' }}>
            <SwapPanel currentTheme={currentTheme} />
          </div>
          <div className="flex-grow">
            <div className="grid" style={{ width: '904px' }}>
              <SwapGraph currentTheme={currentTheme} />
              <SwapTransactionLog />
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
