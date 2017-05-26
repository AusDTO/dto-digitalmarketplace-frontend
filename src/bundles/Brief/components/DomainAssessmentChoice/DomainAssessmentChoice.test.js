import React from 'react';
import { MemoryRouter } from 'react-router'
import { mount } from 'enzyme';
import DomainAssessmentChoice from './DomainAssessmentChoice';
import state from './DomainAssessmentChoice.json';

describe('<DomainAssessmentChoice />', () => {
    it('should render an DomainAssessmentChoice list', () => {
        const wrapper = mount(
                <DomainAssessmentChoice {...state}/>
        );
        expect(wrapper.find('input').length).toBe(2);
    });
});