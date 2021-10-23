import { AbstractCurrency } from '@sushiswap/sdk'
import invariant from 'tiny-invariant'

export type Currency = NativeCurrency | Token

export abstract class INativeCurrency extends AbstractCurrency {
  public readonly isNative: true = true
  public readonly isToken: false = false
}

export class Token extends AbstractCurrency {
  public readonly chainId: number
  public readonly address: string

  public readonly isNative: false = false
  public readonly isToken: true = true

  public constructor(chainId: number, address: string, decimals: number, symbol?: string, name?: string) {
    super(chainId, decimals, symbol, name)
    this.chainId = chainId
    this.address = address
  }

  public equals(other: Currency): boolean {
    return other.isToken && this.chainId === other.chainId && this.address === other.address
  }

  public sortsBefore(other: Token): boolean {
    invariant(this.chainId === other.chainId, 'CHAIN_IDS')
    invariant(this.address !== other.address, 'ADDRESSES')
    return this.address.toLowerCase() < other.address.toLowerCase()
  }

  public get wrapped(): Token {
    return this
  }
}

export class NativeCurrency extends INativeCurrency {
  public readonly address?: string
  public readonly chainId: number

  public constructor(chainId: number, decimals: number, address?: string, symbol?: string, name?: string) {
    super(chainId, decimals, symbol, name)
    this.address = address
    this.chainId = chainId
  }

  equals(other: Currency): boolean {
    return this.isNative && this.chainId === other.chainId
  }

  get wrapped(): Token {
    return new Token(this.chainId, this.address, this.decimals, this.symbol, this.name)
  }

  public static onChain(chainId: number, coin: string): NativeCurrency {
    switch (coin.toLowerCase()) {
      case 'ada':
        return new NativeCurrency(chainId, 18, null, 'ADA', 'cardano')
      default:
        throw new Error(`Unknown on chain coin: ${coin}`)
    }
  }
}

export function currencyEquals(currencyA: Currency, currencyB: Currency): boolean {
  if (currencyA instanceof Token && currencyB instanceof Token) {
    return currencyA.equals(currencyB)
  } else if (currencyA instanceof Token) {
    return false
  } else if (currencyB instanceof Token) {
    return false
  } else {
    return currencyA === currencyB
  }
}
