/* eslint-disable react/no-danger */
import React from 'react'
import PropTypes from 'prop-types'

import icons from './_getIcons'

import styles from './Icon.scss'

const Icon = props => {
  const { color, size, value, className = '', ...more } = props

  const svgStyle = {}
  if (value.includes('filled')) {
    svgStyle.fill = color
  } else if (value.includes('nostroke')) {
    // do nothing
  } else {
    svgStyle.stroke = color
  }

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
        style={svgStyle}
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
