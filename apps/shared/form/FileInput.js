import React from 'react'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'

import styles from './scss/FileInput.scss'

class FileInput extends React.Component {
  state = {
    uploading: undefined,
    file: undefined,
    errors: undefined
  }

  onReset = e => {
    e.preventDefault()
    const { id, model, name, removeDocument, createDocument } = this.props
    removeDocument(model, name, id)
    createDocument(model, name, id)
    this.setState({
      file: undefined
    })
  }

  onChange = e => {
    e.preventDefault()
    this.setState({
      uploading: true,
      file: e.target.files[0],
      errors: undefined
    })

    const { url, api, id, model, name, onUpload, removeDocument, updateDocumentName, createDocument } = this.props
    const file = e.target.files[0]

    removeDocument(model, name, id)
    createDocument(model, name, id)
    onUpload(url, api, id, file).then(result => {
      this.setState({
        uploading: false
      })
      if (result.filename) {
        updateDocumentName(model, name, id, result.filename)
      } else {
        this.setState({ errors: result.errorMessage })
      }
    })
  }
  render() {
    const doc = get(this.props.form, `${this.props.name}.${this.props.id}`, {})
    const fileField = `file_${this.props.id}`
    return (
      <div key={fileField} className="callout-no-margin">
        {this.state.errors &&
          <div className="validation-message">
            <span>
              There was an error uploading the file: {this.state.errors}
            </span>
          </div>}
        {isEmpty(doc) &&
          !this.state.uploading &&
          <div>
            <p>
              <input
                type="file"
                id={fileField}
                name={fileField}
                accept=".pdf,.odt"
                onChange={this.onChange}
                className={styles.hidden_input}
              />
              <label htmlFor={fileField} id={`label_${this.props.id}`} className={styles.custom_input}>
                <div className="uikit-btn uikit-btn--tertiary">
                  {this.props.fieldLabel}
                </div>
              </label>
            </p>
          </div>}

        {!isEmpty(doc) &&
          <div className={styles.bordered_list__item}>
            <div className="col-xs-9">
              <a href={`/api/2${this.props.url}/${doc}`} target="_blank" rel="external">
                {doc}
              </a>
            </div>
            <div className="col-xs-3">
              <a href="#delete" onClick={this.onReset}>
                Delete
              </a>
            </div>
          </div>}

        {this.state.uploading && <p>Uploading...</p>}
      </div>
    )
  }
}

export default FileInput
