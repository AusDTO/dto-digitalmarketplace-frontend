import React from 'react'
import PropTypes from 'prop-types'

const AddSellerListItems = props => {
  const { onSellerClick, sellers } = props

  return sellers.map(seller => (
    <li key={seller.code}>
      <a
        href={`#${seller.code}`}
        onClick={e => {
          e.preventDefault()
          onSellerClick(seller.code, seller.name)
        }}
      >
        {seller.name}
      </a>
    </li>
  ))
}

AddSellerListItems.defaultProps = {
  onSellerClick: () => {},
  sellers: []
}

AddSellerListItems.propTypes = {
  onSellerClick: PropTypes.func.isRequired,
  sellers: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired
}

export default AddSellerListItems
