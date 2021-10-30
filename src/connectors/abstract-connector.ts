import { EventEmitter } from 'events'
import { NativeCurrency, Token } from '../entities'

export interface ConnectorUpdate {
  provider?: any
  chainId?: number
  account?: null | string
}

export abstract class AbstractWalletConnector extends EventEmitter {
  readonly supportedChainIds?: number[]
  public readonly nativeCoin: string
  public readonly nativeAddress: string

  constructor({ supportedChainIds }: { supportedChainIds?: number[] } = {}) {
    super()
    this.supportedChainIds = supportedChainIds
  }
  abstract activate(): Promise<ConnectorUpdate>
  abstract getProvider(): Promise<any>
  abstract getChainId(): Promise<number | string>
  abstract getAccount(): Promise<null | string>
  abstract deactivate(): void
  abstract getBalance(account: string): Promise<null | string>
  abstract isAddress(address: string): string | false
  abstract getTokenBalances(account: string, tokens: Token[]): Promise<string[]>
  abstract getToken(address: string): Promise<Token>
  abstract getTokens(): Promise<Token[]>
  abstract getNativeCurrency(chainId: number): NativeCurrency
}
