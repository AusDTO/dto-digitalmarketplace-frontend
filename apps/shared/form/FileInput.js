import React from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import { Control } from 'react-redux-form'
import StatefulError from './StatefulError'
import styles from './scss/FileInput.scss'

class FileInput extends React.Component {
  state = {
    uploading: undefined,
    file: undefined,
    errors: undefined
  }

  onReset = e => {
    e.preventDefault()
    const { model, createDocument } = this.props
    createDocument(model)
    this.setState({ file: undefined }, this.props.onReset)
  }

  onChange = e => {
    e.preventDefault()
    this.setState({
      uploading: true,
      file: e.target.files[0],
      errors: undefined
    })

    const { url, api, id, onUpload, createDocument, model, updateDocumentName, uploading, csrfToken } = this.props
    const file = e.target.files[0]
    uploading(true)

    onUpload(url, api, id, file, csrfToken).then(result => {
      this.setState({
        uploading: false
      })
      if (result.filename) {
        updateDocumentName(model, result.filename)
      } else {
        this.setState({ errors: result.errorMessage })
        createDocument(model)
      }
      this.props.onUploadSuccess()
      uploading(false)
    })
  }
  render() {
    const { url, form, name, id, model, validators, messages, fieldLabel, title, accept } = this.props
    const fileField = `${id}`
    const doc = get(form, `${name}.${fileField}`, {})
    return (
      <div key={fileField} className="callout-no-margin">
        {this.state.errors && (
          <div className="validation-message">
            <span>There was an error uploading the file: {this.state.errors}</span>
          </div>
        )}
        {isEmpty(doc) && !this.state.uploading && (
          <div>
            <div>
              <Control.file
                model={model}
                type="file"
                id={`file_${fileField}`}
                name={`file_${fileField}`}
                accept={accept}
                onChange={this.onChange}
                className={styles.hidden_input}
                validators={validators}
                title={title || ''}
              />
              <label htmlFor={`file_${fileField}`} id={`label_${id}`} className={styles.custom_input}>
                <div className="au-btn au-btn--secondary">{fieldLabel}</div>
              </label>
              {messages && (
                <StatefulError
                  model={model}
                  messages={messages}
                  showMessagesDuringFocus="false"
                  id={`file_${fileField}`}
                />
              )}
            </div>
          </div>
        )}
        {!isEmpty(doc) && typeof doc === 'string' && (
          <div className={styles.bordered_list__item}>
            <div className="col-xs-9">
              <a href={`/api/2${url}/${doc}`} target="_blank" rel="external noopener noreferrer">
                {doc}
              </a>
            </div>
            <div className="col-xs-3">
              <a href="#delete" onClick={this.onReset}>
                Delete
              </a>
            </div>
          </div>
        )}
        {this.state.uploading && <p>Uploading...</p>}
      </div>
    )
  }
}

FileInput.defaultProps = {
  onReset: () => {},
  onUploadSuccess: () => {}
}

FileInput.propTypes = {
  onReset: PropTypes.func,
  onUploadSuccess: PropTypes.func
}

export default FileInput
