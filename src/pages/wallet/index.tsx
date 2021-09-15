import React from 'react'
import Head from 'next/head'
import Container from '../../components/Container'
import NoWallet from '../../features/wallet/NoWallet'
import WalletDashboard from '../../features/wallet/Dashboard'
import { useActiveWeb3React } from '../../hooks'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'

export default function Wallet(): JSX.Element {
  const { i18n } = useLingui()
  const { account, chainId, connector } = useActiveWeb3React()

  return (
    <>
      <Head>
        <title>{i18n._(t`SureHive`)} | Wallet</title>
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
