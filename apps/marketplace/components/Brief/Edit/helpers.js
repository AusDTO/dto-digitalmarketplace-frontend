export const getSellersToInvite = (brief, edits) => Object.keys(edits.sellers).filter(code => !(code in brief.sellers))

export const getAllDocuments = brief => {
  const documents = []
  if (brief.attachments) {
    documents.push(...brief.attachments)
  }
  if (brief.requirementsDocument) {
    documents.push(...brief.requirementsDocument)
  }
  if (brief.responseTemplate) {
    documents.push(...brief.responseTemplate)
  }
  return documents.filter(x => x)
}

export const documentsWasEdited = (brief, edits) => {
  const briefDocs = getAllDocuments(brief)
  const editDocs = getAllDocuments(edits)
  if (editDocs.length === 0) {
    return false
  }
  if (briefDocs.length !== editDocs.length) {
    return true
  }
  let edited = false
  briefDocs.map(document => {
    if (!editDocs.includes(document)) {
      edited = true
    }
    return true
  })
  editDocs.map(document => {
    if (!briefDocs.includes(document)) {
      edited = true
    }
    return true
  })

  return edited
}

export const itemWasEdited = (item, edit) => edit !== '' && edit !== item

export const hasEdits = (brief, edits) => {
  if (
    itemWasEdited(brief.title, edits.title) ||
    getSellersToInvite(brief, edits).length > 0 ||
    itemWasEdited(brief.dates.closing_date, edits.closingDate) ||
    documentsWasEdited(brief, edits)
  ) {
    return true
  }

  return false
}
