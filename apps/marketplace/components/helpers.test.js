import addDays from 'date-fns/add_days'
import format from 'date-fns/format'
import { getBriefLastQuestionDate, nextWeekDay } from './helpers'

const now = new Date()

describe('getBriefLastQuestionDate', () => {
  test('When closing date is over a week away', () => {
    const closingDate = addDays(now, 9)
    const lastQuestionDate = format(getBriefLastQuestionDate(closingDate), 'YYYY-MM-DD')
    expect(lastQuestionDate).toEqual(format(nextWeekDay(addDays(now, 5)), 'YYYY-MM-DD'))
  })

  test('When closing date is between 2 and 5 days away', () => {
    const closingDate = nextWeekDay(addDays(now, 3))
    const lastQuestionDate = format(getBriefLastQuestionDate(closingDate), 'YYYY-MM-DD')
    console.log(closingDate, getBriefLastQuestionDate(closingDate), nextWeekDay(addDays(now, 2)))
    expect(lastQuestionDate).toEqual(format(nextWeekDay(addDays(now, 2)), 'YYYY-MM-DD'))
  })

  test('When closing date is 2 days away', () => {
    const closingDate = addDays(now, 2)
    const lastQuestionDate = format(getBriefLastQuestionDate(closingDate), 'YYYY-MM-DD')
    if (
      format(now, 'YYYY-MM-DD') !== format(lastQuestionDate, 'YYYY-MM-DD') &&
      format(closingDate, 'YYY-MM-DD') > format(lastQuestionDate, 'YYYY-MM-DD')
    ) {
      expect(lastQuestionDate).toEqual(format(nextWeekDay(addDays(now, 1)), 'YYYY-MM-DD'))
    }
  })
})
