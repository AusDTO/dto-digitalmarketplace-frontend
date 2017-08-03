import formProps, { 
  getCurrentForm,
  getFormValues,
  getFormOptions,
  getOptions,
} from './formPropsSelector'


let exampleState = {
  form_options: {
    mode: 'add'
  },
  options: {
    serverRender: false
  },
  forms: {
    someForm: {
      $form: {
        valid: false
      }
    }
  },
  someForm: {
    foo: 'bar'
  }
}

test('formProps will reduce state to single object', () => {
  let expectedState = {
    mode: 'add',
    serverRender: false,
    formErrors: void 0,
    model: 'someForm',
    form: {
      valid: false
    },
    someForm: {
      foo: 'bar'
    }
  }

  expect(formProps(exampleState, 'someForm')).toEqual(expectedState)
})

test('formProps will still provide a simplified shape if it can\'t find the form in state', () => {
  let expectedState = {
    mode: 'add',
    serverRender: false,
    formErrors: void 0,
    model: 'invalidFormKey',
    form: {},
    invalidFormKey: void 0
  }

  expect(formProps(exampleState, 'invalidFormKey')).toEqual(expectedState)
})

test('getCurrentForm return values', () => {
  let exampleState = {
    forms: {
      formKey: {
        $form: {
          foo: 'bar'
        }
      }
    }
  }

  let expectedFormState = {
    foo: 'bar'
  }

  expect(getCurrentForm(exampleState, 'formKey')).toEqual(expectedFormState)
  expect(getCurrentForm(void 0, 'formKey')).toEqual({})
})

test('getFormValues return value', () => {
  expect(getFormValues(void 0, 'formKey')).toBeUndefined()
  expect(getFormValues({ 'formKey': { foo: 'bar'} }, 'formKey')).toEqual({ foo: 'bar' })
})

test('getFormOptions return value', () => {
  expect(getFormOptions(void 0)).toBeUndefined()
  expect(getFormOptions({ form_options: { foo: 'bar' }})).toEqual({ foo: 'bar' })
})

test('getOptions', () => {
  expect(getOptions(void 0)).toBeUndefined()
  expect(getOptions({ options: { foo: 'bar' }})).toEqual({ foo: 'bar' })
})