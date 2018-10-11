import { validDate } from 'marketplace/components/validators'
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
    component: BuyerRFQIntroductionStage,
    isDone: () => true
  },
  {
    slug: 'about',
    title: 'About',
    component: BuyerRFQAboutStage,
    isDone: formValues =>
      formValues.title.length > 0 && formValues.organisation.length > 0 && formValues.location.length > 0
  },
  {
    slug: 'select',
    title: 'Select sellers',
    component: BuyerRFQSelectStage,
    isDone: formValues => Object.keys(formValues.sellers).length > 0
  },
  {
    slug: 'attachments',
    title: 'Attachments',
    component: BuyerRFQAttachmentsStage,
    isDone: formValues => formValues.attachedDocumentURL.length > 0 && formValues.attachedDocumentURL.every(val => val)
  },
  {
    slug: 'closing',
    title: 'Closing date',
    component: BuyerRFQClosingDateStage,
    isDone: formValues => validDate(formValues.closedAt)
  },
  {
    slug: 'review',
    title: 'Review and publish',
    component: BuyerRFQReviewStage
  }
]

export default BuyerRFQStages
