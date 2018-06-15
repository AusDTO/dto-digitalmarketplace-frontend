import React from 'react'
import ReactDOM from 'react-dom'
import Header from './Header'

jest.mock('react-dom')
jest.mock('shared/Icon/_getIcons')

test('Header renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Header />, div)
})
