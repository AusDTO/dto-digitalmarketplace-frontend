import React from 'react'
import ReactDOM from 'react-dom'

import VerticalList, { testData } from './VerticalList'
import Textarea from './Textarea'

ReactDOM.render(
  <div>
    <Textarea limit={10} />
    <VerticalList items={testData.items} />
  </div>,
  document.getElementById('react-bundle-shared')
);
