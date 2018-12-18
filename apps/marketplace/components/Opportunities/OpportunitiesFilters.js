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
import TypeFilterControl from './TypeFilterControl'
import styles from './Opportunities.scss'

export class OpportunitiesFiltersComponent extends BaseForm {
  constructor(props) {
    super(props)
    this.state = {
      statusAccordionClosed: props.statusAccordionClosed,
      locationAccordionClosed: props.locationAccordionClosed,
      mobileAccordionClosed: props.mobileAccordionClosed
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
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
      location: ['location']
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
      case 'status':
        this.setState({ statusAccordionClosed: isClosed })
        break
      case 'location':
        this.setState({ locationAccordionClosed: isClosed })
        break
      case 'mobile':
        this.setState({ mobileAccordionClosed: isClosed })
        break
      case 'all':
        this.setState({ statusAccordionClosed: isClosed })
        this.setState({ locationAccordionClosed: isClosed })
        this.setState({ mobileAccordionClosed: isClosed })
        break
      default:
        break
    }
  }

  handleTypeFilterSubmit() {
    this.formDispatch(actions.submit('opportunitiesFilterForm'))
  }

  handleCheckboxChange() {
    this.formDispatch(actions.submit('opportunitiesFilterForm'))
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
    return (
      <LocalForm
        model={model}
        onSubmit={this.handleSubmit}
        getDispatch={dispatch => this.attachDispatch(dispatch)}
        initialState={this.formValues}
      >
        <div className="row">
          <div className={`col-md-6 col-lg-offset-1 col-lg-5 col-sm-12 ${styles.filtersSection} ${styles.hideMobile}`}>
            <ul className="au-link-list au-link-list--inline">
              <li className={styles.filterContainer}>
                <TypeFilterControl
                  name="Outcomes"
                  filter="outcomes"
                  model={`${model}.type.outcomes`}
                  submitForm={this.handleTypeFilterSubmit}
                />
              </li>
              <li className={styles.filterContainer}>
                <TypeFilterControl
                  name="Training"
                  filter="training"
                  model={`${model}.type.training`}
                  submitForm={this.handleTypeFilterSubmit}
                />
              </li>
              <li className={styles.filterContainer}>
                <TypeFilterControl
                  name="Specialists"
                  filter="specialists"
                  model={`${model}.type.specialists`}
                  submitForm={this.handleTypeFilterSubmit}
                />
              </li>
            </ul>
          </div>
          <div className={`col-md-3 col-sm-12 ${styles.hideMobile}`}>
            <AUaccordion
              header={`Location ${
                this.getActiveFilterCount('location') > 0 ? `• ${this.getActiveFilterCount('location')}` : ''
              }`}
              closed
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
                        onChange={this.handleCheckboxChange}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </AUaccordion>
          </div>
          <div className={`col-md-3 col-sm-12 ${styles.hideMobile}`}>
            <AUaccordion
              header={`Status ${
                this.getActiveFilterCount('status') > 0 ? `• ${this.getActiveFilterCount('status')}` : ''
              }`}
              closed
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
                      onChange={this.handleCheckboxChange}
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
                      onChange={this.handleCheckboxChange}
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
                      onChange={this.handleCheckboxChange}
                    />
                  </div>
                </div>
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
              closed
            >
              <div className="au-accordion__body" id="accordion-default" aria-hidden="false">
                <div className={styles.inputGroup}>
                  <AUheading size="sm" level="3">
                    Type of opportunity
                  </AUheading>
                  <div className={styles.checkbox}>
                    <CheckboxDetailsField
                      model={`${model}.type.outcomes`}
                      id="outcomes"
                      name="outcomes"
                      label="Outcomes"
                      detailsModel={model}
                      messages={{}}
                      onChange={this.handleCheckboxChange}
                    />
                  </div>
                  <div className={styles.checkbox}>
                    <CheckboxDetailsField
                      model={`${model}.type.training`}
                      id="training"
                      name="training"
                      label="Training"
                      detailsModel={model}
                      messages={{}}
                      onChange={this.handleCheckboxChange}
                    />
                  </div>
                  <div className={styles.checkbox}>
                    <CheckboxDetailsField
                      model={`${model}.type.specialists`}
                      id="specialists"
                      name="specialists"
                      label="Specialists"
                      detailsModel={model}
                      messages={{}}
                      onChange={this.handleCheckboxChange}
                    />
                  </div>
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
                      onChange={this.handleCheckboxChange}
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
                      onChange={this.handleCheckboxChange}
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
                      onChange={this.handleCheckboxChange}
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
                        onChange={this.handleCheckboxChange}
                      />
                    </div>
                  ))}
                </div>
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

const OpportunitiesFilters = connect(mapStateToProps, mapDispatchToProps)(OpportunitiesFiltersComponent)

export default OpportunitiesFilters
