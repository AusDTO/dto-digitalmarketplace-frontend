import React from 'react'
import ReactDOM from 'react-dom'

import VerticalList, { testData } from './VerticalList'
import Textarea from './Textarea'
import MultiInput from './MultiInput'

const rows = [ 'One', 'Two', 'Three', 'Fourth Item' ];

ReactDOM.render(
  <div>
    <form>
      <MultiInput name="test" rows={rows} />
      <Textarea limit={10} name="shared" />
    </form>
    <VerticalList items={testData.items} />
  </div>,
  document.getElementById('react-bundle-shared')
);
