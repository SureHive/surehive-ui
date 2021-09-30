import React from 'react'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import Container from '../../../components/Container'
import { useAllTokens, useCurrency } from '../../../hooks/Tokens'
import { Currency } from '@sushiswap/sdk'
import ExpandedPool from '../../../features/pool/ExpandedPool'
import PoolTransactionLog from '../../../features/pool/PoolTransactionLog'
import PoolGraph from '../../../features/pool/PoolGraph'

export default function PoolExpandedPair(): JSX.Element {
  const { i18n } = useLingui()
  const { systemTheme, theme } = useTheme()
  const currentTheme = theme === 'system' ? systemTheme : theme
  const router = useRouter()
  const { currency, otherCurrency } = router.query

  // for testing
  const allTokens: Currency[] = Object.values(useAllTokens())

  const currencyA = allTokens.find((t) => t.symbol === currency)
  const currencyB = allTokens.find((t) => t.symbol === otherCurrency)

  // for testing
  const hasLiquidity = currencyA.symbol.toUpperCase() === 'WETH' || currencyB.symbol.toUpperCase() === 'WETH'

  return (
    <>
      <Head>
        <title>{i18n._(t`SureHive`)} | Pool</title>
        <meta key="description" name="description" content="" />
      </Head>
      <Container maxWidth="full" className="grid h-full sm:overflow-x-auto">
        <div className="flex flex-col sm:flex-row dark:bg-dark-900 bg-white-130">
          <div className="mobile:w-full order-last sm:order-first">
            <ExpandedPool
              currency={currencyA}
              otherCurrency={currencyB}
              hasLiquidity={hasLiquidity}
              currentTheme={currentTheme}
            />
          </div>
          <div className="sm:flex-grow">
            <div className="grid w-full min-w-0 sm:min-w-900">
              <PoolGraph currency={currencyA} otherCurrency={currencyB} currentTheme={currentTheme} />
              <PoolTransactionLog currency={currencyA} otherCurrency={currencyB} />
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
