import React from 'react';
import {connect} from 'react-redux';
import {Form, Control, actions} from 'react-redux-form';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';

import Layout        from '../../../../shared/Layout';
import BaseForm      from '../../../../shared/form/BaseForm';
import SubmitForm    from '../../../../shared/form/SubmitForm';
import Datefield     from '../../../../shared/form/Datefield';
import ErrorBox      from '../../../../shared/form/ErrorBox';

import StatefulError from '../../../../shared/form/StatefulError';

import formProps     from '../../../../shared/reduxModules/formPropsSelector';
import {uploadDocument, submitApplication} from '../../redux/modules/application'

import { minObjectLength, validDate } from '../../../../validators';

class DocumentsForm extends BaseForm {

    static propTypes = {
        action: React.PropTypes.string,
        csrf_token: React.PropTypes.string,
        form: React.PropTypes.object.isRequired,
        model: React.PropTypes.string.isRequired,
        supplierCode: React.PropTypes.number
    }

    static defaultProps = {
        match: {url: ''}
    }
    state = {
        errors: {}
    }

    formFields = [
        {
            'label': 'Financial statement',
            'id': 'financial',
            'description': 'Please provide an up-to-date financial statement. If you do not have this, ask your accountant for a letter confirming financial viability.',
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
        const {model, onUpload, removeDocument, updateDocumentName, createDocument, submitApplication} = this.props;
        const file = this.state[id].file;

        this.setState({
            [id]: Object.assign({}, this.state[id], {'uploading': true, 'file': void 0}),
            errors: Object.assign({}, this.state.errors, {[id]: void 0})
        })

        removeDocument(model, id);
        createDocument(model, id);

        onUpload(id, file)
            .then((filename) => {
                this.setState({
                    [id]: Object.assign({}, this.state[id], {'uploading': false})
                });
                updateDocumentName(model, id, filename);
            })
            .then(submitApplication)
            .catch((error) => {
                this.setState({
                    [id]: void 0,
                    errors: {[id]: true}
                })
            });
    }

    onReset(id, e) {
        e.preventDefault();
        const {model, removeDocument, createDocument} = this.props;
        removeDocument(model, id);
        createDocument(model, id);
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
        const {action, csrf_token, model, form, documentsForm, onSubmit, onSubmitFailed, match, buttonText} = this.props;

        return (
            <Layout>
                <header>
                    <h1 tabIndex="-1">Upload your documents</h1>
                    <p>Your insurance documents will appear on your seller profile and your financial statement may be shared with buyers on request. So make sure they are up to date.</p>
                     <p>   Each should be no larger than 5MB and in <strong>PDF</strong>, <strong>PNG</strong> or <strong>JPEG </strong>
                        format.If you have multiple files for a document, please scan and merge as one upload.
                    </p>
                </header>
                <article role="main">
                    <ErrorBox focusOnMount={true} model={model}/>

                    <StatefulError
                        model={`${model}.documents`}
                        id="documents"
                        messages={{
                            documents: 'Please upload all documents.',
                        }}
                    />
                    <Form model={model}
                          action={action}
                          method="post"
                          id="yourinfo"
                          component={SubmitForm}
                          valid={form.valid}
                          onCustomSubmit={onSubmit}
                          onSubmitFailed={onSubmitFailed}
                          validators={{
                            documents: (documents = {}) => minObjectLength(documents, 3)
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
                                        <div id={expiry_date_field}>
                                            {isEmpty(doc.filename) && (
                                                <p>
                                                    <input type="file" id={key} name={key} accept=".pdf,.jpg,.png" onChange={this.onChange.bind(this, key)}/>
                                                </p>
                                            )}
                                            {(field.expires && !isEmpty(doc.filename)) && <div>
                                                <StatefulError
                                                    model={`${model}.documents.${key}.expiry`}
                                                    id={expiry_date_field}
                                                    messages={{
                                                        validDate: 'Expiry date is required for this document and must be in the future.',
                                                    }}
                                                />
                                                <Control
                                                model={`${model}.documents.${key}.expiry`}
                                                component={Datefield}
                                                name={expiry_date_field}
                                                id={expiry_date_field}
                                                htmlFor={expiry_date_field}
                                                label="Expiry date:"
                                                validators={{validDate}}
                                                controlProps={{
                                                    id: expiry_date_field,
                                                    model: `${model}.documents.${key}.expiry`,
                                                    htmlFor: expiry_date_field,
                                                    label: "Expiry date"
                                                }}
                                            /></div>}
                                        </div>

                                        <div>
                                            {fieldState.uploading && 'Uploading...'}
                                            {errors && 'There was an error uploading the file'}
                                            {!isEmpty(doc.filename) && <p><a href={`${match.url.slice(1)}/${doc.filename}`} target="_blank"
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

                        <input type="submit" value={buttonText}/>
                    </Form>
                </article>
            </Layout>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        supplierCode: state.application.supplierCode,
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
        createDocument: (model, id) => {
            return dispatch(actions.change(`${model}.documents.${id}`, {}));
        },
        updateDocumentName: (model, id, filename) => {
            return dispatch(actions.change(`${model}.documents.${id}.filename`, filename));
        },
        submitApplication: () => {
            return dispatch(submitApplication());
        }
    }
}

export {
    mapStateToProps,
    DocumentsForm as Form
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentsForm);
