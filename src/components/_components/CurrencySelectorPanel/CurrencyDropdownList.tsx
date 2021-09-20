import { Currency, CurrencyAmount } from '@sushiswap/sdk'
import { useCurrencyBalance } from '../../../state/wallet/hooks'
import { useActiveWeb3React } from '../../../hooks/useActiveWeb3React'
import CurrencyLogo from '../../CurrencyLogo'
import Loader from '../../Loader'
import { RefObject } from 'react'

interface CurrencyDropdownProps {
  selectedCurrency?: Currency
  otherCurrency?: Currency
  currencyList?: Currency[]
  onCurrencySelect?: (currency: Currency) => void
  setShowDropdown: (value: boolean) => void
  inputRef?: RefObject<HTMLInputElement>
  handleInput?: (any) => void
  handleEnter?: (any) => void
  searchQuery?: string
  currentTheme: string
}

function currencyKey(currency: Currency): string {
  return currency.isToken ? currency.address : 'ETHER'
}

function Balance({ balance }: { balance: CurrencyAmount<Currency> }) {
  return (
    <div>
      {balance.toSignificant(4)} {balance.currency.symbol.toUpperCase()}
    </div>
  )
}

function CurrencyRow({
  currency,
  onSelect,
  borderBottom,
}: {
  currency: Currency
  onSelect: () => void
  borderBottom: string
}) {
  const { account } = useActiveWeb3React()
  const key = currencyKey(currency)
  const balance = useCurrencyBalance(account ?? undefined, currency)

  return (
    <div
      id={`token-item-${key}`}
      className="flex justify-between items-center cursor-pointer"
      style={{ height: '50px', borderBottom }}
      onClick={onSelect}
    >
      <div className="relative flex flex-row items-center text-sm dark:text-white text-black">
        <div className="flex items-center">
          <CurrencyLogo currency={currency} size={32} className="rounded-full" />
        </div>
        <div className="font-medium ml-4 opacity-70">{currency.symbol.toUpperCase()}</div>
        <div className="absolute left-32 text-xs font-thin opacity-60" style={{ width: '100px' }}>
          {currency.name}
        </div>
      </div>
      <div className="text-sm dark:text-white text-black mr-2">
        {balance ? <Balance balance={balance} /> : account ? <Loader /> : null}
      </div>
    </div>
  )
}

export default function CurrencyDropdownList(props: CurrencyDropdownProps) {
  const border = props.currentTheme === 'dark' ? '1px solid #353945' : '1px solid  #E6E8EC'
  const borderBottom = props.currentTheme === 'dark' ? '1px solid #353945' : '1px solid  #E6E8EC'
  return (
    <div
      className="absolute -top-1 left-0 dark:bg-dark-600 bg-white z-10"
      style={{
        width: '406px',
        border,
        borderRadius: '12px',
        boxShadow: '0 20px 20px -20px #141416',
        marginLeft: '-1px',
      }}
    >
      <input
        className="w-full dark:bg-dark-600 bg-white placeholder-gray dark:text-white-100 text-black px-3 border-dark-500 focus:ring-2 focus:ring-blue-100 focus:border-0"
        style={{
          height: '56px',
          borderBottom,
          borderRadius: '12px',
        }}
        placeholder="Select Token"
        autoComplete="off"
        value={props.searchQuery}
        ref={props.inputRef}
        onChange={props.handleInput}
        onKeyDown={props.handleEnter}
      />
      <div className="w-full p-3 overflow-y-auto">
        {props.currencyList.map((currency) => {
          const isSelected = Boolean(currency && props.selectedCurrency && props.selectedCurrency.equals(currency))

          if (!isSelected) {
            const handleSelect = () => currency && props.onCurrencySelect(currency)

            return <CurrencyRow currency={currency} onSelect={handleSelect} borderBottom={borderBottom} />
          }
        })}
      </div>
    </div>
  )
}
