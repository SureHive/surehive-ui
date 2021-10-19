import { NETWORK_ICON, NETWORK_LABEL } from '../../constants/networks'

import Image from 'next/image'
import NetworkModel from '../../modals/NetworkModal'
import React from 'react'
import { useWalletManager } from '../../hooks'
import { useNetworkModalToggle } from '../../state/application/hooks'

function Web3Network(): JSX.Element | null {
  const { chainId } = useWalletManager()

  const toggleNetworkModal = useNetworkModalToggle()

  if (!chainId) return null

  return (
    <div
      className="flex items-center  px-3 py-1 rounded-full text-dark-1000  hover:text-high-emphasis whitespace-nowrap text-sm font-bold cursor-pointer select-none pointer-events-auto"
      onClick={() => toggleNetworkModal()}
    >
      <div className="flex items-center grid-flow-col space-x-1 text-sm rounded-full pointer-events-auto auto-cols-max text-dark-1000 dark:bg-dark-1000 dark:text-white">
        <Image src={NETWORK_ICON[chainId]} alt="Switch Network" className="rounded-full" width="22px" height="22px" />
        <div className="text-xs uppercase dark:text-white">{NETWORK_LABEL[chainId]}</div>
      </div>
      <NetworkModel />
    </div>
  )
}

export default Web3Network
