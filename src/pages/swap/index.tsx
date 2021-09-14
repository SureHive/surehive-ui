import React from 'react'
import Head from 'next/head'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import Container from '../../components/Container'
import SwapPanel from '../../features/swap/swap/SwapPanel'
import SwapGraph from '../../features/swap/swap/SwapGraph'
import SwapTransactionLog from '../../features/swap/swap/SwapTransactionLog'

export default function Swap(): JSX.Element {
  const { i18n } = useLingui()

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
        <div className="flex bg-dark-900">
          <SwapPanel />
          <div className="flex-grow">
            <div className="flex flex-col">
              <SwapGraph />
              <SwapTransactionLog />
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
