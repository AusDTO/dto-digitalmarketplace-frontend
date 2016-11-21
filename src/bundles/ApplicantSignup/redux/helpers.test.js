import {
  getStateForms,
  dispatchFormState,
  flattenStateForms,
  findValidServices,
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
  expect(dispatch).toHaveBeenCalledTimes(2);
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

test('flattenStateForms with services', () => {
  const state = {
    firstForm: {
      services: {
        service1: true,
        service2: true,
        service3: false,
        service4: true
      }
    }
  };

  const expectedResult = {
    services: {
      service1: true,
      service2: true,
      service4: true
    }
  };

  expect(flattenStateForms(state)).toEqual(expectedResult);
})

test('flattenStateForms with pricing', () => {
  const state = {
    firstForm: {
      services: {
        service1: true,
        service3: true
      }
    },
    secondForm: {
      pricing: {
        service1: {
          minPrice: 40,
          maxPrice: 50
        },
        service2: {
          minPrice: 40,
          maxPrice: 70
        },
        service3: {
          minPrice: 100,
          maxPrice: 120
        }
      }
    }
  };

  const expectedResult = {
    services: {
      service1: true,
      service3: true,
    },
    pricing: {
      service1: {
        minPrice: 40,
        maxPrice: 50
      },
      service3: {
        minPrice: 100,
        maxPrice: 120
      }
    }
  };

  expect(flattenStateForms(state)).toEqual(expectedResult);
})

test('flattenStateForms with no state', () => {
  expect(flattenStateForms()).toEqual({});
});

test('findValidServices will remove top level key with no valid services', () => {

  const domains = {
    "User research": false,
    "Content development (copywriting, translation, illustration, photography, video and animation)": true,
    "Content management": true
  };

  const expectedDomains = {
    "Content development (copywriting, translation, illustration, photography, video and animation)": true,
    "Content management": true
  };

  expect(findValidServices(domains)).toEqual(expectedDomains);
});

test('findValidServices will remove only invalid services', () => {

  const domains = {
    "User research": false,
    "Random Key": true,
    "Content development (copywriting, translation, illustration, photography, video and animation)": true,
    "Content management": true
  };

  const expectedDomains = {
    "Random Key": true,
    "Content development (copywriting, translation, illustration, photography, video and animation)": true,
    "Content management": true
  };

  expect(findValidServices(domains)).toEqual(expectedDomains);
});


test('validForms', () => {
  const state = {
    forms: {
      oneForm: {
        $form: {
          valid: true,
          touched: true,
          submitted: true
        }
      },
      twoForm: {
        $form: {
          valid: false,
          touched: true,
          submitted: true
        }
      },
      threeForm: {
        $form: {
          valid: true,
          touched: true,
          submitted: true
        }
      }
    }
  }

  const expectedResult = {
    oneForm: true,
    threeForm: true
  }

  expect(validForms(state)).toEqual(expectedResult);
});

test('validForms with no state', () => {
  expect(validForms()).toEqual({});
});