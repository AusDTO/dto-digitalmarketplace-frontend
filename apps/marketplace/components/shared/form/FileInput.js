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

  onUpload = e => {
    e.preventDefault()
    const { id, model, name, url, onUpload, removeDocument, updateDocumentName, createDocument } = this.props
    const file = this.state.file
    this.setState({
      uploading: true,
      file: undefined,
      errors: undefined
    })

    removeDocument(model, name, id)
    createDocument(model, name, id)
    onUpload(id, url, file).then(result => {
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
      file: e.target.files[0],
      errors: undefined
    })
  }
  render() {
    const filename = (this.state.file && this.state.file.name) || {}
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
        <div>
          {isEmpty(doc) &&
            !this.state.uploading &&
            !this.state.file &&
            <div id={fileField}>
              <p>
                <input type="file" id={fileField} name={fileField} accept=".pdf,.odt" onChange={this.onChange} />
                <label htmlFor={fileField} id={`label_${this.props.id}`}>
                  {' '}{isEmpty(filename) && 'Choose file'}{' '}
                </label>
              </p>
            </div>}

          {!isEmpty(doc) &&
            <div>
              <ul className={styles.bordered_list}>
                <li className={styles.bordered_list__item}>
                  <div className="col-xs-9">
                    <a href={`/api${this.props.url}/${doc}`} target="_blank" rel="external">
                      {doc}
                    </a>
                  </div>
                  <div className="col-xs-3">
                    <a href="#delete" onClick={this.onReset}>
                      Delete
                    </a>
                  </div>
                </li>
              </ul>
            </div>}
        </div>

        {this.state.uploading && <p>Uploading...</p>}

        {this.state.file &&
          <div>
            <ul className={styles.bordered_list}>
              <li className={styles.bordered_list__item}>
                <div className="col-xs-9">
                  {!isEmpty(filename) && filename}
                </div>
                <div className="col-xs-3">
                  <button type="submit" onClick={this.onUpload}>
                    Upload
                  </button>
                </div>
              </li>
            </ul>
          </div>}
      </div>
    )
  }
}

export default FileInput
