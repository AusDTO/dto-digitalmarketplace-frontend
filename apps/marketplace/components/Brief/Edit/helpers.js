import format from 'date-fns/format'

export const getSellersToInvite = (brief, edits) => Object.keys(edits.sellers).filter(code => !(code in brief.sellers))

export const itemWasEdited = (item, edit) => edit !== '' && edit !== item

export const hasEdits = (brief, edits) => {
  if (
    itemWasEdited(brief.title, edits.title) ||
    getSellersToInvite(brief, edits).length > 0 ||
    itemWasEdited(brief.summary, edits.summary) ||
    itemWasEdited(format(new Date(brief.dates.closing_time), 'YYYY-MM-DD'), edits.closingDate)
  ) {
    return true
  }

  return false
}
