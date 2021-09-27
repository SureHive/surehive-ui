import React from 'react'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import Container from '../../../components/Container'
import { useAllTokens, useCurrency } from '../../../hooks/Tokens'
import { Currency } from '@sushiswap/sdk'
import PoolPairSidePanel from '../../../features/pool/Pair'

export default function PoolExpandedPair(): JSX.Element {
  const { i18n } = useLingui()
  const { systemTheme, theme } = useTheme()
  const currentTheme = theme === 'system' ? systemTheme : theme
  const router = useRouter()
  const { currency, otherCurrency } = router.query

  // for testing
  const allTokens: Currency[] = Object.values(useAllTokens())

  const currencyA = allTokens[0]
  const currencyB = allTokens[1]

  return (
    <>
      <Head>
        <title>{i18n._(t`SureHive`)} | Pool</title>
        <meta key="description" name="description" content="" />
      </Head>
      <Container maxWidth="full" className="grid h-full sm:overflow-x-auto">
        <div className="flex flex-col sm:flex-row dark:bg-dark-900 bg-white-130">
          <div className="w-full sm:w-538 order-last sm:order-first">
            <PoolPairSidePanel currency={currencyA} otherCurrency={currencyB} />
          </div>
        </div>
      </Container>
    </>
  )
}
