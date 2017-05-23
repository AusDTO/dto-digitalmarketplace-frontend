jest.mock('../../../../shared/Icon/_getIcons');

import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import ApplicationPreview, {ApplicationPreviewClass} from './ApplicationPreview';
import createStore from '../../redux/create'
import sampleState from './ApplicationPreview.json'

describe('<ApplicationPreview />', () => {
  it('should render new applicant text', () => {
  const store = createStore({application: {
    services: ['service1'],
    assessed_domains: ['service2'],
    case_studies: []
  }
  });
    const wrapper = mount(
    <Provider store={store}>
        <ApplicationPreview />
      </Provider>
    );

    const body = wrapper.find('ApplicationPreview').prop('body');
    expect(body['unassessed']).toContain('0');
    expect(body['assessed']).toContain('service2');
  });
});

test('ApplicationPreview renders with props', () => {
  const state = Object.assign({}, sampleState)
  const privateInfo = {disclosures: false}
   const component = renderer.create(
     <ApplicationPreviewClass
       body={state.application}
       privateInfo={privateInfo}
     />
   )
   let tree = component.toJSON()
   expect(tree).toMatchSnapshot()
 })