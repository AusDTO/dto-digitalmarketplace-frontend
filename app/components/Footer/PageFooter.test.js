jest.mock('react-dom')

import React from 'react'
import ReactDOM from 'react-dom'
import { Footer } from './PageFooter'

test('Footer renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Footer />, div)
})
