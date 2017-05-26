import React from 'react';
import {
    LocalForm,
    Field
} from 'react-redux-form';

import Layout        from '../../../../shared/Layout';

export class DomainAssessmentChoice extends React.Component {

    state = {
        error: false
    };

    handleSubmit(val) {
        if (val['domain']) {
            window.location.href = this.props.assessmentUrl + "/" + val['domain'];
        } else {
            this.setState({
                error: true
            });
            return false;
        }
    }

    render() {
        let props = this.props;
        return (
            <Layout>
                <header>
                    <h1>Choose Assessment Domain</h1>
                </header>
                <article role="main">
                    <p>Before you apply for this opportunity, we need to assess one area of expertise. Please choose
                        from the below areas.
                        If you wish to add a different area of expertise, you will need to update your seller
                        profile.</p>
                    <LocalForm
                        action={props.assessmentUrl}
                        onSubmit={(val) => this.handleSubmit(val)}
                    >
                        <fieldset className="field" >
                            <legend> Please choose from the below areas.</legend>
                            {this.state.error && <a className="validation-message" href="#domain">
                                <span className="visuallyhidden">Validation Error: </span>
                                <span>Please pick one domain</span>
                            </a>}
                            <Field id="domain" model=".domain" dynamic={false}>

                                {Object.keys(props.domains).map((key, i) => {

                                    let fieldId = `domain-${key}`;
                                    return (
                                        <span key={i}>
                                <input type="radio"
                                       id={fieldId}
                                       value={key}
                                />
                                <label htmlFor={fieldId}>{props.domains[key]}</label>
                            </span>
                                    )
                                })}
                            </Field>
                        </fieldset>
                        <button type="submit">Submit</button>
                    </LocalForm>
                </article>
            </Layout>
        )
    }
}

DomainAssessmentChoice.propTypes = {
    domains: React.PropTypes.object,
    brief_id: React.PropTypes.number,
    assessmentUrl: React.PropTypes.string
}

export default DomainAssessmentChoice;
