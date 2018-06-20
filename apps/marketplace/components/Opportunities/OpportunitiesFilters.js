import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Form } from 'react-redux-form'
import BaseForm from 'shared/form/BaseForm'
import formProps from 'shared/form/formPropsSelector'
import { submitForm } from 'marketplace/actions/opportunitiesActions'
import CheckboxDetailsField from 'shared/form/CheckboxDetailsField'
import AUaccordion from '@gov.au/accordion/lib/js/react.js'
import AUheading from '@gov.au/headings/lib/js/react.js'
import TypeFilterControl from './TypeFilterControl'
import styles from './Opportunities.scss'

export class OpportunitiesFiltersComponent extends BaseForm {
  constructor(props) {
    super(props)
    this.state = {
      accordionOpen: props.accordionOpen
    }
    this.handleFilterCancelClick = this.handleFilterCancelClick.bind(this)
    this.handleFilterApplyClick = this.handleFilterApplyClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  getActiveFilterCount = (isMobile = false) => {
    let count = 0
    Object.keys(this.props.opportunitiesFilterForm.status).map(filter => {
      if (this.props.opportunitiesFilterForm.status[filter]) {
        count += 1
      }
      return true
    })
    Object.keys(this.props.opportunitiesFilterForm.openTo).map(filter => {
      if (this.props.opportunitiesFilterForm.openTo[filter]) {
        count += 1
      }
      return true
    })
    if (isMobile) {
      Object.keys(this.props.opportunitiesFilterForm.type).map(filter => {
        if (this.props.opportunitiesFilterForm.type[filter]) {
          count += 1
        }
        return true
      })
    }
    return count
  }

  openAccordion = () => {
    this.setState({ accordionOpen: true })
  }

  closeAccordion = () => {
    this.setState({ accordionOpen: false })
  }

  handleFilterCancelClick(e) {
    e.preventDefault()
    this.closeAccordion()
  }

  handleFilterApplyClick(e) {
    e.preventDefault()
    this.props.submitForm()
    this.closeAccordion()
  }

  handleSubmit(values) {
    this.closeAccordion()
    this.props.getOpportunities(values)
  }

  render() {
    const { model } = this.props
    return (
      <div>
        <Form model={model} ref={this.attachNode.bind(this)} onSubmit={this.handleSubmit}>
          <div className={`col-md-6 col-sm-12 ${styles.filtersSection} ${styles.hideMobile}`}>
            <ul className="au-link-list au-link-list--inline">
              <li className={styles.filterContainer}>
                <TypeFilterControl
                  name="Innovation"
                  filter="innovation"
                  model={`${model}.type.innovation`}
                  submitForm={this.props.submitForm}
                />
              </li>
              <li className={styles.filterContainer}>
                <TypeFilterControl
                  name="Outcomes"
                  filter="outcomes"
                  model={`${model}.type.outcomes`}
                  submitForm={this.props.submitForm}
                />
              </li>
              <li className={styles.filterContainer}>
                <TypeFilterControl
                  name="Training"
                  filter="training"
                  model={`${model}.type.training`}
                  submitForm={this.props.submitForm}
                />
              </li>
              <li className={styles.filterContainer}>
                <TypeFilterControl
                  name="Specialists"
                  filter="specialists"
                  model={`${model}.type.specialists`}
                  submitForm={this.props.submitForm}
                />
              </li>
            </ul>
          </div>
          <div className={`col-md-2 col-sm-12 ${styles.hideMobile}`}>
            <AUaccordion
              header={`Filters ${this.getActiveFilterCount() > 0 ? `• ${this.getActiveFilterCount()}` : ''}`}
              open={this.state.accordionOpen}
              onOpen={() => {
                this.openAccordion()
              }}
              onClose={() => {
                this.closeAccordion()
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
                      label="Open"
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
                </div>
                <div className={styles.inputGroup}>
                  <AUheading size="sm" level="3">
                    Open to
                  </AUheading>
                  <div className={styles.checkbox}>
                    <CheckboxDetailsField
                      model={`${model}.openTo.all`}
                      id="all"
                      name="all"
                      label="All"
                      detailsModel={model}
                      messages={{}}
                    />
                  </div>
                  <div className={styles.checkbox}>
                    <CheckboxDetailsField
                      model={`${model}.openTo.selected`}
                      id="selected"
                      name="selected"
                      label="Selected"
                      detailsModel={model}
                      messages={{}}
                    />
                  </div>
                  <div className={styles.checkbox}>
                    <CheckboxDetailsField
                      model={`${model}.openTo.one`}
                      id="one"
                      name="one"
                      label="One"
                      detailsModel={model}
                      messages={{}}
                    />
                  </div>
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
        </Form>
        <div
          className={`col-md-push-3 col-md-5 col-sm-push-3 col-sm-5 col-xs-12 ${styles.filtersSectionMobile} ${
            styles.hideDesktop
          }`}
        >
          <AUaccordion
            header={`Filter opportunities ${
              this.getActiveFilterCount(true) > 0 ? `• ${this.getActiveFilterCount(true)}` : ''
            }`}
            open={this.state.accordionOpen}
            onOpen={() => {
              this.openAccordion()
            }}
            onClose={() => {
              this.closeAccordion()
            }}
          >
            <Form model={model} onSubmit={this.handleSubmit}>
              <div className="au-accordion__body" id="accordion-default" aria-hidden="false">
                <div className={styles.inputGroup}>
                  <AUheading size="sm" level="3">
                    Type of opportunity
                  </AUheading>
                  <div className={styles.checkbox}>
                    <CheckboxDetailsField
                      model={`${model}.type.innovation`}
                      id="innovation"
                      name="innovation"
                      label="Innovation"
                      detailsModel={model}
                      messages={{}}
                    />
                  </div>
                  <div className={styles.checkbox}>
                    <CheckboxDetailsField
                      model={`${model}.type.outcomes`}
                      id="outcomes"
                      name="outcomes"
                      label="Outcomes"
                      detailsModel={model}
                      messages={{}}
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
                      label="Open"
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
                </div>
                <div className={styles.inputGroup}>
                  <AUheading size="sm" level="3">
                    Open to
                  </AUheading>
                  <div className={styles.checkbox}>
                    <CheckboxDetailsField
                      model={`${model}.openTo.all`}
                      id="all"
                      name="all"
                      label="All"
                      detailsModel={model}
                      messages={{}}
                    />
                  </div>
                  <div className={styles.checkbox}>
                    <CheckboxDetailsField
                      model={`${model}.openTo.selected`}
                      id="selected"
                      name="selected"
                      label="Selected"
                      detailsModel={model}
                      messages={{}}
                    />
                  </div>
                  <div className={styles.checkbox}>
                    <CheckboxDetailsField
                      model={`${model}.openTo.one`}
                      id="one"
                      name="one"
                      label="One"
                      detailsModel={model}
                      messages={{}}
                    />
                  </div>
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
            </Form>
          </AUaccordion>
        </div>
      </div>
    )
  }
}

OpportunitiesFiltersComponent.propTypes = {
  getOpportunities: PropTypes.func.isRequired,
  accordionOpen: PropTypes.bool.isRequired,
  model: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  ...formProps(state, 'opportunitiesFilterForm')
})

const mapDispatchToProps = dispatch => ({
  submitForm: () => dispatch(submitForm())
})

const OpportunitiesFilters = connect(mapStateToProps, mapDispatchToProps)(OpportunitiesFiltersComponent)

export default OpportunitiesFilters
