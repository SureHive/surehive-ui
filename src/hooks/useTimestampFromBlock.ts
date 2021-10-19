import { useEffect, useState } from 'react'

import { useWalletManager } from '../providers/walletManagerProvider'
//
// export function useTimestampFromBlock(block: number | undefined): number | undefined {
//   const { library } = useWalletManager()
//   const [timestamp, setTimestamp] = useState<number>()
//   useEffect(() => {
//     async function fetchTimestamp() {
//       if (block) {
//         const blockData = await library?.getBlock(block)
//         blockData && setTimestamp(blockData.timestamp)
//       }
//     }
//     if (!timestamp) {
//       fetchTimestamp()
//     }
//   }, [block, library, timestamp])
//   return timestamp
// }
