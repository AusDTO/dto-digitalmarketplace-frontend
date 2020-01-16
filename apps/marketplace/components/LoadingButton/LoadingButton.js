/**
 * LoadingButton.js
 *
 * Wraps the loading indicator in a tag with the .btn--loading class
 */

import React from 'react'
import PropTypes from 'prop-types'
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator'
import styles from './LoadingButton.scss'

function LoadingButton(props) {
  return (
    <div className={`${props.className} au-btn ${styles.loadingButton}`} disabled>
      {props.text}
      <LoadingIndicator isLoadingButton />
    </div>
  )
}

LoadingButton.defaultProps = {
  text: 'Loading'
}

LoadingButton.propTypes = {
  text: PropTypes.string
}

export default LoadingButton
