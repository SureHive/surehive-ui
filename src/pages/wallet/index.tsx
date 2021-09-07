import Head from 'next/head'
import React from 'react'
import Container from '../../components/Container'
import NoWallet from '../../features/wallet/NoWallet'
import WalletDashboard from '../../features/wallet/Dashboard'
import { useActiveWeb3React } from '../../hooks'

export default function Wallet(): JSX.Element {
  const { account, chainId, connector } = useActiveWeb3React()

  return (
    <>
      <Head>
        <title>Wallet | SureHive</title>
        <meta key="description" name="description" content="SureHive wallet" />
      </Head>
      {account ? (
        <Container maxWidth="full" className="grid h-full">
          <WalletDashboard account={account} chainId={chainId} connector={connector} />
        </Container>
      ) : (
        <Container maxWidth="full" className="grid h-full">
          <NoWallet />
        </Container>
      )}
    </>
  )
}
