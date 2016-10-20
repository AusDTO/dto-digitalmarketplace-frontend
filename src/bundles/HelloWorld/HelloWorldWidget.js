import React from 'react'
import RegisterComponent from '../../RegisterComponent'

const HelloWorldWidget = (props) => {
  return <h1 {...props}>Hello World</h1>
}

export default new RegisterComponent({ helloworld: HelloWorldWidget })
