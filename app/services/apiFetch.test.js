jest.mock('whatwg-fetch')

import api from './apiFetch'

test('default fetch return values with route', () => {
  const fetchMock = jest.fn()
  global.fetch = fetchMock
  
  api('/route')

  expect(fetchMock).toHaveBeenCalledTimes(1)
  expect(fetchMock.mock.calls[fetchMock.mock.calls.length - 1][0]).toBe('/route')
  expect(fetchMock).toBeCalledWith('/route', {
    credentials: 'same-origin'
  })
})

test('passing custom headers and body', () => {
  const fetchMock = jest.fn()
  global.fetch = fetchMock

  const options = {
    headers: {
      'X-Custom-Header': 'FooBar'
    },
    body: JSON.stringify({ foo: 'bar' })
  }

  api('/route2', options)

  expect(fetchMock).toHaveBeenCalledTimes(1)
  expect(fetchMock).toBeCalledWith('/route2', {
    credentials: 'same-origin',
    headers: {
      'X-Custom-Header': 'FooBar'
    },
    body: '{"foo":"bar"}'
  })

})