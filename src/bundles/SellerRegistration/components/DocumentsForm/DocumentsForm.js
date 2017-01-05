import React from 'react';
import {connect} from 'react-redux';
import {Form, actions} from 'react-redux-form';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';

import Layout        from '../../../../shared/Layout';
import BaseForm      from '../../../../shared/form/BaseForm';
import SubmitForm    from '../../../../shared/form/SubmitForm';
import Datefield     from '../../../../shared/form/Datefield';
import ErrorBox      from '../../../../shared/form/ErrorBox';

import StatefulError from '../../../../shared/form/StatefulError';

import formProps     from '../../../../shared/reduxModules/formPropsSelector';
import {uploadDocument} from '../../redux/modules/application'

class DocumentsForm extends BaseForm {

    static propTypes = {
        action: React.PropTypes.string,
        csrf_token: React.PropTypes.string,
        form: React.PropTypes.object.isRequired,
        model: React.PropTypes.string.isRequired
    }

    state = {
        errors: {}
    }

    formFields = [
        {
            'label': 'Financial Statement',
            'id': 'financial',
            'description': 'Ideally this is financial accounts for 3 years. If you don’t have this, ask your accountant for a letter confirming proof of financial viability.',
            'expires': false
        },
        {
            'label': 'Professional Indemnity and Public Liability Insurance',
            'id': 'liability',
            'description': 'Your insurer can issue a certificate of currency.',
            'expires': true
        },
        {
            'label': 'Workers Compensation Insurance',
            'id': 'workers',
            'description': 'Your insurer can issue a certificate of currency.',
            'expires': true
        }
    ]

    onUpload(id, e) {
        e.preventDefault();
        const {model, onUpload, removeDocument, updateDocumentName} = this.props;
        const file = this.state[id].file;

        this.setState({
            [id]: Object.assign({}, this.state[id], {'uploading': true, 'file': void 0}),
            errors: Object.assign({}, this.state.errors, {[id]: void 0})
        })

        removeDocument(model, id);

        onUpload(id, file)
            .then((filename) => {
                this.setState({
                    [id]: Object.assign({}, this.state[id], {'uploading': false})
                });
                updateDocumentName(model, id, filename);
            })
            .catch((error) => {
                this.setState({
                    [id]: void 0,
                    errors: {[id]: true}
                })
            });
    }

    onReset(id, e) {
        e.preventDefault();
        const {model, removeDocument} = this.props;
        removeDocument(model, id);
        this.setState({
            [id]: Object.assign({}, this.state[id], {'file': void 0})
        })
    }

    onChange(id, e) {
        e.preventDefault();
        this.setState({
            [id]: Object.assign({}, this.state[id], {'file': e.target.files[0]}),
            errors: {[id]: void 0}
        })
    }

    render() {
        const {action, csrf_token, model, form, documentsForm, onSubmit, pathname = '', buttonText} = this.props;
        return (
            <Layout>
                <header>
                    <h1 tabIndex="-1">Upload your documents</h1>
                    <p>As part of your assessment we’ll need the following documents.
                        Each should be no larger than 5MB and in <strong>PDF</strong>, <strong>PNG</strong> or <strong>JPEG</strong>
                        format.
                        If you have multiple files for a document, please scan and merge as one upload.
                    </p>
                </header>
                <article role="main">
                    <ErrorBox focusOnMount={true} model={model}/>

                    <StatefulError
                        model={`${model}.documents`}
                        id="documents"
                        messages={{
                            documents: 'Please upload all documents.'
                        }}
                    />
                    <Form model={model}
                          action={action}
                          method="post"
                          id="yourinfo"
                          component={SubmitForm}
                          valid={form.valid}
                          onCustomSubmit={onSubmit}
                          validators={{
                              documents: (documents) => documents && Object.keys(documents).length === 3
                          }}
                    >
                        {csrf_token && (
                            <input type="hidden" name="csrf_token" id="csrf_token" value={csrf_token}/>
                        )}

                        {this.formFields.map((field, i) => {
                            const key = field.id;
                            const fieldState = this.state[key] || {};
                            const doc = get(documentsForm, `documents.${key}`, {});
                            const expiry_date_field = 'expiry_date_' + key;
                            const errors = this.state.errors[key];
                            return (
                                <div key={key} className="callout">
                                    <label className="question-heading" htmlFor={key}>{field.label}</label>
                                    <p>{field.description}</p>

                                    <div>
                                        <div>
                                            <p>
                                                {isEmpty(doc.filename) && <input type="file" id={key} name={key} accept=".pdf,.jpg,.png"
                                                                onChange={this.onChange.bind(this, key)}/>}
                                                {(field.expires && (fieldState.file || !isEmpty(doc))) && <Datefield
                                                    model={`${model}.documents.${key}.expiry`}
                                                    name={expiry_date_field}
                                                    id={expiry_date_field}
                                                    htmlFor={expiry_date_field}
                                                    label="Expiry date:"
                                                    messages={{
                                                        required: 'Expiry date is required for this document.',
                                                    }}
                                                />}
                                            </p>
                                        </div>

                                        <div>
                                            {fieldState.uploading && 'Uploading...'}
                                            {errors && 'There was an error uploading the file'}
                                            {!isEmpty(doc.filename) && <p><a href={`${pathname.slice(1)}/${doc.filename}`} target="_blank"
                                                          rel="external">{doc.filename}</a></p>}
                                        </div>
                                    </div>
                                    <div className="actions">
                                        {fieldState.file &&
                                        <button type="submit" onClick={this.onUpload.bind(this, key)}>Upload</button>}
                                        {!isEmpty(doc) &&
                                        <button type="reset" onClick={this.onReset.bind(this, key)}>Remove</button>}
                                    </div>

                                </div>
                            )
                        })}

                        <input type="submit" value={buttonText} role="button"/>
                    </Form>
                </article>
            </Layout>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ...formProps(state, 'documentsForm')
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onUpload: (id, data) => {
            return dispatch(uploadDocument(id, data));
        },
        removeDocument: (model, id) => {
            return dispatch(actions.omit(`${model}.documents`, id));
        },
        updateDocumentName: (model, id, filename) => {
            return dispatch(actions.change(`${model}.documents.${id}.filename`, filename));
        }
    }
}

export {
    mapStateToProps,
    DocumentsForm as Form
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentsForm);
