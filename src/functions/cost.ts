import { GasCostLevel } from '../constants'
import { BigNumber } from '@ethersproject/bignumber'

export function getGasCostLevel(value: BigNumber | string): GasCostLevel {
  return GasCostLevel.MODERATE
}
