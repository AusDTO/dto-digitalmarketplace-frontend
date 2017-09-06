import { mapErrorMessages, getForms, getErrorMessages, getModelPath } from './errorMessageSelector'

test('mapErrorMessages produces to the correct list from a simple state', () => {
  const messages = {
    'modelName.title': {
      required: 'Title is required'
    }
  }

  const form = {
    modelName: {
      title: {
        valid: false,
        errors: {
          required: true
        }
      }
    }
  }

  const errorMap = [{ id: 'title', messages: ['Title is required'] }]

  expect(mapErrorMessages(form, messages, 'modelName')).toEqual(errorMap)
})

it('mapErrorMessages produces to the correct list from a nested state', () => {
  const messages = {
    'modelName.title': {
      required: 'Title is required'
    },
    'modelName.nested.role': {
      required: 'Role is required'
    },
    'modelName.nested.name': {
      required: 'Name is required'
    }
  }

  const forms = {
    modelName: {
      title: {
        valid: false,
        errors: {
          required: true
        }
      },
      nested: {
        role: {
          valid: false,
          errors: {
            required: true
          }
        },
        name: {
          valid: true
        }
      }
    }
  }

  const errorMap = [{ id: 'title', messages: ['Title is required'] }, { id: 'role', messages: ['Role is required'] }]

  expect(mapErrorMessages(forms, messages, 'modelName')).toEqual(errorMap)
})

test('mapErrorMessages filters out $form fields correctly', () => {
  const messages = {
    'modelName.$form': {
      required: 'form is required'
    }
  }

  const form = {
    modelName: {
      $form: {
        valid: false,
        errors: {
          required: true
        }
      }
    }
  }

  expect(mapErrorMessages(form, messages, 'modelName')).toEqual([])
})

test('mapErrorMessages maps errors from fields that have array values', () => {
  const messages = {
    'modelName.names': {
      required: 'You need to specify at least one name!'
    }
  }

  const form = {
    modelName: {
      names: {
        $form: {
          errors: {
            errors: {
              required: true
            }
          },
          valid: false
        }
      }
    }
  }

  const errorMap = [{ id: 'names', messages: ['You need to specify at least one name!'] }]

  expect(mapErrorMessages(form, messages, 'modelName')).toEqual(errorMap)
})

test('mapErrorMessages returns an empty array if the corresponding message doesnt exist', () => {
  const form = {
    title: {
      valid: false,
      errors: {
        required: true
      }
    }
  }

  expect(mapErrorMessages(form, {}, 'modelName')).toEqual([])
})

test('mapErrorMessages returns an empty array if the form doesnt exist', () => {
  expect(mapErrorMessages(undefined)).toEqual([])
})

test('mapErrorMessages gets errors for an array set', () => {
  const form = {
    modelName: {
      arrayProp: {
        $form: {
          errors: true
        }
      }
    }
  }

  const messages = {
    'modelName.arrayProp': {
      arrayProp: 'You must provide a value for at least one item!'
    }
  }

  const errorMap = [
    {
      id: 'arrayProp',
      messages: ['You must provide a value for at least one item!']
    }
  ]

  expect(mapErrorMessages(form, messages, 'modelName')).toEqual(errorMap)
})

test('mapErrorMessages gets errors with mulitple validation on field only one triggered.', () => {
  const messages = {
    'modelName.title': {
      required: 'Title is required',
      limitText: 'Title has exceeded the word limit.'
    }
  }

  const forms = {
    modelName: {
      title: {
        valid: false,
        errors: {
          required: false,
          limitText: true
        }
      }
    }
  }

  const errorMap = [{ id: 'title', messages: ['Title has exceeded the word limit.'] }]

  expect(mapErrorMessages(forms, messages, 'modelName')).toEqual(errorMap)
})

test('getForms return values', () => {
  const state = {
    forms: {
      modelName: {
        foo: 'bar'
      }
    }
  }

  expect(getForms(state)).toEqual({ modelName: { foo: 'bar' } })
  expect(getForms({})).toBeUndefined()
})

test('getErrorMessages return values', () => {
  const state = {
    errorMessage: {
      foo: 'bar'
    }
  }

  expect(getErrorMessages(state)).toEqual({ foo: 'bar' })
  expect(getErrorMessages()).toBeUndefined()
})

test('getModelPath return values', () => {
  expect(getModelPath(undefined, 'modelName')).toEqual('modelName')
  expect(getModelPath()).toBeUndefined()
})
