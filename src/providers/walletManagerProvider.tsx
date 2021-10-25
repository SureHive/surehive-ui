import React, { createContext, useCallback, useContext, useEffect, useReducer, useState } from 'react'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { normalizeAccount, normalizeChainId } from '../functions'
import invariant from 'tiny-invariant'
import { AbstractWalletConnector } from '../connectors/abstract-connector'
import { nami } from '../connectors'

interface WalletManagerState {
  connector?: AbstractWalletConnector
  provider?: any
  chainId?: number
  account?: null | string
  error?: Error
}

enum ActionType {
  SET_ACTIVE_WALLET,
  ERROR,
  REMOVE_ACTIVE_WALLET,
}

interface Action {
  type: ActionType
  payload?: any
}

function reducer(state: WalletManagerState, { type, payload }: Action) {
  switch (type) {
    case ActionType.SET_ACTIVE_WALLET: {
      const { connector, provider, chainId, account } = payload
      return { connector, provider, chainId, account, error: undefined }
    }
    case ActionType.ERROR: {
      const { connector, error } = payload
      return { ...state, connector, error }
    }
    case ActionType.REMOVE_ACTIVE_WALLET: {
      return {}
    }
  }
}

interface WalletManagerReturn extends WalletManagerState {
  activate: (
    connector: (() => Promise<AbstractWalletConnector>) | AbstractWalletConnector | undefined
  ) => Promise<WalletManagerState>
  setError: (error: Error) => void
}

function initializer(initialValue = {}) {
  if (typeof window !== 'undefined') {
    const value = JSON.parse(localStorage.getItem('wallet_manager')) || initialValue
    value.connector = nami
    return value
  }
  return initialValue
}

function _useWalletManager(): WalletManagerReturn {
  const [state, dispatch] = useReducer(reducer, {}, initializer)
  const { connector, provider, chainId, account, error } = state

  useEffect(() => {
    localStorage.setItem('wallet_manager', JSON.stringify(state))
  }, [state])

  const activate = useCallback(async (conn: AbstractWalletConnector | undefined): Promise<WalletManagerState> => {
    // if the connector is walletConnect and the user has already tried to connect, manually reset the connector
    if (conn instanceof WalletConnectConnector && conn.walletConnectProvider?.wc?.uri) {
      conn.walletConnectProvider = undefined
    }

    if (conn) {
      try {
        const result = await conn.activate()
        const provider = result.provider === undefined ? await conn.getProvider() : result.provider
        const chainId = result.chainId === undefined ? await conn.getChainId() : result.chainId
        const account = result.account === undefined ? await conn.getAccount() : result.account

        const update = {
          connector: conn,
          provider,
          chainId: conn === nami ? Number(chainId) : normalizeChainId(chainId),
          account: conn === nami ? account : normalizeAccount(account),
        }
        dispatch({ type: ActionType.SET_ACTIVE_WALLET, payload: update })
        return update
      } catch (error) {
        dispatch({ type: ActionType.ERROR, payload: { connector: conn, error } })
        throw error
      }
    }
  }, [])

  const setError = useCallback((error: Error): void => {
    dispatch({ type: ActionType.ERROR, payload: { error } })
  }, [])

  return { activate, connector, provider, chainId, account, error, setError }
}

interface WalletManagerContextInterface extends WalletManagerReturn {
  active: boolean
}

const ManagerContext = createContext<WalletManagerContextInterface>({
  active: false,
  activate: async () => {
    invariant(false, 'No <WalletManagerProvider .../> found.')
  },
  setError: async () => {
    invariant(false, 'No <WalletManagerProvider .../> found.')
  },
})

export function createWalletManagerProvider() {
  const Provider = ManagerContext.Provider

  return function WalletManagerProvider({ children }: { children: any }) {
    const {
      connector,
      provider,
      chainId,
      account,

      activate,
      setError,

      error,
    } = _useWalletManager()

    const active = connector !== undefined && chainId !== undefined && account !== undefined && !!!error
    const walletManagerContext: WalletManagerContextInterface = {
      connector,
      provider,
      chainId,
      account,
      activate,
      setError,
      error,
      active,
    }

    return <Provider value={walletManagerContext}>{children}</Provider>
  }
}

export const WalletManagerProvider = createWalletManagerProvider()

export function useWalletManager(): WalletManagerContextInterface {
  return useContext(ManagerContext)
}
