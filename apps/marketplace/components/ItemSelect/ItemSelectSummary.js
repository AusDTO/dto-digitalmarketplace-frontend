import React from 'react'

import AUheading from '@gov.au/headings/lib/js/react.js'

const ItemSelectSummary = props => {
  const { summaryHeading } = props

  return (
    <div>
      <AUheading level="2" size="sm">
        {summaryHeading}
      </AUheading>
    </div>
  )
}

export default ItemSelectSummary
