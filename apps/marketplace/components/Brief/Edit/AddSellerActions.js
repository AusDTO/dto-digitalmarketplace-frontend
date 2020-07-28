import React from 'react'
import PropTypes from 'prop-types'

import AUlinklist from '@gov.au/link-list/lib/js/react.js'

import styles from './AddSellerActions.scss'

const AddSellerActions = props => {
  const { id, onRemoveSellerClick } = props

  return (
    <div className={styles.selectedItemActionsContainer}>
      <AUlinklist
        className={`${styles.selectedItemActions}`}
        inline
        items={[
          {
            link: '#remove',
            onClick: e => {
              e.preventDefault()
              onRemoveSellerClick(id)
            },
            text: 'Remove'
          }
        ]}
      />
    </div>
  )
}

AddSellerActions.defaultProps = {
  id: '',
  onRemoveSellerClick: () => {}
}

AddSellerActions.propTypes = {
  id: PropTypes.string.isRequired,
  onRemoveSellerClick: PropTypes.func.isRequired
}

export default AddSellerActions
