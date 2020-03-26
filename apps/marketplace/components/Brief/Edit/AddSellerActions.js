import React from 'react'
import PropTypes from 'prop-types'

import AUlinklist from '@gov.au/link-list/lib/js/react.js'

import itemSelectStyles from 'marketplace/components/ItemSelect/SelectedItems.scss'

const AddSellerActions = props => {
  const { id, onRemoveSellerClick } = props

  return (
    <AUlinklist
      className={itemSelectStyles.selectedItemActions}
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
