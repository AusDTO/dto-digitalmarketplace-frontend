import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import SellerDashboard from './SellerDashboard'

Enzyme.configure({ adapter: new Adapter() })

test('Displays list of responses on dashboard', () => {
  const props = {
    items: [
      {
        closed_at: '2018-02-15T16:19:19.268849+00:00',
        framework: 'Digital professionals',
        id: 550,
        is_downloaded: true,
        name: 'User Researcher/User Experience (UX) Designer',
        response_date: '2017-08-24T03:44:13.976404+00:00'
      },
      {
        closed_at: '2018-02-20T16:19:19.268849+00:00',
        framework: 'Digital professionals',
        id: 557,
        is_downloaded: false,
        name: 'Technical Security Policy Experts - Multiple',
        response_date: '2017-08-09T02:44:04.860937+00:00'
      },
      {
        closed_at: '2018-02-21T16:19:19.268849+00:00',
        framework: 'Digital professionals',
        id: 361,
        is_downloaded: false,
        name: 'User Researcher and Designer',
        response_date: '2017-05-25T06:52:34.794405+00:00'
      }
    ],
    supplier: {
      code: 426,
      name: 'test supplier'
    }
  }

  const component = mount(<SellerDashboard {...props} />)

  //expect(component).toMatchSnapshot()
})

test('Displays empty message when no responses', () => {
  const props = {
    items: [],
    supplier: {
      code: 426,
      name: 'test supplier'
    }
  }

  const component = mount(<SellerDashboard {...props} />)
  expect(component).toMatchSnapshot()
})
