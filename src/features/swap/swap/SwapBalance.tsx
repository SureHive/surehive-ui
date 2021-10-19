import { Currency } from '@sushiswap/sdk'
import Image from 'next/image'
import { useCurrencyBalance } from '../../../state/wallet/hooks'
import { useWalletManager } from '../../../hooks'
import { formatCurrencyAmount, tryParseAmount } from '../../../functions'
import { useUSDCValue } from '../../../hooks/useUSDCPrice'

interface SwapBalanceProps {
  inputCurrency?: Currency
  outputCurrency?: Currency
  currentTheme: string
}

export default function SwapBalance(props: SwapBalanceProps) {
  const { account } = useWalletManager()
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, props.inputCurrency ?? undefined)
  const parsedAmount = tryParseAmount(
    selectedCurrencyBalance?.toFixed(props.inputCurrency.decimals),
    props.inputCurrency
  )
  const fiatValue = useUSDCValue(parsedAmount)
  const walletImage =
    props.currentTheme === 'dark'
      ? '/images/global/icon-wallet-available.svg'
      : '/images/global/icon-wallet-available-light.svg'

  return (
    <div className="flex justify-between items-center w-full p-3" style={{ height: '88px' }}>
      <div className="flex flex-row space-x-3 text-xs">
        <Image src={walletImage} alt={'icon-wallet-available.svg'} width={'30px'} height={'32px'} />
        <div>
          <p>Available</p>
          <p>balance</p>
        </div>
      </div>
      <div className="flex flex-col">
        {props.inputCurrency && (
          <div className="text-right">
            {formatCurrencyAmount(selectedCurrencyBalance, 4)} {props.inputCurrency.symbol}
          </div>
        )}
        <div className="text-right text-xs">{'$9,034.97'}</div>
      </div>
    </div>
  )
}
