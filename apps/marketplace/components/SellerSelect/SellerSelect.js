import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AUtextInput from '@gov.au/text-inputs/lib/js/react.js'
import AUbutton from '@gov.au/buttons/lib/js/react.js'
import findSuppliers from 'marketplace/actions/supplierActions'
import styles from './SellerSelect.scss'

const SellerSelectView = props => (
  <div>
    <label htmlFor={props.id}>Select sellers</label>
    <AUtextInput
      id={props.id}
      placeholder={props.placeholder}
      onChange={props.handleOnChange}
      value={props.inputValue}
      className={props.className}
    />
    {props.showSearchButton && <AUbutton onClick={props.handleSearchClick}>Search</AUbutton>}
  </div>
)

const SellerSelectResultsView = props => (
  <ul className={props.className}>
    {props.sellers.map(seller => (
      <li key={seller.code}>
        <a href={`#${seller.code}`} onClick={e => props.handleSellerSelectClick(seller, e)}>
          {seller.name}
        </a>
        {seller.panel && <span className={props.panelBadgeClassName}>✓ Panel</span>}
        {seller.sme && <span className={props.smeBadgeClassName}>SME</span>}
      </li>
    ))}
  </ul>
)

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
        <SellerSelectView
          id={this.props.id}
          placeholder={this.props.placeholder}
          handleOnChange={this.handleOnChange}
          inputValue={this.state.inputValue}
          className={this.props.showSearchButton ? styles.noRightRadius : ''}
          showSearchButton={this.props.showSearchButton}
          handleSearchClick={this.handleSearchClick}
        />
        <SellerSelectResultsView
          className={`${styles.selectList} ${this.state.sellers.length > 0 ? '' : styles.hide}`}
          sellers={this.state.sellers}
          handleSellerSelectClick={this.handleSellerSelectClick}
          panelBadgeClassName={`${styles.badge} ${styles.panelBadge}`}
          smeBadgeClassName={`${styles.badge} ${styles.smeBadge}`}
        />
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
