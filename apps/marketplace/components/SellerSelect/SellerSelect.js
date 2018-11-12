import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AUtextInput from '@gov.au/text-inputs/lib/js/react.js'
import AUbutton from '@gov.au/buttons/lib/js/react.js'
import AUselect from '@gov.au/select/lib/js/react.js'
import findSuppliers from 'marketplace/actions/supplierActions'
import styles from './SellerSelect.scss'

const PanelCategorySelectView = props => (
  <div className={styles.categorySelect}>
    <label htmlFor={`${props.id}-category-select`}>Panel category</label>
    <a href="https://marketplace1.zendesk.com/hc/en-gb/articles/115011271567-What-you-can-buy" rel="external">
      What you can buy in each category
    </a>
    <AUselect
      block
      id={`${props.id}-category-select`}
      options={props.categories}
      onChange={props.onChange}
      defaultValue={props.selectedCategory}
    />
  </div>
)

const SellerSelectView = props => (
  <div>
    <label htmlFor={props.id}>{props.label}</label>
    <AUtextInput
      id={props.id}
      placeholder={props.placeholder}
      onChange={props.handleSearchChange}
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
      </li>
    ))}
  </ul>
)

let timeoutHandle = null

export class SellerSelect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sellers: [],
      inputValue: ''
    }
    this.handleCategoryChange = this.handleCategoryChange.bind(this)
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handleSellerSelectClick = this.handleSellerSelectClick.bind(this)
    this.handleSearchClick = this.handleSearchClick.bind(this)
  }

  categoryIsValid() {
    return (this.props.showCategorySelect && this.props.selectedCategory) || !this.props.showCategorySelect
  }

  handleCategoryChange(e) {
    this.props.onSellerCategorySelect(e.target.value)
  }

  handleSearchChange(e) {
    const keyword = e.target.value
    this.setState({
      inputValue: keyword
    })

    if (timeoutHandle) {
      clearTimeout(timeoutHandle)
    }

    timeoutHandle = setTimeout(() => {
      if (keyword && keyword.length > 2 && this.categoryIsValid()) {
        findSuppliers(keyword, this.props.selectedCategory)
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
    }, 500)
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
        {this.props.showCategorySelect && (
          <PanelCategorySelectView
            id={this.props.id}
            categories={this.props.categories}
            onChange={this.handleCategoryChange}
            selectedCategory={this.props.selectedCategory}
          />
        )}
        {this.categoryIsValid() && (
          <div>
            <SellerSelectView
              id={this.props.id}
              placeholder={this.props.placeholder}
              label={this.props.label}
              handleSearchChange={this.handleSearchChange}
              inputValue={this.state.inputValue}
              className={this.props.showSearchButton ? styles.noRightRadius : ''}
              showSearchButton={this.props.showSearchButton}
              handleSearchClick={this.handleSearchClick}
            />
            <SellerSelectResultsView
              className={`${styles.selectList} ${this.state.sellers.length > 0 ? '' : styles.hide}`}
              sellers={this.state.sellers}
              handleSellerSelectClick={this.handleSellerSelectClick}
            />
          </div>
        )}
      </div>
    )
  }
}

SellerSelect.defaultProps = {
  id: 'seller-search',
  placeholder: '',
  label: '',
  selectedCategory: '',
  showSelected: true,
  showSearchButton: true,
  showCategorySelect: false,
  categories: [],
  onSellerSelect: () => {},
  onSellerCategorySelect: () => {},
  onSearch: () => {}
}

SellerSelect.propTypes = {
  id: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  selectedCategory: PropTypes.string,
  showSelected: PropTypes.bool,
  showSearchButton: PropTypes.bool,
  showCategorySelect: PropTypes.bool,
  categories: PropTypes.array,
  onSellerSelect: PropTypes.func,
  onSellerCategorySelect: PropTypes.func,
  onSearch: PropTypes.func
}

export default SellerSelect
