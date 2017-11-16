import React from 'react'
import PropTypes from 'prop-types'

import icons from './_getIcons'

const Icon = props => {
  let { size, value, ...more } = props
  delete more.className
  delete more.style

  if (!icons[value]) {
    return null
  }

  return (
    <div className="icon">
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
