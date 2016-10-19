import React from 'react'
import ReactDOM from 'react-dom'

import VerticalList, { testData } from './VerticalList'
import Textarea from './Textarea'
import MultiInput from './MultiInput'

const rows = [
  { id: 0, value: 'One' },
  { id: 1, value: 'Two' },
  { id: 2, value: 'Three' },
  { id: 3, value: 'Four' },
]

ReactDOM.render(
  <div>
    <form>
      <MultiInput rows={rows} />
      <Textarea limit={10} name="shared" />
    </form>
    <VerticalList items={testData.items} />
  </div>,
  document.getElementById('react-bundle-shared')
);
