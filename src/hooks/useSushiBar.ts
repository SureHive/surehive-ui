import { Currency, CurrencyAmount, Token } from '@sushiswap/sdk'

import { useCallback } from 'react'
import { useSureMakerContract } from '../hooks/useContract'
import { useTransactionAdder } from '../state/transactions/hooks'

const useSureMaker = () => {
  const addTransaction = useTransactionAdder()
  const barContract = useSureMakerContract()

  const enter = useCallback(
    async (amount: CurrencyAmount<Token> | undefined) => {
      if (amount?.quotient) {
        try {
          const tx = await barContract?.enter(amount?.quotient.toString())
          return addTransaction(tx, { summary: 'Enter SureMaker' })
        } catch (e) {
          return e
        }
      }
    },
    [addTransaction, barContract]
  )

  const leave = useCallback(
    async (amount: CurrencyAmount<Token> | undefined) => {
      if (amount?.quotient) {
        try {
          const tx = await barContract?.leave(amount?.quotient.toString())
          return addTransaction(tx, { summary: 'Leave SureMaker' })
        } catch (e) {
          return e
        }
      }
    },
    [addTransaction, barContract]
  )

  return { enter, leave }
}

export default useSureMaker
