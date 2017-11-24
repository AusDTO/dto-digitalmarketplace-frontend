/* eslint-disable react/no-danger */
import React from 'react'
import PropTypes from 'prop-types'

import icons from './_getIcons'

import styles from './Icon.scss'

const Icon = props => {
  const { size, value, className = '', ...more } = props

  if (!icons[value]) {
    return null
  }

  return (
    <div className={`${styles.icon} ${className}`}>
      <svg
        height={size}
        width={size}
        {...more}
        viewBox="0 0 24 24"
        dangerouslySetInnerHTML={{ __html: icons[value] }}
      />
    </div>
  )
}

Icon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  value: PropTypes.string.isRequired
}

Icon.defaultProps = {
  color: '#000',
  size: 24
}

export default Icon
