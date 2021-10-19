import { Currency, Token } from '@sushiswap/sdk'
import { useCallback, useState } from 'react'
import { getTokenLogoURL } from './../components/CurrencyLogo'
import { useWalletManager } from '../providers/walletManagerProvider'

export default function useAddTokenToWallet(currencyToAdd: Currency | undefined): {
  addToken: () => void
  success: boolean | undefined
} {
  const { chainId, provider } = useWalletManager()

  const token: Token | undefined = currencyToAdd?.wrapped

  const [success, setSuccess] = useState<boolean | undefined>()

  const addToken = useCallback(() => {
    // if (library && library.provider.isMetaMask && library.provider.request && token) {
    //   library.provider
    //     .request({
    //       method: 'wallet_watchAsset',
    //       params: {
    //         //@ts-ignore // need this for incorrect ethers provider type
    //         type: 'ERC20',
    //         options: {
    //           address: token.address,
    //           symbol: token.symbol,
    //           decimals: token.decimals,
    //           image: getTokenLogoURL(token.address, chainId),
    //         },
    //       },
    //     })
    //     .then((success) => {
    //       setSuccess(success)
    //     })
    //     .catch(() => setSuccess(false))
    // } else {
    //   setSuccess(false)
    // }
  }, [chainId, token])

  return { addToken, success }
}
