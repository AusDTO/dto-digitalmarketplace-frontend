import React from 'react'
import PropTypes from 'prop-types'

import styles from '../../marketplace/main.scss'

const CharacterCounter = props => {
  const { limit, value } = props

  let remaining = value ? limit - value.length : limit
  remaining = remaining >= 0 ? remaining : 0

  return (
    <span className={`${styles.rightAlignedBlock} ${styles.subText}`}>
      {remaining} character{remaining === 1 ? '' : 's'} left
    </span>
  )
}

CharacterCounter.defaultProps = {
  limit: 100,
  value: ''
}

CharacterCounter.propTypes = {
  limit: PropTypes.number.isRequired,
  value: PropTypes.string
}

export default CharacterCounter
