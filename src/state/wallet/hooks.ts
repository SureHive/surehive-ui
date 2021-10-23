import { CurrencyAmount, Currency, NativeCurrency, Token } from '../../entities'
import { useMultipleContractSingleData, useSingleContractMultipleData } from '../multicall/hooks'

import ERC20_ABI from '../../constants/abis/erc20.json'
import { Interface } from '@ethersproject/abi'
import { isAddress } from '../../functions'
import { useWalletManager } from '../../providers/walletManagerProvider'
import { useAllTokens } from '../../hooks/Tokens'
import { useMemo } from 'react'

/**
 * Returns a map of the given addresses to their eventually consistent ETH balances.
 */
export function useNativeCoinBalances(uncheckedAddresses?: (string | undefined)[]): {
  [address: string]: CurrencyAmount<Currency> | undefined
} {
  const { chainId, connector } = useWalletManager()

  const addresses: string[] = useMemo(
    () =>
      uncheckedAddresses
        ? uncheckedAddresses
            .map(isAddress)
            .filter((a): a is string => a !== false)
            .sort()
        : [],
    [uncheckedAddresses]
  )

  const results = useMemo(async () => {
    addresses.map(async (address) => {
      try {
        return await connector.getBalance(address)
      } catch (e) {
        return null
      }
    })
  }, [addresses, connector])

  return useMemo(
    () =>
      addresses.reduce<{ [address: string]: CurrencyAmount<Currency> }>((memo, address, i) => {
        const value = results?.[i]
        if (value && chainId)
          memo[address] = CurrencyAmount.fromRawAmount(
            NativeCurrency.onChain(chainId, connector.nativeCoin),
            value.toString()
          )
        return memo
      }, {}),
    [addresses, chainId, results, connector]
  )
}

/**
 * Returns a map of token addresses to their eventually consistent token balances for a single account.
 */
export function useTokenBalancesWithLoadingIndicator(
  address?: string,
  tokens?: (Token | undefined)[]
): [{ [tokenAddress: string]: CurrencyAmount<Token> | undefined }, boolean] {
  const { connector } = useWalletManager()

  const validatedTokens: Token[] = useMemo(
    () => tokens?.filter((t?: Token): t is Token => connector.isAddress(t?.address) !== false) ?? [],
    [connector, tokens]
  )

  const balances = useMemo(async () => {
    return connector.getTokenBalances(address, validatedTokens)
  }, [validatedTokens, address, connector])

  return [
    useMemo(
      () =>
        address && validatedTokens.length > 0
          ? validatedTokens.reduce<{
              [tokenAddress: string]: CurrencyAmount<Token> | undefined
            }>((memo, token, i) => {
              const value = balances?.[i]
              const amount = value ? value.toString() : undefined
              if (amount) {
                memo[token.address] = CurrencyAmount.fromRawAmount(token, amount)
              }
              return memo
            }, {})
          : {},
      [address, validatedTokens, balances]
    ),
    false,
  ]
}

export function useTokenBalances(
  address?: string,
  tokens?: (Token | undefined)[]
): { [tokenAddress: string]: CurrencyAmount<Token> | undefined } {
  return useTokenBalancesWithLoadingIndicator(address, tokens)[0]
}

// get the balance for a single token/account combo
export function useTokenBalance(account?: string, token?: Token): CurrencyAmount<Token> | undefined {
  const tokenBalances = useTokenBalances(account, [token])
  if (!token) return undefined
  return tokenBalances[token.address]
}

export function useCurrencyBalances(
  account?: string,
  currencies?: (Currency | undefined)[]
): (CurrencyAmount<Currency> | undefined)[] {
  const { connector } = useWalletManager()

  const tokens = useMemo(
    () => currencies?.filter((currency): currency is Token => currency?.isToken ?? false) ?? [],
    [currencies]
  )

  const tokenBalances = useTokenBalances(account, tokens)
  const containsETH: boolean = useMemo(() => currencies?.some((currency) => currency?.isNative) ?? false, [currencies])
  const ethBalance = useNativeCoinBalances(containsETH ? [account] : [])

  return useMemo(
    () =>
      currencies?.map((currency) => {
        if (!account || !currency) return undefined
        if (currency.isToken) return tokenBalances[currency.address]
        if (currency.isNative) return ethBalance[account]
        return undefined
      }) ?? [],
    [account, currencies, ethBalance, tokenBalances]
  )
}

export function useCurrencyBalance(account?: string, currency?: Currency): CurrencyAmount<Currency> | undefined {
  return useCurrencyBalances(account, [currency])[0]
}

// mimics useAllBalances
export function useAllTokenBalances(): {
  [tokenAddress: string]: CurrencyAmount<Token> | undefined
} {
  const { account } = useWalletManager()
  const allTokens = useAllTokens()
  const allTokensArray = useMemo(() => Object.values(allTokens ?? {}), [allTokens])
  const balances = useTokenBalances(account ?? undefined, allTokensArray)
  return balances ?? {}
}

// TODO: Replace
// get the total owned, unclaimed, and unharvested UNI for account
// export function useAggregateUniBalance(): CurrencyAmount<Token> | undefined {
//   const { account, chainId } = useWalletManager();

//   const uni = chainId ? UNI[chainId] : undefined;

//   const uniBalance: CurrencyAmount<Token> | undefined = useTokenBalance(
//     account ?? undefined,
//     uni
//   );
//   const uniUnclaimed: CurrencyAmount<Token> | undefined =
//     useUserUnclaimedAmount(account);
//   const uniUnHarvested: CurrencyAmount<Token> | undefined = useTotalUniEarned();

//   if (!uni) return undefined;

//   return CurrencyAmount.fromRawAmount(
//     uni,
//     JSBI.add(
//       JSBI.add(
//         uniBalance?.quotient ?? JSBI.BigInt(0),
//         uniUnclaimed?.quotient ?? JSBI.BigInt(0)
//       ),
//       uniUnHarvested?.quotient ?? JSBI.BigInt(0)
//     )
//   );
// }
