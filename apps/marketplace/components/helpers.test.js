import format from 'date-fns/format'
import { getBriefLastQuestionDate, padStart } from './helpers'

describe('getBriefLastQuestionDate', () => {
  test('When closing date is over a week away', () => {
    const closingDate = new Date('2019-05-24')
    const referenceDate = new Date('2019-03-10')
    const lastQuestionDate = format(getBriefLastQuestionDate(closingDate, referenceDate), 'YYYY-MM-DD')
    expect(lastQuestionDate).toEqual(format(new Date('2019-05-22'), 'YYYY-MM-DD'))
  })

  test('When closing date is 3 days away', () => {
    const closingDate = new Date('2019-05-24')
    const referenceDate = new Date('2019-05-21')
    const lastQuestionDate = format(getBriefLastQuestionDate(closingDate, referenceDate), 'YYYY-MM-DD')
    expect(lastQuestionDate).toEqual(format(new Date('2019-05-23'), 'YYYY-MM-DD'))
  })

  test('When closing date is 2 days away', () => {
    const closingDate = new Date('2019-05-24')
    const referenceDate = new Date('2019-05-22')
    const lastQuestionDate = format(getBriefLastQuestionDate(closingDate, referenceDate), 'YYYY-MM-DD')
    expect(lastQuestionDate).toEqual(format(new Date('2019-05-23'), 'YYYY-MM-DD'))
  })

  test('When closing date is 1 day away', () => {
    const closingDate = new Date('2019-05-24')
    const referenceDate = new Date('2019-05-23')
    const lastQuestionDate = format(getBriefLastQuestionDate(closingDate, referenceDate), 'YYYY-MM-DD')
    expect(lastQuestionDate).toEqual(format(new Date('2019-05-23'), 'YYYY-MM-DD'))
  })

  test('When closing date is on a Monday', () => {
    const closingDate = new Date('2019-07-01')
    const referenceDate = new Date('2019-05-23')
    const lastQuestionDate = format(getBriefLastQuestionDate(closingDate, referenceDate), 'YYYY-MM-DD')
    expect(lastQuestionDate).toEqual(format(new Date('2019-06-27'), 'YYYY-MM-DD'))
  })

  test('When closing date is on a Tuesday', () => {
    const closingDate = new Date('2019-07-02')
    const referenceDate = new Date('2019-05-23')
    const lastQuestionDate = format(getBriefLastQuestionDate(closingDate, referenceDate), 'YYYY-MM-DD')
    expect(lastQuestionDate).toEqual(format(new Date('2019-06-28'), 'YYYY-MM-DD'))
  })

  test('When closing date is on a Wednesday', () => {
    const closingDate = new Date('2019-07-03')
    const referenceDate = new Date('2019-05-23')
    const lastQuestionDate = format(getBriefLastQuestionDate(closingDate, referenceDate), 'YYYY-MM-DD')
    expect(lastQuestionDate).toEqual(format(new Date('2019-07-01'), 'YYYY-MM-DD'))
  })

  test('When closing date is on a Thursday', () => {
    const closingDate = new Date('2019-07-04')
    const referenceDate = new Date('2019-05-23')
    const lastQuestionDate = format(getBriefLastQuestionDate(closingDate, referenceDate), 'YYYY-MM-DD')
    expect(lastQuestionDate).toEqual(format(new Date('2019-07-02'), 'YYYY-MM-DD'))
  })

  test('When closing date is on a Friday', () => {
    const closingDate = new Date('2019-07-05')
    const referenceDate = new Date('2019-05-23')
    const lastQuestionDate = format(getBriefLastQuestionDate(closingDate, referenceDate), 'YYYY-MM-DD')
    expect(lastQuestionDate).toEqual(format(new Date('2019-07-03'), 'YYYY-MM-DD'))
  })

  test('When closing date is on a Saturday', () => {
    const closingDate = new Date('2019-07-06')
    const referenceDate = new Date('2019-05-23')
    const lastQuestionDate = format(getBriefLastQuestionDate(closingDate, referenceDate), 'YYYY-MM-DD')
    expect(lastQuestionDate).toEqual(format(new Date('2019-07-04'), 'YYYY-MM-DD'))
  })

  test('When closing date is on a Sunday', () => {
    const closingDate = new Date('2019-07-07')
    const referenceDate = new Date('2019-05-23')
    const lastQuestionDate = format(getBriefLastQuestionDate(closingDate, referenceDate), 'YYYY-MM-DD')
    expect(lastQuestionDate).toEqual(format(new Date('2019-07-04'), 'YYYY-MM-DD'))
  })

  test('When closing date is on a leap day', () => {
    const closingDate = new Date('2020-02-29')
    const referenceDate = new Date('2019-05-23')
    const lastQuestionDate = format(getBriefLastQuestionDate(closingDate, referenceDate), 'YYYY-MM-DD')
    expect(lastQuestionDate).toEqual(format(new Date('2020-02-27'), 'YYYY-MM-DD'))
  })

  test('When closing date is on the last day of the year', () => {
    const closingDate = new Date('2019-12-31')
    const referenceDate = new Date('2019-05-23')
    const lastQuestionDate = format(getBriefLastQuestionDate(closingDate, referenceDate), 'YYYY-MM-DD')
    expect(lastQuestionDate).toEqual(format(new Date('2019-12-27'), 'YYYY-MM-DD'))
  })

  test('When closing date is on the first day of the year', () => {
    const closingDate = new Date('2020-01-01')
    const referenceDate = new Date('2019-05-23')
    const lastQuestionDate = format(getBriefLastQuestionDate(closingDate, referenceDate), 'YYYY-MM-DD')
    expect(lastQuestionDate).toEqual(format(new Date('2019-12-30'), 'YYYY-MM-DD'))
  })
})

describe('padStart', () => {
  test('When length is the same', () => expect(padStart('V', 1, '0')).toEqual('V'))
  test('When length is not the same', () => expect(padStart('V', 2, '0')).toEqual('0V'))
  test('When string is longer', () => expect(padStart('VVVVV', 2, '0')).toEqual('VVVVV'))
  test('When string is shorter', () => expect(padStart('VVVVV', 10, '0')).toEqual('00000VVVVV'))
})
