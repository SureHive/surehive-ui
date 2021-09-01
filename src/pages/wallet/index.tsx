import Head from 'next/head'
import React from 'react'
import Container from '../../components/Container'
import NoWallet from '../../features/wallet/NoWallet'

export default function Wallet(): JSX.Element {
  return (
    <>
      <Head>
        <title>Wallet | SureHive</title>
        <meta key="description" name="description" content="SureHive wallet" />
      </Head>
      <Container maxWidth="full" className="grid h-full">
        <NoWallet />
      </Container>
    </>
  )
}
