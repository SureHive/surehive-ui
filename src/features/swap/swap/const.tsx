import { secondsToMinute } from '../../../functions/convert/secondsToMinute'

export const getTtlForDisplay = (ttl: number): string => {
  const ttlInMinutes = secondsToMinute(ttl)
  if (ttlInMinutes > 0) {
    return `${ttlInMinutes} minutes`
  }
  return `${ttl} seconds`
}
