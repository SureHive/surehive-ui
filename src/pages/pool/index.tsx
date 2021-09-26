import React, { useState } from 'react'
import Head from 'next/head'
import { useTheme } from 'next-themes'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import Container from '../../components/Container'
import PoolHeader from '../../features/pool/PoolHeader'
import PoolTable from '../../features/pool/PoolTable'

export default function Pool(): JSX.Element {
  const { i18n } = useLingui()
  const { systemTheme, theme } = useTheme()
  const currentTheme = theme === 'system' ? systemTheme : theme

  return (
    <>
      <Head>
        <title>{i18n._(t`SureHive`)} | Pool</title>
        <meta key="description" name="description" content="" />
      </Head>
      <Container maxWidth="full" className="grid h-full md:overflow-x-auto">
        <div className="flex flex-col space-y-6 dark:bg-dark-900 bg-white-130 sm:min-w-904 sm:px-10 sm:py-5">
          <PoolHeader label="My Pools" showSearch={true} />
          <PoolTable fetchData={() => {}} />
          <PoolHeader label="Pools" showSearch={false} />
          <PoolTable fetchData={() => {}} />
        </div>
      </Container>
    </>
  )
}
