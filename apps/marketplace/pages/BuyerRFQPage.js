import React from 'react'
import ProgressFlow from 'marketplace/components/ProgressFlow/ProgressFlow'
import BuyerRFQStages from 'marketplace/components/BuyerRFQ/BuyerRFQStages'
import { rootPath } from 'marketplace/routes'

const BuyerRFQPage = () => <ProgressFlow basename={`${rootPath}/buyer-rfq`} flowStages={BuyerRFQStages} />

export default BuyerRFQPage
