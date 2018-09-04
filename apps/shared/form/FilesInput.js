/* global FormData */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { actions } from 'react-redux-form'
import range from 'lodash/range'
import compact from 'lodash/compact'
import { GENERAL_ERROR } from 'shared/messageConstants'
import styles from './scss/FilesInput.scss'
import FileInput from './FileInput'

const FilesInput = props => {
  const { fileId, label, description, hint, formFields, uploading } = props

  return (
    <div className="field">
      <div className={styles.fileInput}>
        <label className={`${styles.label} question-heading au-text-input__label`} htmlFor={`file_${fileId}`}>
          {label}
        </label>
        <small>{hint}</small>
        <p>{description}</p>
        {range(formFields).map(field => <FileInput key={field} id={fileId} uploading={uploading} {...props} />)}
      </div>
    </div>
  )
}

FilesInput.propTypes = {
  fileId: PropTypes.number,
  label: PropTypes.string,
  hint: PropTypes.string,
  description: PropTypes.string,
  formFields: PropTypes.number.isRequired,
  uploading: PropTypes.func
}

FilesInput.defaultProps = {
  fileId: 0,
  label: '',
  hint: '',
  description: '',
  uploading: () => null
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
      if (response.status === 413) {
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
  form: state[ownProps.model.split('.')[0]],
  ...ownProps
})

const mapDispatchToProps = dispatch => ({
  onUpload: (url, api, id, data) => dispatch(uploadDocument(url, api, id.toString(), data)),
  createDocument: model => dispatch(actions.change(model, '')),
  updateDocumentName: (model, filename) => dispatch(actions.change(model, filename))
})

export { mapStateToProps }

export default connect(mapStateToProps, mapDispatchToProps)(FilesInput)
