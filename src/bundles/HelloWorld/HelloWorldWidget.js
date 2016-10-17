import React from 'react'
import Registry from '../../registry'


const HelloWorldWidget = (props, _context) => {
  return <h1 {...props}>Hello World</h1>
}


Registry.add({
  helloworld: HelloWorldWidget
})

export default Registry
