import React from 'react';
import { mount } from 'enzyme';

import LinkInput from './LinkInput';

const preventDefault = jest.fn();
const eventMock = { preventDefault };


test('removeRow', () => {
  const rows = [ 'One', 'Two', 'Three', 'Four' ];

  const component = mount(<LinkInput name="test" rows={rows} />);

  component.instance().removeRow(2, eventMock);

  expect(preventDefault).toHaveBeenCalled();
    expect(component.state().inputs).toEqual([
        { id: 0, value: {"url": 'One'} },
        { id: 1, value: {"url": 'Two'} },
        { id: 3, value: {"url": 'Four'} }
    ]);
});

test('addRow in correct order', () => {
  const rows = [ 'One', 'Two' ];

  const component = mount(<LinkInput name="test" rows={rows} />);

  component.instance().addRow(eventMock);

  expect(preventDefault).toHaveBeenCalled();
    expect(component.state().inputs).toEqual([
        { id: 0, value: {"url": 'One'} },
        { id: 1, value: {"url": 'Two'} },
        { id: 2, value: "" }
    ]);
});

test('addRow in odd order', () => {
  const rows = [ 'Two', 'One' ];

  const component = mount(<LinkInput name="test" rows={rows} />);

  component.instance().addRow(eventMock);

  expect(preventDefault).toHaveBeenCalled();
  expect(component.state().inputs).toEqual([
    { id: 0, value: {"url": 'Two'} },
    { id: 1, value: {"url": 'One'} },
    { id: 2, value: "" }
  ]);
});


test('createRow', () => {
  const component = mount(<LinkInput name="test" />);

  expect(component.instance().createRow(1)).toEqual({ id: 1, value: '' })
  expect(component.instance().createRow(5, 'somevalue')).toEqual({ id: 5, value: 'somevalue' })
})

test('passed onChange is fired', () => {
  const onChange = jest.fn()
  const component = mount(<LinkInput name="test" onChange={onChange} defaultRows={2} />);

  component.find('input').first().simulate('change', {
    target: { value: 'One' }
  })

  expect(onChange).toHaveBeenCalled()
})

test('default onChange', () => {
  const component = mount(<LinkInput name="test" />);
  expect(component.prop('onChange')()).toBeUndefined()
  expect(component.prop('onBlur')()).toBeUndefined()
  expect(component.prop('onFocus')()).toBeUndefined()
})


test('getValues', () => {
  const rows = [ {"url": 'One'}, {"url": 'Two'} ];

  const component = mount(<LinkInput name="test" rows={rows} />);

  expect(component.instance().getValues()).toEqual([{"url": 'One'}, {"url": 'Two'}])
})

