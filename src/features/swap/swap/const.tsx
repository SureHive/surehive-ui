import { secondsToMinute } from '../../../functions/convert/secondsToMinute'

export const getTtlForDisplay = (ttl: number, inFull = true): string => {
  const ttlInMinutes = secondsToMinute(ttl)
  if (ttlInMinutes > 0) {
    return inFull ? `${ttlInMinutes} minutes` : `${ttlInMinutes} min`
  }
  return inFull ? `${ttl} seconds` : `${ttl} sec`
}
