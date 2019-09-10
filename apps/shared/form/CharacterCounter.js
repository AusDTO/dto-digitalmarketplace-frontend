import React from 'react'

import styles from '../../marketplace/main.scss'

const CharacterCounter = props => {
  const { limit, value } = props

  let remaining = value ? limit - value.length : limit
  remaining = remaining >= 0 ? remaining : 0

  return (
    <span className={`${styles['right-aligned-block']} ${styles['sub-text']}`}>
      {remaining} character{remaining === 1 ? '' : 's'} left
    </span>
  )
}

export default CharacterCounter
