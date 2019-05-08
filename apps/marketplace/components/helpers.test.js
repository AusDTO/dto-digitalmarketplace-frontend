import subDays from 'date-fns/sub_days'
import addDays from 'date-fns/add_days'
import format from 'date-fns/format'
import { getBriefLastQuestionDate, nextWeekDay } from './helpers'

const referenceDate = new Date('2019-03-04')

describe('getBriefLastQuestionDate', () => {
  test('When closing date is over a week away', () => {
    const closingDate = addDays(referenceDate, 9)
    const lastQuestionDate = format(getBriefLastQuestionDate(closingDate, referenceDate), 'YYYY-MM-DD')
    expect(lastQuestionDate).toEqual(format(nextWeekDay(subDays(closingDate, 2)), 'YYYY-MM-DD'))
  })

  test('When closing date is 3 days away', () => {
    const closingDate = nextWeekDay(addDays(referenceDate, 3))
    const lastQuestionDate = format(getBriefLastQuestionDate(closingDate, referenceDate), 'YYYY-MM-DD')
    expect(lastQuestionDate).toEqual(format(nextWeekDay(subDays(closingDate, 1)), 'YYYY-MM-DD'))
  })

  test('When closing date is 2 days away', () => {
    const closingDate = addDays(referenceDate, 2)
    const lastQuestionDate = format(getBriefLastQuestionDate(closingDate, referenceDate), 'YYYY-MM-DD')
    if (
      format(referenceDate, 'YYYY-MM-DD') !== format(lastQuestionDate, 'YYYY-MM-DD') &&
      format(closingDate, 'YYY-MM-DD') > format(lastQuestionDate, 'YYYY-MM-DD')
    ) {
      expect(lastQuestionDate).toEqual(format(nextWeekDay(subDays(closingDate, 1)), 'YYYY-MM-DD'))
    }
  })
})
