import reducer, {
  MESSAGE,
  REMOVE,
  addMessage,
  removeMessage
} from '../errorMessage';

test('addMessage action', () => {
  const expectedAction = {
    type: MESSAGE,
    key: 'errorKey',
    value: 'Some error text'
  };
  expect(addMessage('errorKey', 'Some error text'));
});

test('removeMessage action', () => {
  const expectedAction = {
    type: REMOVE,
    key: 'errorKey'
  };
  expect(removeMessage('errorKey'));
});

test('reducer should return initial state', () => {
  expect(reducer()).toEqual({})
});

test('reducer should add message to state', () => {
  expect(reducer({}, {
    type: MESSAGE,
    key: 'errorKey',
    value: 'errorKey error value'
  })).toEqual({
    errorKey: 'errorKey error value'
  });
});

test('reducer should remove message from state', () => {
  const initialState = {
    key1: 'ErrorOne',
    key2: 'ErrorTwo',
    key3: 'ErrorThree',
    key4: 'ErrorFour'
  }
  expect(reducer(initialState, {
    type: REMOVE,
    key: 'key3',
  })).toEqual({
    key1: 'ErrorOne',
    key2: 'ErrorTwo',
    key4: 'ErrorFour'
  });
});