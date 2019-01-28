import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { actions, LocalForm } from 'react-redux-form'
import BaseForm from 'shared/form/BaseForm'
import formProps from 'shared/form/formPropsSelector'
import { changeForm, loadOpportunities } from 'marketplace/actions/opportunitiesActions'
import CheckboxDetailsField from 'shared/form/CheckboxDetailsField'
import AUaccordion from '@gov.au/accordion/lib/js/react.js'
import AUheading from '@gov.au/headings/lib/js/react.js'
import styles from './Opportunities.scss'

export class OpportunitiesFiltersComponent extends BaseForm {
  constructor(props) {
    super(props)
    this.state = {
      statusAccordionOpen: props.statusAccordionOpen,
      locationAccordionOpen: props.locationAccordionOpen,
      typeAccordionOpen: props.typeAccordionOpen,
      mobileAccordionOpen: props.mobileAccordionOpen
    }
    this.handleFilterCancelClick = this.handleFilterCancelClick.bind(this)
    this.handleFilterApplyClick = this.handleFilterApplyClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleTypeFilterSubmit = this.handleTypeFilterSubmit.bind(this)
    this.formValues = {
      status: { ...this.props.opportunitiesFilterForm.status, ...props.initialFilterValues.status },
      openTo: { ...this.props.opportunitiesFilterForm.openTo, ...props.initialFilterValues.openTo },
      type: { ...this.props.opportunitiesFilterForm.type, ...props.initialFilterValues.type },
      location: { ...this.props.opportunitiesFilterForm.location, ...props.initialFilterValues.location }
    }
  }

  componentDidMount() {
    this.props.changeForm(this.formValues, { '.silent': true })
  }

  getActiveFilterCount(type) {
    let count = 0

    const typeFilterMap = {
      all: ['status', 'openTo', 'location', 'type'],
      status: ['status', 'openTo'],
      location: ['location'],
      type: ['type']
    }

    if (typeFilterMap[type]) {
      typeFilterMap[type].map(filter => {
        Object.keys(this.props.opportunitiesFilterForm[filter]).map(k => {
          if (this.props.opportunitiesFilterForm[filter][k]) {
            count += 1
          }
          return true
        })
        return true
      })
    }

    return count
  }

  changeAccordion(type, isOpen) {
    switch (type) {
      case 'location':
      case 'status':
      case 'type':
        this.setState({
            locationAccordionOpen: type == 'location' ? isOpen : false,
            statusAccordionOpen: type == 'status' ? isOpen : false,
            typeAccordionOpen: type == 'type' ? isOpen : false
        })
        break
      case 'mobile':
        this.setState({ mobileAccordionOpen: isOpen })
        break
      case 'all':
        this.setState({ statusAccordionOpen: isOpen })
        this.setState({ locationAccordionOpen: isOpen })
        this.setState({ typeAccordionOpen: isOpen })
        this.setState({ mobileAccordionOpen: isOpen })
        break
      default:
        break
    }
  }

  handleFilterCancelClick(e) {
    e.preventDefault()
    const type = e.target.getAttribute('data-type')
    switch (type) {
      case 'location':
        this.changeAccordion('location', false)
        break
      case 'status':
        this.changeAccordion('status', false)
        break
      case 'type':
        this.changeAccordion('type', false)
        break
      default:
        this.changeAccordion('all', false)
        break
    }
  }

  handleFilterApplyClick(e) {
    e.preventDefault()
    this.formDispatch(actions.submit('opportunitiesFilterForm'))
    const type = e.target.getAttribute('data-type')
    switch (type) {
      case 'location':
        this.changeAccordion('location', false)
        break
      case 'status':
        this.changeAccordion('status', false)
        break
      case 'type':
        this.changeAccordion('type', false)
        break
      default:
        this.changeAccordion('all', false)
        break
    }
  }

  handleTypeFilterSubmit() {
    this.formDispatch(actions.submit('opportunitiesFilterForm'))
  }

  handleSubmit(values) {
    this.changeAccordion('all', false)
    this.props.changeForm(values)
    this.props.getOpportunities(values)
    this.props.updateQueryString(values)
  }

  attachDispatch(dispatch) {
    this.formDispatch = dispatch
  }

