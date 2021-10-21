import { EventEmitter } from 'events'
import { AbstractConnectorArguments, ConnectorUpdate } from '@web3-react/types'

export declare abstract class AbstractWalletConnector extends EventEmitter {
  readonly supportedChainIds?: number[]

  protected constructor({ supportedChainIds }?: AbstractConnectorArguments)

  abstract activate(): Promise<ConnectorUpdate>

  abstract getProvider(): Promise<any>

  abstract getChainId(): Promise<number | string>

  abstract getAccount(): Promise<null | string>

  abstract deactivate(): void

  abstract getBalance(account: string): Promise<null | string>
}
