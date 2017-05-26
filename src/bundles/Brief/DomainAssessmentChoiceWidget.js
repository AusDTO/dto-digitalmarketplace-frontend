import React from 'react'
import RegisterComponent from '../../RegisterComponent'

import DomainAssessmentChoice from './components/DomainAssessmentChoice'

export const DomainAssessmentChoiceWidget = (props) => {
    return (

            <div className="row">
                <div className="col-sm-push-2 col-sm-8 col-xs-12">
                <DomainAssessmentChoice {...props}/>
                </div>
            </div>
    )
}

export default new RegisterComponent({ "domain-choice": DomainAssessmentChoiceWidget })
