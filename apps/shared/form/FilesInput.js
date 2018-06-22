/* global FormData */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { actions } from 'react-redux-form'
import range from 'lodash/range'
import compact from 'lodash/compact'
import { GENERAL_ERROR } from 'shared/messageConstants'

import FileInput from './FileInput'

const FilesInput = props => {
  const { label, description, hint, formFields, labels, descriptions, hints, fieldLabels } = props

  return (
    <div>
      {formFields > 1 &&
        labels.length > 0 &&
        hints.length > 0 &&
        range(formFields).map((field, id) => (
          <div key={field}>
            <label className="question-heading au-text-input__label" htmlFor={`file_${id}`}>
              {labels[id]}
            </label>
            <span>{descriptions[id]}</span>
            <br />
            <small>{hints[id]}</small>
            <FileInput id={id} fieldLabel={fieldLabels[id]} {...props} />
            <br />
          </div>
        ))}
      {(formFields === 1 || (labels.length === 0 && hints.length === 0)) && (
        <div>
          <label className="question-heading au-text-input__label" htmlFor="file_0">
            {label}
          </label>
          <span>{description}</span>
          <br />
          <small>{hint}</small>
          {range(formFields).map((field, id) => <FileInput key={field} id={id} {...props} />)}
        </div>
      )}
    </div>
  )
}

FilesInput.propTypes = {
  label: PropTypes.string,
  labels: PropTypes.array,
  descriptions: PropTypes.array,
  hints: PropTypes.array,
  fieldLabels: PropTypes.array,
  hint: PropTypes.string,
  description: PropTypes.string,
  formFields: PropTypes.number.isRequired
}

FilesInput.defaultProps = {
  label: '',
  hint: '',
  description: '',
  labels: [],
  descriptions: [],
  hints: [],
  fieldLabels: []
}

const uploadDocument = (url, api, id, file) => () => {
  const data = new FormData()
  data.append(id, file)

  return api({
    url: `${url}/${id}`,
    method: 'POST',
    data
  }).then(response => {
    if (response.error) {
      if (response.statusCode === 413) {
        return { errorMessage: 'File too large, please check file size limit' }
      }
      return {
        errorMessage: compact([
          response.data && response.data.errorMessage,
          response.errorMessage,
          response.statusText,
          GENERAL_ERROR
        ])[0]
      }
    }

    return { filename: response.data.filename }
  })
}

const mapStateToProps = (state, ownProps) => ({
  form: state[ownProps.model],
  ...ownProps
})

const mapDispatchToProps = dispatch => ({
  onUpload: (url, api, id, data) => dispatch(uploadDocument(url, api, id.toString(), data)),
  removeDocument: (model, name, id) => dispatch(actions.omit(`${model}.${name}`, id.toString())),
  createDocument: (model, name, id) => dispatch(actions.change(`${model}.${name}.${id}`, '')),
  updateDocumentName: (model, name, id, filename) => dispatch(actions.change(`${model}.${name}.${id}`, filename))
})

export { mapStateToProps }

export default connect(mapStateToProps, mapDispatchToProps)(FilesInput)
