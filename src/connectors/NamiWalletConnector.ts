import {
  TransactionUnspentOutput,
  Value,
  BaseAddress,
  RewardAddress,
  Transaction,
  TransactionWitnessSet,
  Address,
} from '@emurgo/cardano-serialization-lib-asmjs'
import { ConnectorUpdate } from '@web3-react/types'
import { BlockFrostAPI } from '@blockfrost/blockfrost-js'
import { AbstractWalletConnector } from './abstract-connector'
import { Token } from '../entities'

interface CardanoProvider {
  enable(): Promise<boolean>
  isEnabled(): Promise<boolean>
  getBalance(): Promise<Value>
  getUtxos(amount?: Value, paginate?: { page: number; limit: number }): Promise<[TransactionUnspentOutput]>
  getCollateral(): Promise<TransactionUnspentOutput>
  getUsedAddresses(): Promise<[string]>
  getUnusedAddresses(): Promise<[BaseAddress]>
  getNetworkId(): Promise<number>
  signData(
    address: BaseAddress | RewardAddress,
    payload: string
  ): Promise<{ payload: Record<string, any>; signature: string }>
  signTx(tx: Transaction, partialSign?: boolean): Promise<TransactionWitnessSet>
  submitTx(tx: Transaction): Promise<string>
}

export class NamiWalletConnector extends AbstractWalletConnector {
  private readonly provider: CardanoProvider
  private readonly api: BlockFrostAPI
  public readonly nativeCoin: string = 'ADA'

  constructor() {
    super()
    if (typeof window !== 'undefined') {
      // @ts-ignore
      this.provider = window.cardano
      this.api = new BlockFrostAPI({
        projectId: process.env.BLOCKFROST_API_KEY,
      })
    }
  }

  private async getAddress() {
    const rawAddress = (await this.provider.getUsedAddresses())[0]
    const address = Address.from_bytes(Uint8Array.from(Buffer.from(rawAddress, 'hex')))
    return address.to_bech32()
  }

  async activate(): Promise<ConnectorUpdate<number>> {
    const result = await this.provider.enable()
    if (result) {
      return {
        provider: this.provider,
        chainId: await this.provider.getNetworkId(),
        account: await this.getAddress(),
      }
    }
    throw new Error('Access to wallet denied')
  }

  deactivate(): void {}

  async getAccount(): Promise<string | null> {
    return await this.getAddress()
  }

  async getChainId(): Promise<number> {
    return this.provider.getNetworkId()
  }

  async getProvider(): Promise<CardanoProvider> {
    return this.provider
  }

  async getBalance(account: string): Promise<string | null> {
    return this.api
      .addresses(account)
      .then((result) => result.amount.find((amt) => amt.unit === 'lovelace'))
      .then((amount) => (amount ? amount.quantity : null))
  }

  isAddress(address: string): string | false {
    /// TODO: check valid address
    return address
  }

  async getTokenBalances(account: string, tokens: Token[]): Promise<string[]> {
    const result = await this.api.addresses(account)
    return tokens.map((t) => {
      const amount = result.amount.find((amt) => amt.unit === t.address)
      return amount ? amount.quantity : null
    })
  }
}
