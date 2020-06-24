import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Form, Control, actions } from 'react-redux-form';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import isPast from 'date-fns/is_past';
import isToday from 'date-fns/is_today';
import parse from 'date-fns/parse';

import Layout from '../../../../shared/Layout';
import BaseForm from '../../../../shared/form/BaseForm';
import SubmitForm from '../../../../shared/form/SubmitForm';
import Datefield from '../../../../shared/form/Datefield';
import ErrorBox from '../../../../shared/form/ErrorBox';
import CheckboxDetailsField from '../../../../shared/form/CheckboxDetailsField';
import StepNav from '../StepNav';

import StatefulError from '../../../../shared/form/StatefulError';

import formProps from '../../../../shared/reduxModules/formPropsSelector';
import { uploadDocument, submitApplication } from '../../redux/modules/application'

import { minObjectLength, validDate } from '../../../../validators';
import ValidationSummary from '../ValidationSummary';

import styles from './DocumentsForm.css';


class DocumentsForm extends BaseForm {

    static propTypes = {
        action: PropTypes.string,
        csrf_token: PropTypes.string,
        form: PropTypes.object.isRequired,
        model: PropTypes.string.isRequired,
    }

    static defaultProps = {
        match: { url: '' }
    }
    
    state = {
        errors: {},
        indemnity: {
            newDocumentUploaded: this.props.documentsForm.documents.indemnity && 
                this.props.documentsForm.documents.indemnity.expiry ? false : true
        },
        liability: {
            newDocumentUploaded: this.props.documentsForm.documents.liability && 
                this.props.documentsForm.documents.liability.expiry ? false : true
        },
        workers: {
            newDocumentUploaded: this.props.documentsForm.documents.workers &&
                this.props.documentsForm.documents.workers.expiry ? false : true
        }
    }

