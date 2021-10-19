import NavLink from '../../components/NavLink'
import React from 'react'
import { currencyId } from '../../functions/currency'
import { useWalletManager } from '../../hooks'

export default function LiquidityHeader({ input = undefined, output = undefined }: any): JSX.Element {
  const { chainId } = useWalletManager()
  return (
    <div className="grid grid-cols-2 rounded-md p-3px bg-gray-100">
      <NavLink
        activeClassName="font-bold text-high-emphesis bg-gray-200"
        href={`/add/${currencyId(input)}/${currencyId(output)}`}
      >
        <a className="flex items-center justify-center px-4 py-3 text-base font-medium text-center rounded-md md:px-10 text-secondary hover:text-high-emphesis">
          Add
        </a>
      </NavLink>
      <NavLink
        onClick={(event) => {
          if (!output) event.preventDefault()
        }}
        activeClassName="text-high-emphesis font-bold bg-gray-200"
        href={`/remove/${currencyId(input)}/${currencyId(output)}`}
      >
        <a className="flex items-center justify-center px-4 py-3 text-base font-medium text-center rounded-md md:px-10 text-secondary hover:text-high-emphesis">
          Remove
        </a>
      </NavLink>
    </div>
  )
}
