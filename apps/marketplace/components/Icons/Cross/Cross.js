import React from 'react'
import PropTypes from 'prop-types'

const Cross = props => (
  <svg
    className={props.className}
    width="19px"
    height="18px"
    viewBox="0 0 19 18"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="Seller-assessment-feedback" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g id="Group-Copy" fill={props.colour}>
        <path
          d="M14.1515931,17.5439516 L0.725882097,4.11824059 C0.140095659,3.53245415 0.140095659,2.58270668 0.725882097,1.99692024 L2.26675395,0.45604839 C2.85254039,-0.129738048 3.80228786,-0.129738048 4.38807429,0.45604839 L17.8137853,13.8817594 C18.3995718,14.4675459 18.3995718,15.4172933 17.8137853,16.0030798 L16.2729135,17.5439516 C15.687127,18.129738 14.7373796,18.129738 14.1515931,17.5439516 Z"
          id="Rectangle"
          transform="translate(9.269834, 9.000000) rotate(-630.000000) translate(-9.269834, -9.000000) "
        />
        <path
          d="M14.1746355,17.5811945 L0.688639234,4.09519825 C0.102852796,3.50941181 0.102852796,2.55966434 0.688639234,1.97387791 L2.24371161,0.418805527 C2.82949805,-0.166980911 3.77924552,-0.166980911 4.36503196,0.418805527 L17.8510282,13.9048018 C18.4368146,14.4905882 18.4368146,15.4403357 17.8510282,16.0261221 L16.2959558,17.5811945 C15.7101694,18.1669809 14.7604219,18.1669809 14.1746355,17.5811945 Z"
          id="Rectangle"
          transform="translate(9.269834, 9.000000) rotate(-360.000000) translate(-9.269834, -9.000000) "
        />
      </g>
    </g>
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
