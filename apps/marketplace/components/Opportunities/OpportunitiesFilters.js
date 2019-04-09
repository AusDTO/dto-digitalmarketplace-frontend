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
      statusAccordionClosed: props.statusAccordionClosed,
      locationAccordionClosed: props.locationAccordionClosed,
      typeAccordionClosed: props.typeAccordionClosed,
      mobileAccordionClosed: props.mobileAccordionClosed
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleFilterApplyClick = this.handleFilterApplyClick.bind(this)
    this.handleFilterCancelClick = this.handleFilterCancelClick.bind(this)
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

  changeAccordion(type, isClosed) {
    switch (type) {
      case 'location':
        this.setState({ locationAccordionClosed: isClosed })
        break
      case 'status':
        this.setState({ statusAccordionClosed: isClosed })
        break
      case 'type':
        this.setState({ typeAccordionClosed: isClosed })
        break
      case 'mobile':
        this.setState({ mobileAccordionClosed: isClosed })
        break
      case 'all':
        this.setState({ statusAccordionClosed: isClosed })
        this.setState({ locationAccordionClosed: isClosed })
        this.setState({ typeAccordionClosed: isClosed })
        this.setState({ mobileAccordionClosed: isClosed })
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
        this.changeAccordion('location', true)
        break
      case 'status':
        this.changeAccordion('status', true)
        break
      case 'type':
        this.changeAccordion('type', true)
        break
      default:
        this.changeAccordion('all', true)
        break
    }
  }

  handleFilterApplyClick(e) {
    e.preventDefault()
    this.formDispatch(actions.submit('opportunitiesFilterForm'))
    const type = e.target.getAttribute('data-type')
    switch (type) {
      case 'location':
        this.changeAccordion('location', true)
        break
      case 'status':
        this.changeAccordion('status', true)
        break
      case 'type':
        this.changeAccordion('type', true)
        break
      default:
        this.changeAccordion('all', true)
        break
    }
  }

  handleSubmit(values) {
    this.changeAccordion('all', true)
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
      atm: 'Ask the market',
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
              closed={this.state.typeAccordionClosed}
              onOpen={() => {
                this.changeAccordion('type', false)
              }}
              onClose={() => {
                this.changeAccordion('type', true)
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
                <br />
              </div>
            </AUaccordion>
          </div>
          <div className={`col-md-3 col-sm-12 ${styles.hideMobile}`}>
            <AUaccordion
              header={`Location ${
                this.getActiveFilterCount('location') > 0 ? `• ${this.getActiveFilterCount('location')}` : ''
              }`}
              closed={this.state.locationAccordionClosed}
              onOpen={() => {
                this.changeAccordion('location', false)
              }}
              onClose={() => {
                this.changeAccordion('location', true)
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
                <br />
              </div>
            </AUaccordion>
          </div>
          <div className={`col-md-3 col-sm-12 ${styles.hideMobile}`}>
            <AUaccordion
              header={`Status ${
                this.getActiveFilterCount('status') > 0 ? `• ${this.getActiveFilterCount('status')}` : ''
              }`}
              closed={this.state.statusAccordionClosed}
              onOpen={() => {
                this.changeAccordion('status', false)
              }}
              onClose={() => {
                this.changeAccordion('status', true)
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
              <br />
            </AUaccordion>
          </div>
        </div>
        <div className="row">
          <div className={`col-sm-push-5 col-sm-7 col-xs-12 ${styles.filtersSectionMobile} ${styles.hideDesktop}`}>
            <AUaccordion
              header={`Filter opportunities ${
                this.getActiveFilterCount('all') > 0 ? `• ${this.getActiveFilterCount('all')}` : ''
              }`}
              closed={this.state.mobileAccordionClosed}
              onOpen={() => {
                this.changeAccordion('mobile', false)
              }}
              onClose={() => {
                this.changeAccordion('mobile', true)
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
                <br />
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
  statusAccordionClosed: PropTypes.bool.isRequired,
  locationAccordionClosed: PropTypes.bool.isRequired,
  typeAccordionClosed: PropTypes.bool.isRequired,
  mobileAccordionClosed: PropTypes.bool.isRequired,
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

const OpportunitiesFilters = connect(
  mapStateToProps,
  mapDispatchToProps
)(OpportunitiesFiltersComponent)

export default OpportunitiesFilters
