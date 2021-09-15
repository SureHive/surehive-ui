import { Currency } from '@sushiswap/sdk'
import CurrencySelector from './CurrencySelector'
import CurrencyValue from './CurrencyValue'
import CurrencyDropdownList from './CurrencyDropdownList'
import { useState } from 'react'

interface CurrencySelectorPanelProps {
  currency?: Currency
  onCurrencySelect?: (currency: Currency) => void
  otherCurrency?: Currency
  label?: string
  currencyList?: Currency[]
  showCommonBases?: boolean
  value?: string
  onUserInput?: (value: string) => void
  onMax?: () => void
  showMaxButton: boolean
  currentTheme: string
}

const CurrencySelectorPanel = (props: CurrencySelectorPanelProps) => {
  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <div className="flex justify-between w-full">
      <CurrencySelector setShowDropdown={setShowDropdown} {...props} />
      <CurrencyValue {...props} />
      {showDropdown && <CurrencyDropdownList setShowDropdown={setShowDropdown} {...props} />}
    </div>
  )
}

export default CurrencySelectorPanel
