import React, { ReactNode, useMemo } from 'react'
import { BLOCKED_ADDRESSES } from '../../constants'
import { useWalletManager } from '../../hooks'

export default function Blocklist({ children }: { children: ReactNode }) {
  const { account } = useWalletManager()
  const blocked: boolean = useMemo(() => Boolean(account && BLOCKED_ADDRESSES.indexOf(account) !== -1), [account])
  if (blocked) {
    return <div>Blocked address</div>
  }
  return <>{children}</>
}
