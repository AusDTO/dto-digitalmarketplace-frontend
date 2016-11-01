import { mapErrorMessages, getForm, getErrorMessages, getModelPath } from '../errorMessageSelector';

test('mapErrorMessages produces to the correct list from a simple state', () => {
  const messages = {
    'modelName.title': {
      'required': 'Title is required'
    }
  };

  const form = {
    title: {
      valid: false,
      errors: {
        required: true
      }
    }
  };

  const errorMap = [
    { id: 'title', messages: ['Title is required'] }
  ];

  expect(mapErrorMessages(form, messages, 'modelName')).toEqual(errorMap);
});

test('mapErrorMessages filters out $form fields correctly', () => {
  const messages = {
    'modelName.$form': {
      'required': 'form is required'
    }
  };

  const form = {
    $form: {
      valid: false,
      errors: {
        required: true
      }
    }
  };

  expect(mapErrorMessages(form, messages, 'modelName')).toEqual([]);
});

test('mapErrorMessages maps errors from fields that have array values', () => {
  const messages = {
    'modelName.names': {
      'required': 'You need to specify at least one name!'
    }
  };

  const form = {
    names: {
      '$form': {
        errors: {
          errors: {
            required: true
          }
        },
        valid: false
      }
    }
  };

  const errorMap = [
    { id: 'names', messages: ['You need to specify at least one name!'] }
  ];

  expect(mapErrorMessages(form, messages, 'modelName')).toEqual(errorMap);
});

test('mapErrorMessages returns an empty array if the corresponding message doesnt exist', () => {
  const form = {
    title: {
      valid: false,
      errors: {
        required: true
      }
    }
  };

  expect(mapErrorMessages(form, {}, 'modelName')).toEqual([]);
});

test('mapErrorMessages returns an empty array if the form doesnt exist', () => {
  expect(mapErrorMessages(void 0)).toEqual([]);
});

test('getForm return values', () => {
  const state = {
    forms: {
      modelName: {
        foo: 'bar'
      }
    }
  };

  expect(getForm(state, 'modelName')).toEqual({ foo: 'bar' });
  expect(getForm(state, 'nonExistingKey')).toBeUndefined();
});

test('getErrorMessages return values', () => {
  const state = {
    errorMessage: {
      foo: 'bar'
    }
  };

  expect(getErrorMessages(state)).toEqual({ foo: 'bar' });
  expect(getErrorMessages()).toBeUndefined();
});

test('getModelPath return values', () => {
  expect(getModelPath(void 0, 'modelName')).toEqual('modelName');
  expect(getModelPath()).toBeUndefined();
})

