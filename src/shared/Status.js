import React from 'react'
import { Route } from 'react-router'

const Status = ({ code, children }) => (
  <Route render={({ staticContext }) => {
    if (staticContext)
      staticContext.status = code
    return children
  }}/>
)

export default Status
