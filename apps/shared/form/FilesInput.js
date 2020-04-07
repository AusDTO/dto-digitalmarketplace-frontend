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
  const { fileId, label, description, hint, formFields, uploading, accept, name } = props

  return (
    <div className={label ? 'field' : styles.noLabel}>
      <div className={styles.fileInput}>
        {label && (
          <label className={`${styles.label} question-heading au-text-input__label`} htmlFor={`file_${name}_${fileId}`}>
            {label}
          </label>
        )}
        {hint && <small>{hint}</small>}
        {description && <p>{description}</p>}
        {range(formFields).map(field => (
          <FileInput key={field} id={fileId} uploading={uploading} accept={accept} {...props} />
        ))}
      </div>
    </div>
  )
}

FilesInput.propTypes = {
  fileId: PropTypes.number,
  label: PropTypes.string,
  hint: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  formFields: PropTypes.number.isRequired,
  uploading: PropTypes.func,
  accept: PropTypes.string
}

FilesInput.defaultProps = {
  fileId: 0,
  label: '',
  hint: '',
  description: '',
  uploading: () => null,
  accept: '.pdf,.odt'
}

const uploadDocument = (url, api, id, file, csrfToken) => () => {
  const data = new FormData()
  data.append(id, file)

  return api({
    url: `${url}/${id}`,
    method: 'POST',
    headers: {
      'X-CSRFToken': csrfToken,
      'Content-Type': 'application/json'
    },
    data,
    timeout: 600000
  }).then(response => {
    if (response.error) {
      if (response.status === 413) {
        return { errorMessage: 'File too large, please check file size limit' }
      }
      return {
        errorMessage: compact([
          response.data && response.data.message,
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
  csrfToken: state.app.csrfToken,
  ...ownProps
})

const mapDispatchToProps = dispatch => ({
  onUpload: (url, api, id, data, csrfToken) => dispatch(uploadDocument(url, api, id.toString(), data, csrfToken)),
  createDocument: model => dispatch(actions.change(model, '')),
  updateDocumentName: (model, filename) => dispatch(actions.change(model, filename))
})

export { mapStateToProps }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilesInput)
