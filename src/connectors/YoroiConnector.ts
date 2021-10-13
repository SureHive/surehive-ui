import { AbstractConnector } from '@web3-react/abstract-connector'

export class YoroiConnector extends AbstractConnector {
  async activate() {
    // @ts-ignore
    const response = await window.cardano_request_read_access()
    console.log('yoroi connector')
    console.log(response)

    return {
      provider: null,
      chainId: null,
      account: null,
    }
  }

  deactivate() {}

  getAccount(): Promise<string | null> {
    return Promise.resolve(undefined)
  }

  getProvider(): Promise<any> {
    return Promise.resolve(undefined)
  }

  getChainId(): Promise<number | string> {
    return Promise.resolve(undefined)
  }
}
