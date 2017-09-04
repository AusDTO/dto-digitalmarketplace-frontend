import React from 'react'
import ReactDOM from 'react-dom'
import { Banner } from './Banner'

jest.mock('react-dom')

test('Banner renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Banner />, div)
})
