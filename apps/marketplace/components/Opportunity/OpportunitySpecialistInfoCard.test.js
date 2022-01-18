import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import OpportunitySpecialistInfoCard from './OpportunitySpecialistInfoCard'

Enzyme.configure({ adapter: new Adapter() })
jest.mock('shared/Icon/_getIcons')

describe('OpportunitySpecialistInfoCard', () => {
  test('shows single candidate can be submitted', () => {
    expect(
      mount(
        OpportunitySpecialistInfoCard({
          id: 'test-1',
          closingDate: '',
          briefId: '1',
          briefLot: 'specialist',
          briefStatus: 'not draft',
          loggedIn: false,
          isOpen: false,
          category: 'software',
          sellerCategory: 'software',
          numberOfSuppliers: 1,
          sellersInvited: 1,
          sellersApplied: 1
        })
      ).text()
    ).toEqual('1seller invited1candidate submittedThis opportunity has closed.')
  })

  test('shows seller opportunity closed', () => {
    expect(
      mount(
        OpportunitySpecialistInfoCard({
          id: 'test-1',
          closingDate: '',
          briefId: '1',
          briefLot: 'specialist',
          briefStatus: 'not draft',
          loggedIn: false,
          isOpen: false,
          category: 'software',
          sellerCategory: 'software',
          numberOfSuppliers: 6,
          sellersInvited: 10,
          sellersApplied: 0
        })
      ).text()
    ).toEqual('10sellers invited0candidates submittedThis opportunity has closed.')
  })

  test('shows seller invited', () => {
    expect(
      mount(
        OpportunitySpecialistInfoCard({
          closingDate: '',
          briefId: '1',
          briefLot: 'specialist',
          briefStatus: 'not draft',
          loggedIn: false,
          isOpen: true,
          category: 'software',
          sellerCategory: 'software',
          isOpenToAll: false,
          numberOfSuppliers: 6,
          sellersInvited: 1,
          sellersApplied: 0
        })
      ).text()
    ).toEqual(
      '1seller invited0candidates submittedSellers can submit up to 6 candidates for this role.You must be signed in, invited to respond and have indicated that you provide ICT Labour Hire services.Login'
    )
  })

  test('opportunity is not open to all', () => {
    expect(
      mount(
        OpportunitySpecialistInfoCard({
          closingDate: '',
          briefId: '1',
          briefLot: 'specialist',
          briefStatus: 'not draft',
          loggedIn: false,
          isOpen: true,
          category: 'software',
          sellerCategory: 'software',
          isOpenToAll: false,
          numberOfSuppliers: 6,
          sellersInvited: 10,
          sellersApplied: 1
        })
      ).text()
    ).toEqual(
      '10sellers invited1candidate submittedSellers can submit up to 6 candidates for this role.You must be signed in, invited to respond and have indicated that you provide ICT Labour Hire services.Login'
    )
  })

  test('brief is open to all', () => {
    expect(
      mount(
        OpportunitySpecialistInfoCard({
          closingDate: '',
          briefId: '1',
          briefLot: 'specialist',
          briefStatus: 'not draft',
          loggedIn: false,
          isOpen: true,
          category: 'software',
          sellerCategory: 'software',
          isOpenToAll: true,
          numberOfSuppliers: 5,
          sellersInvited: 10
        })
      ).text()
    ).toEqual(
      'candidates submittedSellers can submit up to 5 candidates for this role.You must be signed in and have indicated that you provide ICT Labour Hire services.How to respondLogin'
    )
  })

  test('able to apply with no responses', () => {
    expect(
      mount(
        OpportunitySpecialistInfoCard({
          closingDate: '',
          briefId: '1',
          briefLot: 'specialist',
          briefStatus: 'not draft',
          loggedIn: true,
          isOpen: true,
          category: 'software',
          sellerCategory: 'software',
          isOpenToAll: true,
          isApprovedSeller: true,
          canRespond: true,
          isInvited: true,
          hasResponded: false,
          isAssessedForCategory: true,
          numberOfSuppliers: 6,
          sellerResponses: 0,
          hasSignedCurrentAgreement: true
        })
      ).text()
    ).toEqual(
      'candidates submittedYou can submit up to 6 candidates before the opportunity closes.Apply for opportunity'
    )
  })

  test('able to apply with one response', () => {
    expect(
      mount(
        OpportunitySpecialistInfoCard({
          closingDate: '',
          briefId: '1',
          briefLot: 'specialist',
          briefStatus: 'not draft',
          loggedIn: true,
          isOpen: true,
          category: 'software',
          sellerCategory: 'software',
          isOpenToAll: true,
          isApprovedSeller: true,
          canRespond: true,
          isInvited: true,
          hasResponded: false,
          isAssessedForCategory: true,
          numberOfSuppliers: 6,
          sellerResponses: 1,
          hasSignedCurrentAgreement: true
        })
      ).text()
    ).toEqual(
      'candidates submittedYou can submit up to 6 candidates before the opportunity closes.Edit or submit candidates'
    )
  })

  test('able to apply with multiple responses', () => {
    expect(
      mount(
        OpportunitySpecialistInfoCard({
          closingDate: '',
          briefId: '1',
          briefLot: 'specialist',
          briefStatus: 'not draft',
          loggedIn: true,
          isOpen: true,
          category: 'software',
          sellerCategory: 'software',
          isOpenToAll: true,
          isApprovedSeller: true,
          canRespond: true,
          isInvited: true,
          hasResponded: false,
          isAssessedForCategory: true,
          numberOfSuppliers: 6,
          sellerResponses: 3,
          hasSignedCurrentAgreement: true
        })
      ).text()
    ).toEqual(
      'candidates submittedYou can submit up to 6 candidates before the opportunity closes.Edit or submit candidates'
    )
  })

  test('not able to apply because not logged in', () => {
    expect(
      mount(
        OpportunitySpecialistInfoCard({
          closingDate: '',
          briefId: '1',
          briefLot: 'specialist',
          briefStatus: 'not draft',
          loggedIn: false,
          isOpen: true,
          category: 'software',
          sellerCategory: 'software',
          isOpenToAll: true,
          isApprovedSeller: false,
          canRespond: false,
          isInvited: false,
          isAssessedForCategory: false,
          numberOfSuppliers: 6,
          sellerResponses: 0,
          hasSignedCurrentAgreement: true
        })
      ).text()
    ).toEqual(
      'candidates submittedSellers can submit up to 6 candidates for this role.You must be signed in and have indicated that you provide ICT Labour Hire services.How to respondLogin'
    )
  })

  test('not able to apply because max responses', () => {
    expect(
      mount(
        OpportunitySpecialistInfoCard({
          closingDate: '',
          briefId: '1',
          briefLot: 'specialist',
          briefStatus: 'not draft',
          loggedIn: true,
          isOpen: true,
          category: 'software',
          sellerCategory: 'software',
          isOpenToAll: true,
          isApprovedSeller: true,
          canRespond: true,
          isInvited: true,
          hasResponded: true,
          isAssessedForCategory: true,
          numberOfSuppliers: 6,
          sellerResponses: 6,
          hasSignedCurrentAgreement: true
        })
      ).text()
    ).toEqual(
      'candidates submittedYou can submit up to 6 candidates before the opportunity closes.Edit or submit candidates'
    )
  })

  test('not able to apply because seller is applicant', () => {
    expect(
      mount(
        OpportunitySpecialistInfoCard({
          closingDate: '',
          briefId: '1',
          briefLot: 'specialist',
          briefStatus: 'not draft',
          loggedIn: true,
          isOpen: true,
          category: 'software',
          sellerCategory: 'software',
          isApplicant: true,
          isOpenToAll: true,
          isApprovedSeller: false,
          canRespond: false,
          isInvited: false,
          hasResponded: false,
          isAssessedForCategory: false,
          numberOfSuppliers: 6,
          sellerResponses: 0,
          hasSignedCurrentAgreement: true
        })
      ).text()
    ).toEqual(
      'candidates submittedSellers can submit up to 6 candidates for this role.You must complete your profile and indicate you are both a consultancy and a recruiter to be able to apply for this opportunity.Continue application'
    )
  })

  test('not able to apply because seller is applicant and waiting for assessment', () => {
    expect(
      mount(
        OpportunitySpecialistInfoCard({
          closingDate: '',
          briefId: '1',
          briefLot: 'specialist',
          briefStatus: 'not draft',
          loggedIn: true,
          isOpen: true,
          category: 'software',
          sellerCategory: 'software',
          isApplicant: true,
          isAwaitingApplicationAssessment: true,
          isOpenToAll: true,
          isApprovedSeller: false,
          canRespond: false,
          isInvited: false,
          hasResponded: false,
          isAssessedForCategory: false,
          numberOfSuppliers: 6,
          sellerResponses: 0,
          hasSignedCurrentAgreement: true
        })
      ).text()
    ).toEqual(
      'candidates submittedSellers can submit up to 6 candidates for this role.You must complete your profile and indicate you are both a consultancy and a recruiter to be able to apply for this opportunity. Your application is currently being assessed.'
    )
  })

  test('not able to apply because seller is applicant and not waiting for assessment', () => {
    expect(
      mount(
        OpportunitySpecialistInfoCard({
          closingDate: '',
          briefId: '1',
          briefLot: 'specialist',
          briefStatus: 'not draft',
          loggedIn: true,
          isOpen: true,
          category: 'software',
          sellerCategory: 'software',
          isApplicant: true,
          isAwaitingApplicationAssessment: false,
          isOpenToAll: true,
          numberOfSuppliers: 6,
          sellerResponses: 0,
          hasSignedCurrentAgreement: true
        })
      ).text()
    ).toEqual(
      'candidates submittedSellers can submit up to 6 candidates for this role.You must complete your profile and indicate you are both a consultancy and a recruiter to be able to apply for this opportunity.Continue application'
    )
  })

  test('not able to apply because seller does not have approved domain', () => {
    expect(
      mount(
        OpportunitySpecialistInfoCard({
          closingDate: '',
          briefId: '1',
          briefLot: 'specialist',
          briefStatus: 'not draft',
          loggedIn: true,
          isOpen: true,
          category: 'software',
          sellerCategory: 'software',
          isApprovedSeller: true,
          canRespond: true,
          isInvited: true,
          hasResponded: false,
          isAssessedForCategory: false,
          hasChosenBriefCategory: true,
          isOpenToAll: true,
          numberOfSuppliers: 6,
          sellerResponses: 0,
          hasSignedCurrentAgreement: true
        })
      ).text()
    ).toEqual(
      'candidates submittedSellers can submit up to 6 candidates for this role.Only sellers assessed and approved by the Marketplace in "software" can apply.Request assessment'
    )
  })

  test('not able to apply because seller does not have approved domain and waiting for assessment', () => {
    expect(
      mount(
        OpportunitySpecialistInfoCard({
          closingDate: '',
          briefId: '1',
          briefLot: 'specialist',
          briefStatus: 'not draft',
          loggedIn: true,
          isOpen: true,
          category: 'software',
          sellerCategory: 'software',
          isApprovedSeller: true,
          canRespond: true,
          isInvited: true,
          hasResponded: false,
          isAssessedForCategory: false,
          hasChosenBriefCategory: true,
          isAwaitingDomainAssessment: true,
          isOpenToAll: true,
          numberOfSuppliers: 6,
          sellerResponses: 0,
          hasSignedCurrentAgreement: true
        })
      ).text()
    ).toEqual(
      'candidates submittedSellers can submit up to 6 candidates for this role.Only sellers assessed and approved by the Marketplace in "software" can apply. Your application for this category is currently being assessed.'
    )
  })

  test('not able to apply because seller has errors in their profile', () => {
    expect(
      mount(
        OpportunitySpecialistInfoCard({
          closingDate: '',
          briefId: '1',
          briefLot: 'specialist',
          briefStatus: 'not draft',
          loggedIn: true,
          isOpen: true,
          category: 'software',
          sellerCategory: 'software',
          isApprovedSeller: true,
          canRespond: true,
          isInvited: true,
          hasResponded: false,
          isAssessedForCategory: true,
          hasChosenBriefCategory: true,
          hasSupplierErrors: true,
          isOpenToAll: true,
          numberOfSuppliers: 6,
          sellerResponses: 0,
          hasSignedCurrentAgreement: true
        })
      ).text()
    ).toEqual(
      'candidates submittedYou can submit up to 6 candidates before the opportunity closes.There is at least one error in your profile. You must update your profile before you can apply for this opportunity.Update profile'
    )
  })
})
