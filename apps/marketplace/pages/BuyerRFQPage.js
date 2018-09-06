import React from 'react'
import ProgressFlow from 'marketplace/components/ProgressFlow/ProgressFlow'
import BuyerRFQStages from 'marketplace/components/BuyerRFQ/BuyerRFQStages'
import BuyerRFQModel from 'marketplace/components/BuyerRFQ/BuyerRFQModel'
import { rootPath } from 'marketplace/routes'

const BuyerRFQPage = () => (
  <ProgressFlow model={BuyerRFQModel} basename={`${rootPath}/buyer-rfq`} flowStages={BuyerRFQStages} />
)

export default BuyerRFQPage
