import React from 'react'
import PropTypes from 'prop-types'

const FinishProfile = ({ onClick }) =>
  <div>
    <h1>Profile changes saved!</h1>

    <a href="/sellers">Back to dashboard</a>
  </div>

FinishProfile.defaultProps = {
  onClick: () => {}
}

FinishProfile.propTypes = {
  onClick: PropTypes.func
}

export default FinishProfile
