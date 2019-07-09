import React from 'react'
import PropTypes from 'prop-types'

const Circle = props => (
  <svg className={props.className} viewBox="0 0 24 24" width="20px" height="24px" xmlns="http://www.w3.org/2000/svg">
    <path
      fill={props.colour}
      d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm0 22C6.5 22 2 17.5 2 12S6.5 2 12 2s10 4.5 10 10-4.5 10-10 10z"
    />
  </svg>
)

Circle.defaultProps = {
  className: ''
}

Circle.propTypes = {
  colour: PropTypes.string.isRequired,
  className: PropTypes.string
}

export default Circle
