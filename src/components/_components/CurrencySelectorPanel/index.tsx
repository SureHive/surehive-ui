import { Currency } from '@sushiswap/sdk'
import CurrencySelector from './CurrencySelector'
import CurrencyValue from './CurrencyValue'

interface CurrencySelectorPanelProps {
  currency?: Currency
  onCurrencySelect?: (currency: Currency) => void
  otherCurrency?: Currency
  label?: string
  currencyList?: string[]
  showCommonBases?: boolean
  value?: string
  onUserInput?: (value: string) => void
  onMax?: () => void
  showMaxButton: boolean
}

const CurrencySelectorPanel = (props: CurrencySelectorPanelProps) => {
  return (
    <div className="flex justify-between w-full">
      <CurrencySelector {...props} />
      <CurrencyValue {...props} />
    </div>
  )
}

export default CurrencySelectorPanel
