import ARGENT_WALLET_ABI from '../constants/abis/argent-wallet.json'
import { Contract } from '@ethersproject/contracts'
import { useWalletManager } from '../providers/walletManagerProvider'
import { useContract } from './useContract'
import useIsArgentWallet from './useIsArgentWallet'

export function useArgentWalletContract(): Contract | null {
  const { account } = useWalletManager()
  const isArgentWallet = useIsArgentWallet()
  return useContract(isArgentWallet ? account ?? undefined : undefined, ARGENT_WALLET_ABI, true)
}
