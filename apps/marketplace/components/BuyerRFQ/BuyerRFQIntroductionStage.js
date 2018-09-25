import React from 'react'
import AUheadings from '@gov.au/headings/lib/js/react.js'

const BuyerRFQIntroductionStage = () => (
  <div>
    <AUheadings level="1" size="xl">
      What you are requesting
    </AUheadings>
    <p>Sellers you select will provide:</p>
    <ul>
      <li>A written proposal.</li>
      <li>A proposal of project costing.</li>
    </ul>
    <p>
      We will email these sellers requesting this documentation and{' '}
      <strong>your name, number and email will not be disclosed.</strong>
    </p>
  </div>
)

export default BuyerRFQIntroductionStage
