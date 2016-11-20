import {
  getStateForms,
  dispatchFormState,
  flattenStateForms,
  validForms
} from './helpers';

test('getStateForms with default regex', () => {
  const state = {
    someForm: {
      foo: 'bar'
    },
    badKey: 'baz',
    FormSome: 'bar'
  };

  const expectedState = {
    someForm: {
      foo: 'bar'
    }
  };

  expect(getStateForms(state)).toEqual(expectedState);
});

test('getStateForms with custom regex', () => {
  const state = {
    someForm: {
      foo: 'bar'
    },
    badKey: 'baz',
    FormSome: 'bar'
  };

  const expectedState = {
    badKey: 'baz',
    FormSome: 'bar'
  };

  expect(getStateForms(state, /^Form|Key$/)).toEqual(expectedState);
});

test('getStateForms with empty state', () => {
  expect(getStateForms({})).toEqual({});
  expect(getStateForms()).toEqual({});
});

test('dispatchFormState dispatchs and returns correct values', () => {
  let dispatch = jest.fn();
  let schemas = {
    someForm: {
      foo: '',
      baz: ''
    }
  };
  let data = {
    foo: 'bar',
    baz: 'foo'
  };

  const expectedResult = [{
    someForm: {
      foo: 'bar',
      baz: 'foo'
    }
  }]

  let result = dispatchFormState(dispatch, schemas, data);

  expect(result).toEqual(expectedResult);
  expect(dispatch).toHaveBeenCalledTimes(1);
});

test('dispatchFormState with empty schema', () => {
  const dispatch = jest.fn();
  const data = {
    foo: 'bar',
    baz: 'foo'
  };
  let result = dispatchFormState(dispatch, {}, data);
  let voidResult = dispatchFormState(dispatch, void 0, data);

  expect(result).toEqual([]);
  expect(voidResult).toEqual([]);
  expect(dispatch).toHaveBeenCalledTimes(0);
});


test('flattenStateForms', () => {
  const state = {
    firstForm: {
      foo: 'bar',
      baz: 'foo'
    },
    secondForm: {
      bar: 'baz',
      foobar: 'barfoo'
    },
    // This should be pruned
    options: {
      serverRender: false
    }
  };

  const expectedResult = {
    foo: 'bar',
    baz: 'foo',
    bar: 'baz',
    foobar: 'barfoo'
  };

  expect(flattenStateForms(state)).toEqual(expectedResult);
});

test('flattenStateForms with no state', () => {
  expect(flattenStateForms()).toEqual({});
});


test('validForms', () => {
  const state = {
    forms: {
      oneForm: {
        $form: {
          valid: true
        }
      },
      twoForm: {
        $form: {
          valid: false
        }
      },
      threeForm: {
        $form: {
          valid: true
        }
      }
    }
  }

  const expectedResult = {
    oneForm: true,
    threeForm: true
  }

  expect(validForms(state)).toEqual(expectedResult);
})