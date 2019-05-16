import React from 'react'
import PropTypes from 'prop-types'

const Cross = props => (
  <svg className={props.className} viewBox="7 6 11 11" width="20px" height="17px" xmlns="http://www.w3.org/2000/svg">
    <path
      fill={props.colour}
      d="M17 8.4L15.6 7 12 10.6 8.4 7 7 8.4l3.6 3.6L7 15.6 8.4 17l3.6-3.6 3.6 3.6 1.4-1.4-3.6-3.6z"
    />
  </svg>
)

Cross.defaultProps = {
  className: ''
}

Cross.propTypes = {
  colour: PropTypes.string.isRequired,
  className: PropTypes.string
}

export default Cross
