import React from 'react';
import {connect} from 'react-redux';
import {Form} from 'react-redux-form';

import {required} from '../../../../validators';

import Layout from '../../../../shared/Layout';

import BaseForm     from '../../../../shared/form/BaseForm';
import SubmitForm   from '../../../../shared/form/SubmitForm';
import ErrorBox     from '../../../../shared/form/ErrorBox';
import Textarea     from '../../../../shared/form/Textarea';
import Textfield    from '../../../../shared/form/Textfield';
import formProps    from '../../../../shared/reduxModules/formPropsSelector';

class Referee extends React.Component {
    render() {
        const {id, model} = this.props;
        return (
            <div>
                <h2>Referee {id}</h2>
                <Textfield
                    model={`${model}.name`}
                    name={`name-${id}`}
                    id={`name-${id}`}
                    htmlFor={`name-${id}`}
                    label="Referee's name"
                    description="The full name of the best person to contact about your experience"
                    validators={{ required }}
                    messages={{ required: `Please provide a name for Referee ${id}.`}}
                />
                <Textfield
                    model={`${model}.phone`}
                    name={`phone-${id}`}
                    id={`phone-${id}`}
                    htmlFor={`phone-${id}`}
                    label="Referee's phone number"
                    validators={{ required }}
                    messages={{ required: `Please provide a phone number for Referee ${id}.`}}
                />
                <Textarea
                    model={`${model}.services`}
                    name="services"
                    id="services"
                    controlProps={{limit: 200}}
                    label="Services provided by the business to the referee"
                    messages={{required: `You must provide services for Referee ${id}`}}
                    validators={{required}}
                />
            </div>
        )
    }
}

class ReferencesForm extends BaseForm {

    static propTypes = {
        action: React.PropTypes.string,
        csrf_token: React.PropTypes.string,
        form: React.PropTypes.object.isRequired,
        returnLink: React.PropTypes.string
    }

    render() {
        const {action, csrf_token, model, returnLink, form, title, buttonText, onSubmit } = this.props;
        return (
            <Layout>
                <header>
                    <h1>{title}</h1>
                </header>
                <article role="main">
                    <ErrorBox focusOnMount={true} model={`${model}.references`}/>
                    <Form model={model}
                          action={action}
                          method="post"
                          id="Reference__create"
                          valid={form.valid}
                          component={SubmitForm}
                          onCustomSubmit={onSubmit}
                    >
                        {csrf_token && (
                            <input type="hidden" name="csrf_token" id="csrf_token" value={csrf_token}/>
                        )}

                        <p>
                            Provide contact details for at least 2 recent clients of the business who are prepared 
                            to act as referees. You will need to provide their contact details and a description of 
                            the services supplied by the business to each referee.
                        </p>
                        <Referee id="1" model={`${model}.references[0]`}/>
                        <Referee id="2" model={`${model}.references[1]`}/>
                        <input type="submit" value={buttonText} role="button"/>
                    </Form>
                    {returnLink && <a href={returnLink}>Return without saving</a>}
                </article>
            </Layout>
        )
    }
}

ReferencesForm.defaultProps = {
  buttonText: 'Save & continue',
  title: 'References'
}

const mapStateToProps = (state) => {
    return {
        returnLink: state.referencesForm && state.referencesForm.returnLink,
        ...formProps(state, 'referencesForm')
    }
}

export {
    Textfield,
    mapStateToProps,
    ReferencesForm as Form
}

export default connect(mapStateToProps)(ReferencesForm);