    formFields = [
        {
            'label': 'Financial statement',
            'id': 'financial',
            'description': 'Please provide an up-to-date financial statement. If you do not have this, ask your accountant for a letter confirming financial viability. We will not accept an internal letter as proof of financial viability.',
            'expires': false
        },
        {
            'label': 'Professional Indemnity Insurance',
            'id': 'indemnity',
            'description': 'Your insurer can issue a certificate of currency.',
            'expires': true
        },
        {
            'label': 'Public Liability Insurance',
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

    componentDidMount() {
        const documents = this.props.documentsForm.documents
        Object.keys(documents).map(key => {
            const document = documents[key]

            if (document.expiry) {
                const documentExpiry = parse(document.expiry)
                if (isPast(documentExpiry) || isToday(documentExpiry)) {
                    this.resetDocument(key)
                }
            }
        })
    }

    onUpload(id, e) {
        e.preventDefault();
        const { model, onUpload, removeDocument, updateDocumentName, createDocument, submitApplication, applicationId } = this.props;
        const file = this.state[id].file;
        this.setState({
            [id]: Object.assign({}, this.state[id], { 'uploading': true, 'file': void 0 }),
            errors: Object.assign({}, this.state.errors, { [id]: void 0 })
        })

        removeDocument(model, id);
        createDocument(model, id);
        onUpload(id, file)
            .then((filename) => {
                this.setState({
                    [id]: Object.assign({}, this.state[id], { 'uploading': false, newDocumentUploaded: true })
                });
                updateDocumentName(model, id, filename, applicationId);
            })
            .then(submitApplication)
            .catch((error) => {
                this.setState({
                    [id]: void 0,
                    errors: { [id]: true }
                })
            })
    }

    onReset(id, e) {
        e.preventDefault();
        this.resetDocument(id);
    }

    onChange(id, e) {
        e.preventDefault();
        this.setState({
            [id]: Object.assign({}, this.state[id], { 'file': e.target.files[0] }),
            errors: { [id]: void 0 }
        });
    }

    resetDocument(key) {
        const { model, removeDocument, createDocument } = this.props

        removeDocument(model, key);
        createDocument(model, key);
        this.setState({
            [key]: Object.assign({}, this.state[key], { 'file': void 0 })
        })
    }

    render() {
        const { action, csrf_token, model, form, documentsForm, onSubmit, onSubmitFailed, match, buttonText, nextRoute, submitClicked, applicationErrors, type } = this.props;
        let hasFocused = false
        const setFocus = e => {
            if (!hasFocused) {
                hasFocused = true
                e.focus()
            }
        }
        return (
            <Layout>
                <header>
                    <ValidationSummary form={form} applicationErrors={applicationErrors} filterFunc={(ae) => ae.step === 'documents' && type === 'edit'} />
                    <h1 className="au-display-xl" tabIndex="-1">Upload your documents</h1>
                    <p>The details of your insurance documents and financial statement are not visible on your profile (other than the insurance expiry dates). These details may be shared with buyers on request, so make sure they are up to date.</p>
                    <p>Each should be no larger than 5MB and in PDF, PNG or JPEG format. If you have multiple files for a document, please scan and merge as one upload.</p>
                </header>
                <article role="main">
                    <ErrorBox submitClicked={submitClicked} model={model} setFocus={setFocus} />

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
                            documents: (documents = {}) => minObjectLength(documents, 4) && documents.workers.noWorkersCompensation !== false
                        }}
                    >
                        {csrf_token && (
                            <input type="hidden" name="csrf_token" id="csrf_token" value={csrf_token} />
                        )}

                        {this.formFields.map((field, i) => {
                            const key = field.id;
                            const fieldState = this.state[key] || {};
                            const name = (fieldState.file && fieldState.file.name) || {};
                            const doc = get(documentsForm, `documents.${key}`, {});
                            const expiry_date_field = `expiry_date_${key}`;
                            const errors = this.state.errors[key];
                            const url = doc.application_id ? `/sellers/application/${doc.application_id}/documents/${doc.filename}` : match.url.slice(1);

                            return (
                                <div key={key} styleName="styles.document">
                                    <h3 styleName="question-heading">{field.label}</h3>
                                    <span styleName="styles.documentDescription">{field.description}</span>

                                    <div>
                                        {errors && <span className="validation-message">There was an error uploading the file</span>}

                                        {isEmpty(doc.filename) && !fieldState.uploading && !fieldState.file &&
                                            <div id={expiry_date_field} styleName="file-upload">
                                                <p>
                                                    <input type="file" id={key} name={key} styleName="hidden-input" accept=".pdf,.jpg,.png" onChange={this.onChange.bind(this, key)} />
                                                    <label id={`label_${key}`} htmlFor={key} styleName="custom-input"> {isEmpty(name) && "Choose file"} </label>
                                                </p>
                                            </div>
                                        }

                                        {!isEmpty(doc.filename) &&
                                            <div>
                                                <ul className="bordered-list">
                                                    <li className="bordered-list__item row">
                                                        <div className="col-xs-9" styleName="overflow-hidden">
                                                            <a href={url} target="_blank" rel="noopener noreferrer">{doc.filename}</a>
                                                        </div>
                                                        <div className="col-xs-3" styleName="text-right">
                                                            <a href="3" onClick={this.onReset.bind(this, key)}>Delete</a>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        }

                                        {!isEmpty(doc.filename) && field.expires &&
                                            <div>
                                                <StatefulError
                                                    model={`${model}.documents.${key}.expiry`}
                                                    id={expiry_date_field}
                                                    messages={{
                                                        validDate: 'Expiry date is required for this document and must be in the future.'
                                                    }}
                                                />

                                                <Control
                                                    model={`${model}.documents.${key}.expiry`}
                                                    component={Datefield}
                                                    name={expiry_date_field}
                                                    id={`${key}_expiry`}
                                                    label="Expiry date:"
                                                    updateOn="change"
                                                    validators={{validDate}}
                                                    disabled={!this.state[key].newDocumentUploaded}
                                                    controlProps={{
                                                        id: expiry_date_field,
                                                        model: `${model}.documents.${key}.expiry`,
                                                        htmlFor: expiry_date_field,
                                                        label: "Enter the expiry date of attached document"
                                                    }}
                                                />
                                            </div>
                                        }
                                    </div>

                                    {fieldState.uploading && <p>Uploading...</p>}

                                    {fieldState.file &&
                                        <div styleName="upload-container">
                                            <p styleName="filler">&nbsp;</p>
                                            <p id={`span_${key}`} ref={`span_${key}`} styleName="file-name">{!isEmpty(name) && name}</p>
                                            <button type="submit" styleName="submit-container" onClick={this.onUpload.bind(this, key)}>Upload</button>
                                            <input type="file" id={key} name={key} styleName="hidden-input" accept=".pdf,.jpg,.png" onChange={this.onChange.bind(this, key)} />
                                            <label id={`label_${key}`} htmlFor={key} styleName="custom-input"> {!isEmpty(name) && "Change file"} </label>
                                        </div>
                                    }
                                </div>
                            )
                        })}
                        {documentsForm.documents.workers && documentsForm.documents.workers.filename ?
                          '' :
                          <CheckboxDetailsField
                            id="compensation"
                            name="compensation"
                            value="compensation"
                            label="I am not required to hold Workers Compensation Insurance"
                            model={`${model}.documents.workers.noWorkersCompensation`}
                            detailsModel={model}
                          />
                        }
                        <StepNav buttonText={buttonText} to={nextRoute} />
                    </Form>
                </article>
            </Layout>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ...formProps(state, 'documentsForm'),
        applicationId: state.application.id,
        applicationErrors: state.application_errors
    };
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
        updateDocumentName: (model, id, filename, applicationId) => {
            dispatch(actions.change(`${model}.documents.${id}.filename`, filename));
            return dispatch(actions.change(`${model}.documents.${id}.application_id`, applicationId));
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
