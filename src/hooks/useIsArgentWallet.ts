import { NEVER_RELOAD, useSingleCallResult } from '../state/multicall/hooks'

import { useWalletManager } from '../providers/walletManagerProvider'
import { useArgentWalletDetectorContract } from './useContract'
import { useMemo } from 'react'

export default function useIsArgentWallet(): boolean {
  const { account } = useWalletManager()
  const argentWalletDetector = useArgentWalletDetectorContract()
  const inputs = useMemo(() => [account ?? undefined], [account])
  const call = useSingleCallResult(argentWalletDetector, 'isArgentWallet', inputs, NEVER_RELOAD)
  return call?.result?.[0] ?? false
}
