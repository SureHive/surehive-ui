import React from 'react'
import Head from 'next/head'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import Container from '../../components/Container'
import SwapPanel from '../../features/swap/swap/SwapPanel'

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
        <div className="grid grid-cols-3">
          <SwapPanel />
          <div className="col-span-2"></div>
        </div>
      </Container>
    </>
  )
}
