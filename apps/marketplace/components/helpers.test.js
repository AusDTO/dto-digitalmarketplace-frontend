import format from 'date-fns/format'
import { getBriefLastQuestionDate } from './helpers'

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
})
