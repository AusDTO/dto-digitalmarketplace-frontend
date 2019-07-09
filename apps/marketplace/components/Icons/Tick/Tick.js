import React from 'react'
import PropTypes from 'prop-types'

const Tick = props => (
  <svg
    className={props.className}
    width="21px"
    height="16px"
    viewBox="0 0 21 16"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g stroke="none" strokeWidth="1" fill={props.colour} fillRule="evenodd">
      <g id="01-Failed-criteria" transform="translate(-92.000000, -212.000000)" fill={props.colour} fillRule="nonzero">
        <path
          d="M112.383929,214.196429 C112.63393,214.44643 112.758929,214.749998 112.758929,215.107143 C112.758929,215.464287 112.63393,215.767856 112.383929,216.017857 L100.866071,227.535714 C100.61607,227.785716 100.312502,227.910714 99.9553571,227.910714 C99.5982125,227.910714 99.2946441,227.785716 99.0446429,227.535714 L92.375,220.866071 C92.1249988,220.61607 92,220.312502 92,219.955357 C92,219.598212 92.1249988,219.294644 92.375,219.044643 L94.1964286,217.223214 C94.4464298,216.973213 94.7499982,216.848214 95.1071429,216.848214 C95.4642875,216.848214 95.7678559,216.973213 96.0178571,217.223214 L99.9553571,221.174107 L108.741071,212.375 C108.991073,212.124999 109.294641,212 109.651786,212 C110.00893,212 110.312499,212.124999 110.5625,212.375 L112.383929,214.196429 Z"
          id="tick"
        />
      </g>
    </g>
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
