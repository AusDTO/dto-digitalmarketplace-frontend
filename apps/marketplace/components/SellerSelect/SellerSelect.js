import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AUtextInput from '@gov.au/text-inputs/lib/js/react.js'
import AUbutton from '@gov.au/buttons/lib/js/react.js'
import findSuppliers from 'marketplace/actions/supplierActions'
import styles from './SellerSelect.scss'

export class SellerSelect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sellers: [],
      inputValue: ''
    }
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleSellerSelectClick = this.handleSellerSelectClick.bind(this)
    this.handleSearchClick = this.handleSearchClick.bind(this)
  }

  handleOnChange(e) {
    const keyword = e.target.value
    this.setState({
      inputValue: keyword
    })

    if (keyword && keyword.length > 2) {
      findSuppliers(keyword)
        .then(data => {
          this.setState({
            sellers: data.sellers
          })
        })
        .catch(() => {})
    } else {
      this.setState({
        sellers: []
      })
    }
  }

  handleSellerSelectClick(seller, e) {
    e.preventDefault()
    this.setState(curState => {
      const newState = { ...curState }
      newState.sellers = []
      newState.inputValue = this.props.showSelected ? seller.name : ''
      this.props.onSellerSelect(seller)
      return newState
    })
  }

  handleSearchClick() {
    this.props.onSearch(this.state.inputValue)
  }

  render() {
    return (
      <div className={styles.container}>
        <label htmlFor={this.props.id}>Select sellers</label>
        <AUtextInput
          id={this.props.id}
          placeholder={this.props.placeholder}
          onChange={this.handleOnChange}
          value={this.state.inputValue}
          className={this.props.showSearchButton ? styles.noRightRadius : ''}
        />
        {this.props.showSearchButton && <AUbutton onClick={this.handleSearchClick}>Search</AUbutton>}
        {this.state.sellers && (
          <ul className={`${styles.selectList} ${this.state.sellers.length > 0 ? '' : styles.hide}`}>
            {this.state.sellers.map(seller => (
              <li key={seller.code}>
                <a href={`#${seller.code}`} onClick={e => this.handleSellerSelectClick(seller, e)}>
                  {seller.name}
                </a>
                {seller.panel && <span className={`${styles.badge} ${styles.panelBadge}`}>✓ Panel</span>}
                {seller.sme && <span className={`${styles.badge} ${styles.smeBadge}`}>SME</span>}
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
}

SellerSelect.defaultProps = {
  id: 'seller-search',
  placeholder: '',
  showSelected: true,
  showSearchButton: true,
  onSellerSelect: () => {},
  onSearch: () => {}
}

SellerSelect.propTypes = {
  id: PropTypes.string,
  placeholder: PropTypes.string,
  showSelected: PropTypes.bool,
  showSearchButton: PropTypes.bool,
  onSellerSelect: PropTypes.func,
  onSearch: PropTypes.func
}

export default SellerSelect
