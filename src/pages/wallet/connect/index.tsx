import Head from 'next/head'
import React from 'react'
import Container from '../../../components/Container'
import ConnectWallet from '../../../features/wallet/ConnectWallet'

export default function Wallet(): JSX.Element {
  return (
    <>
      <Head>
        <title>Wallet | SureHive</title>
        <meta key="description" name="description" content="SureHive wallet" />
      </Head>
      <Container maxWidth="full" className="grid h-full">
        <ConnectWallet />
      </Container>
    </>
  )
}
