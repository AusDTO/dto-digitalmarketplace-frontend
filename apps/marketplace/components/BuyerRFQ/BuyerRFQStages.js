import BuyerRFQIntroductionStage from './BuyerRFQIntroductionStage'
import BuyerRFQAboutStage from './BuyerRFQAboutStage'
import BuyerRFQSelectStage from './BuyerRFQSelectStage'
import BuyerRFQAttachmentsStage from './BuyerRFQAttachmentsStage'
import BuyerRFQReviewStage from './BuyerRFQReviewStage'
import BuyerRFQClosingDateStage from './BuyerRFQClosingDateStage'

const BuyerRFQStages = [
  {
    slug: 'introduction',
    title: 'Introduction',
    component: BuyerRFQIntroductionStage
  },
  {
    slug: 'about',
    title: 'About',
    component: BuyerRFQAboutStage
  },
  {
    slug: 'select',
    title: 'Select sellers',
    component: BuyerRFQSelectStage
  },
  {
    slug: 'attachments',
    title: 'Attachments',
    component: BuyerRFQAttachmentsStage
  },
  {
    slug: 'closing',
    title: 'Closing date',
    component: BuyerRFQClosingDateStage
  },
  {
    slug: 'review',
    title: 'Review email',
    component: BuyerRFQReviewStage
  }
]

export default BuyerRFQStages
