import React from 'react'
import PropTypes from 'prop-types'
import styles from './SellerNotify.scss'

const SellerNotifySellerList = props =>
  <ul className={styles.sellerList}>
    {props.sellers.map(seller =>
      <li key={seller.supplier_code}>
        {seller.contact_name}, {seller.supplier_name}
      </li>
    )}
  </ul>

SellerNotifySellerList.propTypes = {
  sellers: PropTypes.array.isRequired
}

export default SellerNotifySellerList
