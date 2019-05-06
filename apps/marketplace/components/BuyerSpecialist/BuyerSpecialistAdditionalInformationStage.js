import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { actions, Form } from 'react-redux-form'
import formProps from 'shared/form/formPropsSelector'
import FilesInput from 'shared/form/FilesInput'
import Textfield from 'shared/form/Textfield'
import dmapi from 'marketplace/services/apiClient'
import AUheadings from '@gov.au/headings/lib/js/react.js'
import { AUcallout } from '@gov.au/callout/lib/js/react.js'
import format from 'date-fns/format'
import addDays from 'date-fns/add_days'
import range from 'lodash/range'
import { required, validPhoneNumber, validDate, dateIs2DaysInFuture } from 'marketplace/components/validators'
import ErrorAlert from 'marketplace/components/BuyerBriefFlow/ErrorAlert'
import DateControl from 'marketplace/components/BuyerBriefFlow/DateControl'
import styles from './BuyerSpecialistAdditionalInformationStage.scss'

const requiredContactNumber = v => required(v.contactNumber)
const contactNumberFormat = v => validPhoneNumber(v.contactNumber)
const requiredClosedAt = v => required(v.closedAt)
const closedAtIsValid = v => validDate(v.closedAt)
const closedAtIs2DaysInFuture = v => dateIs2DaysInFuture(v.closedAt)

export const done = v =>
  requiredContactNumber(v) &&
  contactNumberFormat(v) &&
  requiredClosedAt(v) &&
  closedAtIsValid(v) &&
  closedAtIs2DaysInFuture(v)

export class BuyerSpecialistRequirementsStage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fileCount: 1
    }
    this.handleDateChange = this.handleDateChange.bind(this)
  }

  componentWillMount() {
    if (!this.props[this.props.model].closedAt) {
      const date = addDays(new Date(), 7)
      this.props.setDate(format(date, 'YYYY-MM-DD'))
    }
  }

  componentDidMount() {
    this.updateFileCountFromProps()
  }

  componentDidUpdate() {
    this.updateFileCountFromProps()
  }

  handleDateChange(date) {
    this.props.setDate(`${date.year}-${date.month}-${date.day}`)
  }

  updateFileCountFromProps() {
    if (this.state.fileCount < this.props[this.props.model].attachments.length) {
      this.setState({
        fileCount: this.props[this.props.model].attachments.length
      })
    }
  }

  addFileField() {
    this.setState(curState => {
      const newState = { ...curState }
      newState.fileCount += 1
      return newState
    })
  }

  render() {
    const { model } = this.props
    return (
      <Form
        model={model}
        validators={{
          '': {
            requiredContactNumber,
            contactNumberFormat,
            requiredClosedAt,
            closedAtIsValid,
            closedAtIs2DaysInFuture
          }
        }}
        onSubmit={this.props.onSubmit}
        onSubmitFailed={this.props.onSubmitFailed}
        validateOn="submit"
      >
        <AUheadings level="1" size="xl">
          Additional information
        </AUheadings>
        <AUcallout description="" className={styles.noticeBar}>
          Only sellers you selected and other buyers can view attached documents. Buyers and sellers will not be able to
          view your contact number or internal reference.
        </AUcallout>
        <ErrorAlert
          title="An error occurred"
          model={model}
          messages={{
            requiredContactNumber: 'Contact number is required',
            contactNumberFormat: 'Contact number must be a phone number',
            closedAtIsValid: 'You must enter a valid closing date',
            closedAtIs2DaysInFuture: 'You must enter a closing date at least 2 days from now',
            requiredClosedAt: 'You must enter the closing date for this opportunity'
          }}
        />
        <AUheadings level="2" size="sm">
          Attach a document (optional)
        </AUheadings>
        <p>
          Documents must be in .DOC .XLS .PPT or .PDF format and can be viewed by anyone with a Digital Marketplace
          account. Do not include internal or private information.
        </p>
        {range(this.state.fileCount).map(i => (
          <FilesInput
            key={i}
            title="Additional documents (optional)"
            fieldLabel="Upload document"
            name="attachments"
            model={`${model}.attachments.${i}`}
            formFields={1}
            url={`/brief/${this.props[model].id}/attachments`}
            api={dmapi}
            fileId={i}
            onReset={this.props.saveModel}
            onUploadSuccess={this.props.saveModel}
            accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
          />
        ))}
        {this.state.fileCount < 10 && (
          <p>
            <a
              href="#add"
              onClick={e => {
                e.preventDefault()
                this.addFileField()
              }}
            >
              Add another
            </a>
          </p>
        )}
        <Textfield
          model={`${this.props.model}.contactNumber`}
          label="Contact number for Marketplace support"
          description="This number will not be visible on the Digital Marketplace. It will only be used by the Marketplace operations team in case they need to contact you."
          name="contactNumber"
          id="contactNumber"
          htmlFor="contactNumber"
          defaultValue={this.props[this.props.model].contactNumber}
          maxLength={100}
          showMaxLength
          validators={{
            required
          }}
        />
        <Textfield
          model={`${this.props.model}.internalReference`}
          label="Internal reference (optional)"
          description="For example, business unit or internal procurement ID number. This will not be visible to anyone outside your organisation."
          name="internalReference"
          id="internalReference"
          htmlFor="internalReference"
          defaultValue={this.props[this.props.model].internalReference}
          maxLength={100}
          showMaxLength
          validators={{}}
        />
        <DateControl
          id="closedAt"
          model={`${model}.closedAt`}
          onDateChange={this.handleDateChange}
          defaultValue={this.props[model].closedAt}
          label="Closing date for opportunity"
          description="This date must be at least 2 days after you publish this request. Responses will be available after 6pm Canberra time."
        />
        {this.props.formButtons}
      </Form>
    )
  }
}

BuyerSpecialistRequirementsStage.defaultProps = {
  onSubmit: () => {},
  onSubmitFailed: () => {}
}

BuyerSpecialistRequirementsStage.propTypes = {
  model: PropTypes.string.isRequired,
  saveModel: PropTypes.func.isRequired,
  formButtons: PropTypes.node.isRequired,
  onSubmit: PropTypes.func,
  onSubmitFailed: PropTypes.func
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

const mapDispatchToProps = (dispatch, props) => ({
  setDate: date => dispatch(actions.change(`${props.model}.closedAt`, date))
})

export default connect(mapStateToProps, mapDispatchToProps)(BuyerSpecialistRequirementsStage)
