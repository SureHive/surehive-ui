import { ChainId, Currency, NATIVE, Token } from '@sushiswap/sdk'
import CurrencySelector from './CurrencySelector'
import CurrencyValue from './CurrencyValue'
import CurrencyDropdownList from './CurrencyDropdownList'
import { KeyboardEvent, useCallback, useMemo, useRef, useState } from 'react'
import { FixedSizeList } from 'react-window'
import { useAllTokens, useIsUserAddedToken, useSearchInactiveTokenLists, useToken } from '../../../hooks/Tokens'
import { isAddress } from '../../../functions'
import useDebounce from '../../../hooks/useDebounce'
import { filterTokens, useSortedTokensByQuery } from '../../../functions/filtering'
import { useTokenComparator } from '../../../modals/SearchModal/sorting'
import { useActiveWeb3React } from '../../../hooks/useActiveWeb3React'

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
  currentTheme: string
  includeNativeCurrency?: boolean
}

const CurrencySelectorPanel = (props: CurrencySelectorPanelProps) => {
  props.includeNativeCurrency = props.includeNativeCurrency ? props.includeNativeCurrency : true

  const { chainId } = useActiveWeb3React()

  const [showDropdown, setShowDropdown] = useState(false)
  const fixedList = useRef<FixedSizeList>()

  const [searchQuery, setSearchQuery] = useState<string>('')
  const debouncedQuery = useDebounce(searchQuery, 200)

  const [invertSearchOrder] = useState<boolean>(false)

  let allTokens = useAllTokens()
  if (props.currencyList) {
    allTokens = Object.keys(allTokens).reduce((obj, key) => {
      if (props.currencyList.includes(key)) obj[key] = allTokens[key]
      return obj
    }, {})
  }

  // if they input an address, use it
  const isAddressSearch = isAddress(debouncedQuery)

  const searchToken = useToken(debouncedQuery)

  const searchTokenIsAdded = useIsUserAddedToken(searchToken)

  const tokenComparator = useTokenComparator(invertSearchOrder)

  const filteredTokens: Token[] = useMemo(() => {
    return filterTokens(Object.values(allTokens), debouncedQuery)
  }, [allTokens, debouncedQuery])

  const sortedTokens: Token[] = useMemo(() => {
    return filteredTokens.sort(tokenComparator)
  }, [filteredTokens, tokenComparator])

  const filteredSortedTokens = useSortedTokensByQuery(sortedTokens, debouncedQuery)

  const ether = useMemo(() => chainId && ![ChainId.CELO].includes(chainId) && NATIVE[chainId], [chainId])

  const filteredSortedTokensWithETH: Currency[] = useMemo(() => {
    const s = debouncedQuery.toLowerCase().trim()
    if (s === '' || s === 'e' || s === 'et' || s === 'eth') {
      return ether ? [ether, ...filteredSortedTokens] : filteredSortedTokens
    }
    return filteredSortedTokens
  }, [debouncedQuery, ether, filteredSortedTokens])

  const handleCurrencySelect = useCallback(
    (currency: Currency) => {
      props.onCurrencySelect(currency)
      setShowDropdown(false)
    },
    [setShowDropdown, props.onCurrencySelect]
  )

  // handle currency search
  const inputRef = useRef<HTMLInputElement>()
  const handleInput = useCallback((event) => {
    const input = event.target.value
    const checksummedInput = isAddress(input)
    setSearchQuery(checksummedInput || input)
    // fixedList.current?.scrollTo(0)
  }, [])

  const handleEnter = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        const s = debouncedQuery.toLowerCase().trim()
        if (s === 'eth' && ether) {
          handleCurrencySelect(ether)
        } else if (filteredSortedTokensWithETH.length > 0) {
          if (
            filteredSortedTokensWithETH[0].symbol?.toLowerCase() === debouncedQuery.trim().toLowerCase() ||
            filteredSortedTokensWithETH.length === 1
          ) {
            handleCurrencySelect(filteredSortedTokensWithETH[0])
          }
        }
      }
    },
    [debouncedQuery, ether, filteredSortedTokensWithETH, handleCurrencySelect]
  )

  // if no results on main list, show option to expand into inactive
  const filteredInactiveTokens = useSearchInactiveTokenLists(
    filteredTokens.length === 0 || (debouncedQuery.length > 2 && !isAddressSearch) ? debouncedQuery : undefined
  )

  return (
    <div className="flex justify-between w-full">
      <CurrencySelector setShowDropdown={setShowDropdown} {...props} currencyList={filteredSortedTokensWithETH} />
      <CurrencyValue {...props} />
      {showDropdown && (
        <CurrencyDropdownList
          setShowDropdown={setShowDropdown}
          {...props}
          currencyList={props.includeNativeCurrency ? filteredSortedTokensWithETH : filteredSortedTokens}
        />
      )}
    </div>
  )
}

export default CurrencySelectorPanel
