import React from 'react'

import styles from '../../marketplace/main.scss'

const CharacterCounter = props => {
  const { limit, value } = props
  const remaining = value ? limit - value.length : limit

  return (
    <span className={`${styles['right-aligned-block']} ${styles['sub-text']}`}>
      {remaining} character{remaining === 1 ? '' : 's'} left
    </span>
  )
}

export default CharacterCounter
