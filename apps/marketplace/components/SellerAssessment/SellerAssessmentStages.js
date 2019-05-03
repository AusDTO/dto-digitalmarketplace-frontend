import SellerAssessmentIntroductionStage from './SellerAssessmentIntroductionStage'

const SellerAssessmentStages = [
  {
    slug: 'introduction',
    title: 'Introduction',
    component: SellerAssessmentIntroductionStage,
    isDone: () => true
  }
]

export default SellerAssessmentStages
