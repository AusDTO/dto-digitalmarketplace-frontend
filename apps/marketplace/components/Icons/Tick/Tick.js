import React from 'react'
import PropTypes from 'prop-types'

const Tick = props => (
  <svg className={props.className} viewBox="0 0 14 11" width="20px" height="17px" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M14 2.238a.927.927 0 0 1-.249.65l-7.243 7.838a.892.892 0 0 1-.635.274.885.885 0 0 1-.622-.274L.249 5.5A.927.927 0 0 1 0 4.85c0-.245.083-.49.249-.664l1.257-1.299a.861.861 0 0 1 .622-.274c.235 0 .456.1.622.274L5.873 6.15 11.25.274A.861.861 0 0 1 11.872 0c.235 0 .456.101.622.274l1.257 1.3a.962.962 0 0 1 .249.664z"
      fill={props.colour}
    />
  </svg>
)

Tick.defaultProps = {
  className: ''
}

Tick.propTypes = {
  colour: PropTypes.string.isRequired,
  className: PropTypes.string
}

export default Tick
