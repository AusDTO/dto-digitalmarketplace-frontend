export const getSellersToInvite = (brief, edits) => Object.keys(edits.sellers).filter(code => !(code in brief.sellers))

export const itemWasEdited = (item, edit) => edit !== '' && edit !== item

export const hasEdits = (brief, edits) => {
  if (
    itemWasEdited(brief.title, edits.title) ||
    getSellersToInvite(brief, edits).length > 0 ||
    itemWasEdited(brief.dates.closing_date, edits.closingDate) ||
    itemWasEdited(brief.summary, edits.summary)
  ) {
    return true
  }

  return false
}
