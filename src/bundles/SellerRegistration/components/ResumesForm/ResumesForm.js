import React from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {Form, Control, actions} from 'react-redux-form';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';

import Layout        from '../../../../shared/Layout';
import BaseForm      from '../../../../shared/form/BaseForm';
import SubmitForm    from '../../../../shared/form/SubmitForm';
import Textfield     from '../../../../shared/form/Textfield';
import ErrorBox      from '../../../../shared/form/ErrorBox';
import StepNav       from '../StepNav';

import StatefulError from '../../../../shared/form/StatefulError';

import formProps     from '../../../../shared/reduxModules/formPropsSelector';
import {uploadDocument, submitApplication} from '../../redux/modules/application'

import { minObjectLength, required, validCurrency } from '../../../../validators';

import './ResumesForm.css';


class ResumesForm extends BaseForm {

    static propTypes = {
        action: PropTypes.string,
        csrf_token: PropTypes.string,
        form: PropTypes.object.isRequired,
        model: PropTypes.string.isRequired,
    }

    static defaultProps = {
        match: {url: ''}
    }
    state = {
        errors: {}
    }


    onUpload(id, e) {
        e.preventDefault();
        const {model, onUpload, removeDocument, updateDocumentName, createDocument, submitApplication, applicationId} = this.props;
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
                updateDocumentName(model, id, filename, applicationId);
            })
            .then(submitApplication)
            .catch((error) => {
                this.setState({
                    [id]: void 0,
                    errors: {[id]: true}
                })
            })
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
        });
    }

    render() {
        const {action, csrf_token, model, form, services, resumesForm, onSubmit, onSubmitFailed, match, buttonText, nextRoute} = this.props;

        return (
            <Layout>
                <header>
                    <h1 tabIndex="-1">Specialist details</h1>

                  <p>Provide a resume and day rate to indicate the quality of specialists you can provide.<br/>
                    You are not limited to using this specialist and rate when responding to opportunities.<br/>
                    These resumes and rates not be published on the Digital Marketplace.<br/>

                  </p>
                  <br/>

                </header>
                <article role="main">
                    <ErrorBox focusOnMount={true} model={model}/>

                    <StatefulError
                        model={`${model}.resumes`}
                        id="resumes"
                        messages={{
                            resumes: 'Please provide resumes and daily rates for each service',
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
                            resumes: (resumes = {}) => minObjectLength(resumes, Object.keys(services).length)
                          }}
                    >
                        {csrf_token && (
                            <input type="hidden" name="csrf_token" id="csrf_token" value={csrf_token}/>
                        )}

                        {Object.keys(services).map((field, i) => {
                            const key = field;
                            const fieldState = this.state[key] || {};
                            const name = (fieldState.file && fieldState.file.name) || {};
                            const doc = get(resumesForm, `resumes.${key}`, {});
                            const rate_field = `rate_${key}`;
                            const errors = this.state.errors[key];
                            const url = doc.application_id ? `/sellers/application/${doc.application_id}/resumes` : match.url.slice(1);
                            return (
                                <div key={key} className="callout-no-margin">
                                    <p styleName="question-heading">{key} resume</p>
                                  <p className="hint">Each should be no larger than 5MB and in PDF, PNG or JPEG format.</p>
                                    <div>
                                        {errors && <span className="validation-message">There was an error uploading the file</span>}

                                        {isEmpty(doc.filename) && !fieldState.uploading && !fieldState.file &&
                                            <div id={rate_field}>
                                                <p>
                                                    <input type="file" id={key} name={key} styleName="hidden-input" accept=".pdf,.jpg,.png"  onChange={this.onChange.bind(this, key)} />
                                                    <label id={`label_${key}`} htmlFor={key} styleName="custom-input"> {isEmpty(name) && "Choose file" } </label>
                                                </p>
                                            </div>
                                        }

                                        {!isEmpty(doc.filename) &&
                                            <div>
                                                <ul className="bordered-list">
                                                    <li className="bordered-list__item row">
                                                        <div className="col-xs-9" styleName="overflow-hidden">
                                                            <a href={url} target="_blank" rel="external">{doc.filename}</a>
                                                        </div>
                                                        <div className="col-xs-3" styleName="text-right">
                                                            <a href="3" onClick={this.onReset.bind(this, key)}>Delete</a>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        }

                                        {!isEmpty(doc.filename) && 
                                            <div>
                                                <StatefulError
                                                    model={`${model}.resumes.${key}.rate`}
                                                    id={rate_field}
                                                    messages={{
                                                      required: 'Day Rate is required for this document',
                                                      validCurrency: 'Day Rate must be a number',
                                                    }}
                                                />
                                                <Textfield
                                                    model={`${model}.resumes.${key}.rate`}
                                                    name={rate_field}
                                                    id={`${key}_rate`}
                                                    htmlFor={`${key}_rate`}
                                                    label={`${key} Daily Rate`}
                                                    description="Daily rate should reflect the role and/or experience of the specialist and include GST"
                                                    type="number"
                                                    validators={{required, validCurrency}}
                                                />
                                            </div>
                                        }
                                    </div>

                                    {fieldState.uploading && <p>Uploading...</p>}

                                    {fieldState.file &&
                                        <div styleName="upload-container">
                                            <p styleName="filler">&nbsp;</p>
                                            <p id={`span_${key}`} ref={`span_${key}`}>{!isEmpty(name) && name }</p>
                                            <button type="submit" styleName="sumbit-container" onClick={this.onUpload.bind(this, key)}>Upload</button>
                                            <p styleName="custom-input">Choose file</p>
                                        </div>
                                    }
                                </div>
                            )
                        })}

                        <StepNav buttonText={buttonText} to={nextRoute}/>
                    </Form>
                </article>
            </Layout>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ...formProps(state, 'resumesForm'),
        applicationId: state.application.id,
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        onUpload: (id, data) => {
            return dispatch(uploadDocument(id, data));
        },
        removeDocument: (model, id) => {
            return dispatch(actions.omit(`${model}.resumes`, id));
        },
        createDocument: (model, id) => {
            return dispatch(actions.change(`${model}.resumes.${id}`, {}));
        },
        updateDocumentName: (model, id, filename, applicationId) => {
            dispatch(actions.change(`${model}.resumes.${id}.filename`, filename));
            return dispatch(actions.change(`${model}.resumes.${id}.application_id`, applicationId));
        },
        submitApplication: () => {
            return dispatch(submitApplication());
        }
    }
}

export {
    mapStateToProps,
    ResumesForm as Form
}

export default connect(mapStateToProps, mapDispatchToProps)(ResumesForm);
