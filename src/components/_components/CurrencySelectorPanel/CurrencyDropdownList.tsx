import { Currency } from '@sushiswap/sdk'

interface CurrencyDropdownProps {
  currency?: Currency
  otherCurrency?: Currency
  currencyList?: Currency[]
  onCurrencySelect?: (currency: Currency) => void
  setShowDropdown: (value: boolean) => void
}

export default function CurrencyDropdownList(props: CurrencyDropdownProps) {
  console.log('currencyList')
  console.log(props.currencyList)

  return (
    <div
      className="absolute -top-1 left-0 dark:bg-dark-600 bg-white border-white-200 w-full z-10"
      style={{
        height: '330px',
        border: '1px solid',
        borderRadius: '12px',
        boxShadow: '0 20px 20px -20px #141416',
      }}
    >
      <div
        className="flex items-center px-3 border-white-200"
        style={{
          height: '56px',
          borderBottom: '1px solid',
          borderRadius: '12px',
        }}
      >
        <input
          className="w-full dark:bg-dark-600 bg-white placeholder-gray text-white-100"
          placeholder="Select Token"
        />
      </div>
      <div className="w-full h-full"></div>
    </div>
  )
}