  render() {
    const { model } = this.props

    const typeConvertor = {
      outcomes: 'Seek proposals and quotes',
      specialists: 'Specialists',
      atm: 'Ask the marketplace',
      training: 'Training'
    }

    return (
      <LocalForm
        model={model}
        onSubmit={this.handleSubmit}
        getDispatch={dispatch => this.attachDispatch(dispatch)}
        initialState={this.formValues}
      >
        <div className="row">
          <div className={`col-lg-offset-3 col-md-3 col-sm-12 ${styles.hideMobile}`}>
            <AUaccordion
              header={`Type ${this.getActiveFilterCount('type') > 0 ? `• ${this.getActiveFilterCount('type')}` : ''}`}
              open={this.state.typeAccordionOpen}
              onOpen={() => {
                this.changeAccordion('type', true)
              }}
              onClose={() => {
                this.changeAccordion('type', false)
              }}
            >
              <div className="au-accordion__body" id="accordion-default" aria-hidden="false">
                <div className={styles.inputGroup}>
                  <AUheading size="sm" level="3">
                    Type of opportunity
                  </AUheading>
                  {Object.keys(this.props.opportunitiesFilterForm.type).map(type => (
                    <div className={styles.checkbox} key={type}>
                      <CheckboxDetailsField
                        model={`${model}.type.${type}`}
                        id={type}
                        name={type}
                        label={typeConvertor[type]}
                        detailsModel={model}
                        messages={{}}
                      />
                    </div>
                  ))}
                </div>
                <span className={styles.cancelLink}>
                  <a href="#cancel" data-type="type" onClick={this.handleFilterCancelClick}>
                    Cancel
                  </a>
                </span>
                <span className={styles.applyFilters}>
                  <a href="#apply" data-type="type" onClick={this.handleFilterApplyClick}>
                    Apply filters
                  </a>
                </span>
                <div />
              </div>
            </AUaccordion>
          </div>
          <div className={`col-md-3 col-sm-12 ${styles.hideMobile}`}>
            <AUaccordion
              header={`Location ${
                this.getActiveFilterCount('location') > 0 ? `• ${this.getActiveFilterCount('location')}` : ''
              }`}
              open={this.state.locationAccordionOpen}
              onOpen={() => {
                this.changeAccordion('location', true)
              }}
              onClose={() => {
                this.changeAccordion('location', false)
              }}
            >
              <div className="au-accordion__body" id="accordion-default" aria-hidden="false">
                <div className={styles.inputGroup}>
                  <AUheading size="sm" level="3">
                    Location
                  </AUheading>
                  {Object.keys(this.props.opportunitiesFilterForm.location).map(location => (
                    <div className={styles.checkbox} key={location}>
                      <CheckboxDetailsField
                        model={`${model}.location.${location}`}
                        id={location}
                        name={location}
                        label={location}
                        detailsModel={model}
                        messages={{}}
                      />
                    </div>
                  ))}
                </div>
                <span className={styles.cancelLink}>
                  <a href="#cancel" data-type="location" onClick={this.handleFilterCancelClick}>
                    Cancel
                  </a>
                </span>
                <span className={styles.applyFilters}>
                  <a href="#apply" data-type="location" onClick={this.handleFilterApplyClick}>
                    Apply filters
                  </a>
                </span>
                <div />
              </div>
            </AUaccordion>
          </div>
          <div className={`col-md-3 col-sm-12 ${styles.hideMobile}`}>
            <AUaccordion
              header={`Status ${
                this.getActiveFilterCount('status') > 0 ? `• ${this.getActiveFilterCount('status')}` : ''
              }`}
              open={this.state.statusAccordionOpen}
              onOpen={() => {
                this.changeAccordion('status', true)
              }}
              onClose={() => {
                this.changeAccordion('status', false)
              }}
            >
              <div className="au-accordion__body" id="accordion-default" aria-hidden="false">
                <div className={styles.inputGroup}>
                  <AUheading size="sm" level="3">
                    Status of opportunity
                  </AUheading>
                  <div className={styles.checkbox}>
                    <CheckboxDetailsField
                      model={`${model}.status.live`}
                      id="live"
                      name="live"
                      label="Live"
                      detailsModel={model}
                      messages={{}}
                    />
                  </div>
                  <div className={styles.checkbox}>
                    <CheckboxDetailsField
                      model={`${model}.status.closed`}
                      id="closed"
                      name="closed"
                      label="Closed"
                      detailsModel={model}
                      messages={{}}
                    />
                  </div>
                  <div className={styles.checkbox}>
                    <CheckboxDetailsField
                      model={`${model}.openTo.all`}
                      id="all"
                      name="all"
                      label="Open to all sellers"
                      detailsModel={model}
                      messages={{}}
                    />
                  </div>
                </div>
                <span className={styles.cancelLink}>
                  <a href="#cancel" data-type="status" onClick={this.handleFilterCancelClick}>
                    Cancel
                  </a>
                </span>
                <span className={styles.applyFilters}>
                  <a href="#apply" data-type="status" onClick={this.handleFilterApplyClick}>
                    Apply filters
                  </a>
                </span>
                <div />
              </div>
            </AUaccordion>
          </div>
        </div>
        <div className="row">
          <div className={`col-sm-push-5 col-sm-7 col-xs-12 ${styles.filtersSectionMobile} ${styles.hideDesktop}`}>
            <AUaccordion
              header={`Filter opportunities ${
                this.getActiveFilterCount('all') > 0 ? `• ${this.getActiveFilterCount('all')}` : ''
              }`}
              open={this.state.mobileAccordionOpen}
              onOpen={() => {
                this.changeAccordion('mobile', true)
              }}
              onClose={() => {
                this.changeAccordion('mobile', false)
              }}
            >
              <div className="au-accordion__body" id="accordion-default" aria-hidden="false">
                <div className={styles.inputGroup}>
                  <AUheading size="sm" level="3">
                    Type of opportunity
                  </AUheading>
                  {Object.keys(this.props.opportunitiesFilterForm.type).map(type => (
                    <div className={styles.checkbox} key={type}>
                      <CheckboxDetailsField
                        model={`${model}.type.${type}`}
                        id={type}
                        name={type}
                        label={typeConvertor[type]}
                        detailsModel={model}
                        messages={{}}
                      />
                    </div>
                  ))}
                </div>
                <div className={styles.inputGroup}>
                  <AUheading size="sm" level="3">
                    Status of opportunity
                  </AUheading>
                  <div className={styles.checkbox}>
                    <CheckboxDetailsField
                      model={`${model}.status.live`}
                      id="live"
                      name="live"
                      label="Live"
                      detailsModel={model}
                      messages={{}}
                    />
                  </div>
                  <div className={styles.checkbox}>
                    <CheckboxDetailsField
                      model={`${model}.status.closed`}
                      id="closed"
                      name="closed"
                      label="Closed"
                      detailsModel={model}
                      messages={{}}
                    />
                  </div>
                  <div className={styles.checkbox}>
                    <CheckboxDetailsField
                      model={`${model}.openTo.all`}
                      id="all"
                      name="all"
                      label="Open to all sellers"
                      detailsModel={model}
                      messages={{}}
                    />
                  </div>
                </div>
                <div className={styles.inputGroup}>
                  <AUheading size="sm" level="3">
                    Location
                  </AUheading>
                  {Object.keys(this.props.opportunitiesFilterForm.location).map(location => (
                    <div className={styles.checkbox} key={location}>
                      <CheckboxDetailsField
                        model={`${model}.location.${location}`}
                        id={location}
                        name={location}
                        label={location}
                        detailsModel={model}
                        messages={{}}
                      />
                    </div>
                  ))}
                </div>
                <span className={styles.cancelLink}>
                  <a href="#cancel" onClick={this.handleFilterCancelClick}>
                    Cancel
                  </a>
                </span>
                <span className={styles.applyFilters}>
                  <a href="#apply" onClick={this.handleFilterApplyClick}>
                    Apply filters
                  </a>
                </span>
                <div />
              </div>
            </AUaccordion>
          </div>
        </div>
      </LocalForm>
    )
  }
}

OpportunitiesFiltersComponent.defaultProps = {
  initialFilterValues: {},
  updateQueryString: () => {}
}

OpportunitiesFiltersComponent.propTypes = {
  getOpportunities: PropTypes.func.isRequired,
  statusAccordionOpen: PropTypes.bool.isRequired,
  locationAccordionOpen: PropTypes.bool.isRequired,
  typeAccordionOpen: PropTypes.bool.isRequired,
  mobileAccordionOpen: PropTypes.bool.isRequired,
  model: PropTypes.string.isRequired,
  updateQueryString: PropTypes.func,
  initialFilterValues: PropTypes.object
}

const mapStateToProps = state => ({
  ...formProps(state, 'opportunitiesFilterForm')
})

const mapDispatchToProps = dispatch => ({
  changeForm: values => dispatch(changeForm(values)),
  getOpportunities: filters => dispatch(loadOpportunities(filters))
})

const OpportunitiesFilters = connect(mapStateToProps, mapDispatchToProps)(OpportunitiesFiltersComponent)

export default OpportunitiesFilters
