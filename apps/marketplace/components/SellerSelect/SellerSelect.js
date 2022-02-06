import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AUtextInput from '@gov.au/text-inputs/lib/js/react.js'
import AUbutton from '@gov.au/buttons/lib/js/react.js'
import AUselect from '@gov.au/select/lib/js/react.js'
import { findSuppliers } from 'marketplace/actions/supplierActions'
import styles from './SellerSelect.scss'

const PanelCategorySelectView = props => (
  <div className={styles.categorySelect}>
    <label htmlFor={`${props.id}-category-select`}>{props.label}</label>
    <a
      href="https://marketplace1.zendesk.com/hc/en-gb/articles/360000556476-Panel-categories-and-rates"
      rel="noopener noreferrer"
      target="_blank"
    >
      {props.helpLabel}
    </a>
    {props.description &&
      <span>{props.description}</span>
    }
    <AUselect
      block
      id={`${props.id}-category-select`}
      options={props.categories}
      onChange={props.onChange}
      defaultValue={props.selectedCategory}
    />
  </div>
)

export const PanelCategorySelect = props => (
  <div className={styles.container}>
    <PanelCategorySelectView
      id={props.id}
      categories={props.categories}
      onChange={props.onChange}
      selectedCategory={props.selectedCategory}
      label={props.label}
      description={props.description}
      helpLabel={props.helpLabel}
    />
  </div>
)

PanelCategorySelect.defaultProps = {
  onChange: () => {},
  selectedCategory: '',
  label: 'Panel category',
  helpLabel: 'What you can buy in each category',
  description: ''
}

PanelCategorySelect.propTypes = {
  id: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  selectedCategory: PropTypes.string,
  label: PropTypes.string,
  description: PropTypes.string,
  helpLabel: PropTypes.string
}

const SellerSelectView = props => (
  <div className={styles.sellerSelectView}>
    <label htmlFor={props.id}>{props.label}</label>
    {props.showSellerCatalogueLink && (
      <a href="/search/sellers" rel="noopener noreferrer" target="_blank" className={styles.searchAllLink}>
        View seller catalogue
      </a>
    )}
    {typeof props.description === 'string' ? (
      <span className={styles.description}>{props.description}</span>
    ) : (
      props.description
    )}
    <AUtextInput
      id={props.id}
      placeholder={props.placeholder}
      onChange={props.handleSearchChange}
      value={props.inputValue}
      className={props.className}
      block
    />
    {props.showSearchButton && <AUbutton onClick={props.handleSearchClick}>Search</AUbutton>}
  </div>
)

const SellerSelectResultsView = props => {
  const { category } = props
  const searchUri = category ? `/search/sellers?role=${encodeURIComponent(category)}&sort_by=a-z` : '/search/sellers'

  return (
    <ul
      className={`${props.className} ${!props.noResults ? props.hasResultsClassName : ''} ${
        props.sellers.length > 3 ? props.hasManyResultsClassName : ''
      }`}
    >
      {props.noResults && props.searchFor && (
        <li>
          {props.notFoundMessage}
          <a href={searchUri} rel="noopener noreferrer" target="_blank" className={styles.searchAllLink}>
            Search sellers
          </a>
        </li>
      )}
      {props.sellers.map(seller => (
        <li key={seller.code}>
          <a href={`#${seller.code}`} onClick={e => props.handleSellerSelectClick(seller, e)}>
            {seller.name}
          </a>
        </li>
      ))}
    </ul>
  )
}

let timeoutHandle = null

export class SellerSelect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sellers: [],
      inputValue: '',
      noResults: false
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
    this.setState({
      inputValue: '',
      sellers: []
    })
  }

  handleSearchChange(e) {
    const { briefId } = this.props
    const keyword = e.target.value

    this.setState({
      inputValue: keyword,
      noResults: false
    })

    if (timeoutHandle) {
      clearTimeout(timeoutHandle)
    }

    timeoutHandle = setTimeout(() => {
      if (keyword && keyword.length >= this.props.minimumSearchChars && this.categoryIsValid()) {
        findSuppliers(keyword, this.props.selectedCategory, this.props.allSuppliers ? 'true' : '', briefId)
          .then(data => {
            const noResults = !data.sellers.length > 0
            this.setState({
              sellers: data.sellers,
              noResults
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
    const categoryData = this.props.categories.find(category => category.value === this.props.selectedCategory)
    const category = categoryData ? categoryData.text : null

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
              description={this.props.description}
              handleSearchChange={this.handleSearchChange}
              inputValue={this.state.inputValue}
              className={this.props.showSearchButton ? styles.noRightRadius : ''}
              showSearchButton={this.props.showSearchButton}
              handleSearchClick={this.handleSearchClick}
              showSellerCatalogueLink={this.props.showSellerCatalogueLink}
            />
            {this.state.inputValue.length >= this.props.minimumSearchChars && (
              <SellerSelectResultsView
                category={category}
                className={styles.selectList}
                hasResultsClassName={styles.hasResults}
                hasManyResultsClassName={styles.manyResults}
                sellers={this.state.sellers}
                noResults={this.state.noResults}
                searchFor={this.state.inputValue}
                notFoundMessage={this.props.notFoundMessage}
                handleSellerSelectClick={this.handleSellerSelectClick}
              />
            )}
          </div>
        )}
      </div>
    )
  }
}

SellerSelect.defaultProps = {
  briefId: null,
  id: 'seller-search',
  placeholder: '',
  label: '',
  description: '',
  selectedCategory: '',
  notFoundMessage: 'Seller cannot be found in this category.',
  showSelected: true,
  showSearchButton: true,
  showCategorySelect: false,
  allSuppliers: false,
  categories: [],
  minimumSearchChars: 2,
  onSellerSelect: () => {},
  onSellerCategorySelect: () => {},
  onSearch: () => {},
  showSellerCatalogueLink: false
}

SellerSelect.propTypes = {
  briefId: PropTypes.number,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  selectedCategory: PropTypes.string,
  notFoundMessage: PropTypes.string,
  showSelected: PropTypes.bool,
  showSearchButton: PropTypes.bool,
  showCategorySelect: PropTypes.bool,
  allSuppliers: PropTypes.bool,
  categories: PropTypes.array,
  minimumSearchChars: PropTypes.number,
  onSellerSelect: PropTypes.func,
  onSellerCategorySelect: PropTypes.func,
  onSearch: PropTypes.func,
  showSellerCatalogueLink: PropTypes.bool
}

export default SellerSelect
