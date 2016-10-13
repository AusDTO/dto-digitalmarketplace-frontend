import React from 'react'
import ReactDOM from 'react-dom'

import VerticalList, { testData } from './VerticalList'

ReactDOM.render(
  <div>
    <VerticalList items={testData.items} />
  </div>,
  document.getElementById('react-bundle-shared')
);
