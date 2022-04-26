import React from 'react'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'

const BuyICTPage = () => {
  window.location.replace('/')
  return (
    <React.Fragment>
      <LoadingIndicatorFullPage />
    </React.Fragment>
  )
}

export default BuyICTPage
