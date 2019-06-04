import SellerEditRepresentativeStage from './SellerEditRepresentativeStage'
import SellerEditReviewStage from './SellerEditReviewStage'

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
    isDone: () => true
  }
]

export default SellerEditStages
