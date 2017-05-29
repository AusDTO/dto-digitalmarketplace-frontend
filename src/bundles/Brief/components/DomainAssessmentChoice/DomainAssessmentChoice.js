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
                    <h1>Choose Assessment Area of Expertise</h1>
                </header>
                <article role="main">
                    <p>Before you apply for this opportunity, we need to assess one area of expertise. <br/>
                        If you wish to add a different area of expertise, you will need to <a href="/sellers/edit">update your seller
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
