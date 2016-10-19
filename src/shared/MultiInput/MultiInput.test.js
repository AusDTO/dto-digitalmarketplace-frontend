import React from 'react';
import { mount } from 'enzyme';

import MultiInput from './MultiInput';

const preventDefault = jest.fn();
const eventMock = { preventDefault };


test('removeRow', () => {
  const rows = [
    { id: 0, value: 'One' },
    { id: 1, value: 'Two' },
    { id: 2, value: 'Three' },
    { id: 3, value: 'Four' },
  ];

  const component = mount(<MultiInput name="test" rows={rows} />);

  component.instance().removeRow(2, eventMock);

  expect(preventDefault).toHaveBeenCalled();
  expect(component.state().inputs).toEqual([
    { id: 0, value: 'One' },
    { id: 1, value: 'Two' },
    { id: 3, value: 'Four' },
  ]);
});

test('addRow in correct order', () => {
  const rows = [
    { id: 0, value: 'One' },
    { id: 1, value: 'Two' },
  ];

  const component = mount(<MultiInput name="test" rows={rows} />);

  component.instance().addRow(eventMock);

  expect(preventDefault).toHaveBeenCalled();
  expect(component.state().inputs).toEqual([
    { id: 0, value: 'One' },
    { id: 1, value: 'Two' },
    { id: 2, value: '' }
  ]);
});

test('addRow in odd order', () => {
  const rows = [
    { id: 1, value: 'Two' },
    { id: 0, value: 'One' },
  ];

  const component = mount(<MultiInput name="test" rows={rows} />);

  component.instance().addRow(eventMock);

  expect(preventDefault).toHaveBeenCalled();
  expect(component.state().inputs).toEqual([
    { id: 1, value: 'Two' },
    { id: 0, value: 'One' },
    { id: 2, value: '' }
  ]);
});


test('emptyRow', () => {
  const component = mount(<MultiInput name="test" />);

  expect(component.instance().emptyRow(1)).toEqual({ id: 1, value: '' })
  expect(component.instance().emptyRow(5, 'somevalue')).toEqual({ id: 5, value: 'somevalue' })
})

test('passed onChange is fired', () => {
  const onChange = jest.fn()
  const component = mount(<MultiInput name="test" onChange={onChange} defaultRows={2} />);

  component.find('input').first().simulate('change', {
    target: { value: 'One' }
  })

  expect(onChange).toHaveBeenCalled()
  expect(onChange).toHaveBeenLastCalledWith(['One']);
})

test('default onChange', () => {
  const component = mount(<MultiInput name="test" />);
  expect(component.prop('onChange')()).toBeUndefined()
  expect(component.prop('onBlur')()).toBeUndefined()
  expect(component.prop('onFocus')()).toBeUndefined()
})


test('getValues', () => {
  const rows = [
    { id: 0, value: 'One' },
    { id: 1, value: 'Two' },
  ];

  const component = mount(<MultiInput name="test" rows={rows} />);

  expect(component.instance().getValues()).toEqual(['One', 'Two'])
})

