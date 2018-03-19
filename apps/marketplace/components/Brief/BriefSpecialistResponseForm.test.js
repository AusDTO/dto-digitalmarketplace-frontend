import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Provider } from 'react-redux'
import configureStore from 'marketplace/store'
import BriefSpecialistResponseForm from './BriefSpecialistResponseForm'

Enzyme.configure({ adapter: new Adapter() })

const store = configureStore()
test('BriefSpecialistResponseForm renders', () => {
  const tree = shallow(
    <Provider store={store}>
      <BriefSpecialistResponseForm />
    </Provider>
  )

  expect(tree).toMatchSnapshot()
})
