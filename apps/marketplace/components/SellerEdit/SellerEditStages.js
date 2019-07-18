import SellerEditRepresentativeStage from './SellerEditRepresentativeStage'
import SellerEditReviewStage, { done as reviewDone } from './SellerEditReviewStage'

const SellerEditStages = [
  {
    slug: 'representative',
    title: 'Representative',
    component: SellerEditRepresentativeStage,
    isDone: () => true
  },
  {
    slug: 'declaration',
    title: 'Declaration',
    component: SellerEditReviewStage,
    isDone: reviewDone
  }
]

export default SellerEditStages
