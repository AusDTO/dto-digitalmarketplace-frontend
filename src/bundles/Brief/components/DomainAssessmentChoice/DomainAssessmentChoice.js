import React from 'react';
import {
    LocalForm,
    Field
} from 'react-redux-form';

import domains from '../../../SellerRegistration/components/DomainSelector/domains';
import Layout        from '../../../../shared/Layout';
import find from 'lodash/find'
export class DomainAssessmentChoice extends React.Component {

    state = {
        error: false
    };

    handleSubmit(val) {
        var domain = val['domain'];
        if (document.querySelector('input[name="domain"]:checked')) {
            domain = document.querySelector('input[name="domain"]:checked').value
        }
        if (domain) {
            window.location.href = this.props.assessmentUrl + "/" + domain;
        } else {
            this.setState({
                error: true
            });
            return false;
        }
    }

    render() {
        console.log({this})
        let props = this.props;
        return (
            <Layout>
                <header>
                    <h1>Choose an area of expertise for assessment</h1>
                </header>
                <article role="main">
                    <p>To respond to an outcome opportunity, you need an assessed area of expertise. To add a different area of expertise, <a href="/sellers/edit">update your seller
                            profile.</a></p>
                    <LocalForm
                        action={props.assessmentUrl}
                        onSubmit={(val) => this.handleSubmit(val)}
                    >
                        <fieldset className="field" >
                            <legend> Please choose from the following areas: </legend>
                            {this.state.error && <a className="validation-message" href="#domain">
                                <span className="visuallyhidden">Validation Error: </span>
                                <span>Please pick one area of expertise</span>
                            </a>}
                            <Field id="domain" model=".domain" dynamic={false}>

                                {Object.keys(props.domains).map((key, i) => {

                                    let fieldId = `domain-${key}`;
                                    return (
                                        <span key={i}>
                                <input type="radio"
                                       name="domain"
                                       id={fieldId}
                                       value={key}
                                />
                                <label htmlFor={fieldId}>{props.domains[key]} <p>{
                                    find(domains, {'label':  props.domains[key]}) ?
                                        find(domains, {'label':  props.domains[key]})['description'] : ""

                                }</p></label>
                            </span>
                                    )
                                })}
                            </Field>
                        </fieldset>
                        <button type="submit">Request an assessment</button>
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
