import React from 'react'

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

export default AddSellerActions
