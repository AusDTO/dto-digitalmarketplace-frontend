import {
  getStateForms,
  dispatchFormState,
  flattenStateForms,
  findValidServices,
  findDirtyForms,
  pruneModel
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


test('pruneModel', () => {
    var case_studies = new Array();
    case_studies['abc-def'] = {'title': 'keep this case study', service: 'ServiceA'};
    case_studies['xyz-ijk'] = {'title': 'remove this case study', service: 'ServiceB'};
    const model = {
        case_studies: case_studies,
        services: {'ServiceA': true },
        products: [
            false,
            undefined,
            null
        ]
    };

    const expectedResult = {
        case_studies: {
            'abc-def': {'title': 'keep this case study', service: 'ServiceA'}
        },
        services: {'ServiceA': true},
        products: {}
    };

    expect(pruneModel(model)).toEqual(expectedResult);
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
    foobar: 'barfoo',
    services: {}
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

test('flattenStateForms with no state', () => {
  expect(flattenStateForms()).toEqual({ services: {} });
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


test('findDirtyForms', () => {
  const state = {
    forms: {
      oneForm: {
        $form: {
          pristine: true
        }
      },
      twoForm: {
        $form: {
          pristine: false
        }
      },
      threeForm: {
        $form: {
          pristine: true
        }
      },
      $form: {
        pristine: false
      }
    }
  }

  const expectedResult = {
    twoForm: true
  }

  expect(findDirtyForms(state)).toEqual(expectedResult);
});

test('findDirtyForms with no state', () => {
  expect(findDirtyForms()).toEqual({});
});