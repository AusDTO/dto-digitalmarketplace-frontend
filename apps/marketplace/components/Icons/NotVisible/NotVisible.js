import React from 'react'
import PropTypes from 'prop-types'

const NotVisible = props => (
  <svg width="34" height="22" xmlns="http://www.w3.org/2000/svg" className={props.className}>
    <defs>
      <path d="M0 .091h21.363v15.765H0z" />
    </defs>
    <g fill="none">
      <g transform="translate(0 1.224)">
        <mask id="b" fill="#fff">
          <path d="M0 .091h21.363v15.765H0z" />
        </mask>
        <path
          d="M6.565 15.856l1.99-2.03c-2.211-1.43-3.94-3.068-4.89-4.057 1.24-1.293 3.801-3.694 7.044-5.288a8.342 8.342 0 0 0-1.875 5.29 8.39 8.39 0 0 0 .61 3.149l9.64-9.829L21.363.768C19.869.322 18.39.091 16.953.091c-3.72 0-7.71 1.526-11.538 4.414C2.572 6.649.81 8.782.737 8.87l-.737.9.737.899c.074.09 1.835 2.222 4.678 4.366.382.288.765.559 1.15.82"
          fill={props.colour}
          mask="url(#b)"
        />
      </g>
      <path
        d="M33.168 10.095c-.073-.09-1.835-2.222-4.677-4.367a27.6 27.6 0 0 0-1.15-.82l-1.99 2.03c2.21 1.43 3.937 3.067 4.889 4.056-1.242 1.291-3.802 3.686-7.035 5.28a8.34 8.34 0 0 0 1.866-5.28 8.396 8.396 0 0 0-.61-3.15L13.864 18.65l-1.32 1.347c1.493.446 2.971.677 4.409.677 3.72 0 7.71-1.526 11.538-4.414 2.842-2.144 4.604-4.277 4.677-4.366l.738-.9-.738-.9z"
        fill={props.colour}
      />
      <path fill={props.colour} d="M6.409 19.899L25.827.1l1.85 1.886-19.42 19.799z" />
    </g>
  </svg>
)

NotVisible.defaultProps = {
  className: ''
}

NotVisible.propTypes = {
  colour: PropTypes.string.isRequired,
  className: PropTypes.string
}

export default NotVisible
