import React from 'react'
import PropTypes from 'prop-types'

import icons from './_getIcons'

const Icon = props => {
  let { color, size, value, ...more } = props
  delete more.className
  delete more.style

  let divStyle = {
    display: 'inline-block',
    height: size,
    width: size
  }

  let svgStyle = {}
  if (value.includes('filled')) {
    svgStyle.fill = color
  } else if (value.includes('nostroke')) {
    //do nothing
  } else {
    svgStyle.stroke = color
  }

  if (!icons[value]) {
    return null
  }

  return (
    <div style={divStyle} className="icon">
      <svg {...more} viewBox="0 0 24 24" style={svgStyle} dangerouslySetInnerHTML={{ __html: icons[value] }} />
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
