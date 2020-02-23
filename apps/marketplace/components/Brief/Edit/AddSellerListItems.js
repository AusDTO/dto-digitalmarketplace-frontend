import React from 'react'

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

export default AddSellerListItems
