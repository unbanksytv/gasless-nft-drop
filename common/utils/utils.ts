import { formatDuration, intervalToDuration } from 'date-fns'
import { addIndex, gt, join, lt, map, modulo, pipe, propSatisfies, take, takeLast, when, __ } from 'ramda'

export const truncate = (length: number) =>
  when(
    propSatisfies(gt(__, length), 'length'),
    pipe((x: string) => [take(5, x), takeLast(3, x)], join('…')),
  )

export const truncateAddress = truncate(12)

export const formatAmount = (number: number) =>
  new Intl.NumberFormat(
    'en-US',
    gt(number)(1) || lt(number)(-1)
      ? {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        }
      : {
          minimumFractionDigits: 2,
          maximumSignificantDigits: 2,
        },
  ).format(number)

export const getRemainingTime = (start: Date, end: Date) =>
  formatDuration(
    intervalToDuration({
      start: new Date(Date.now()),
      end: end,
    }),
  )

export const mapIndexed = addIndex(map)

export const isOdd = modulo(__, 2)
