import SellerEditIntroductionStage from './SellerEditIntroductionStage'
import SellerEditRepresentativeStage from './SellerEditRepresentativeStage'
import SellerEditReviewStage from './SellerEditReviewStage'

const SellerEditStages = [
  // {
  //   slug: 'introduction',
  //   title: 'Introduction',
  //   component: SellerEditIntroductionStage,
  //   isDone: () => true
  // },
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
