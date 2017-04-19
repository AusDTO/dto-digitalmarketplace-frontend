import React from 'react';
import {mount} from 'enzyme';

import Card from './Card';

test('Displays card with no product badge', () => {

    const props = {
        title: "Result Title",
        link: "http://google.com",
        badges: {'sme': true},
        description: "Result description",
        products: {},
        services: {},
        supplier: {
            'name': 'supplier name',
            'profile_url': 'www.profileurl.com',
            'supplier_url': 'www.supplierurl.com'
        },
        pricing: 'www.pricingurl.com',
        case_study_service: 'case study service'
    }

    const component = mount(
        <Card {...props} />
    );

    expect(
        component.find('.badge__product').length
    ).toEqual(0);
});

test('Displays card with product badge', () => {

    const props = {
        title: "Result Title",
        link: "http://google.com",
        badges: {'sme': true},
        description: "Result description",
        products: {"prodA": {}},
        services: {},
        supplier: {
            'name': 'supplier name',
            'profile_url': 'www.profileurl.com',
            'supplier_url': 'www.supplierurl.com'
        },
        pricing: 'www.pricingurl.com',
        case_study_service: 'case study service'
    }

    const component = mount(
        <Card {...props} />
    );

    expect(
        Object.keys(component.find('Badges').props('badges').badges).length
    ).toEqual(2);
    expect(
        component.find('.badge__product').length
    ).toEqual(1);
});