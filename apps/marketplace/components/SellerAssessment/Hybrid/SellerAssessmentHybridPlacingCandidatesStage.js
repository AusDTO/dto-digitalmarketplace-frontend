import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { actions, Form } from 'react-redux-form'
import formProps from 'shared/form/formPropsSelector'
import AUheading from '@gov.au/headings/lib/js/react.js'
import RadioList from 'shared/form/RadioList'
import ErrorAlert from 'marketplace/components/Alerts/ErrorAlert'

export class SellerAssessmentHybridPlacingCandidatesStage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const categories = [
      {
        value: '',
        text: 'Select category'
      }
    ]
    this.props.domains.map(domain => {
      categories.push({
        value: domain.id,
        text: domain.name
      })
      return true
    })

    return (
      <Form
        model={this.props.model}
        validators={{
          '': {
            requiredChoice: formValues => formValues.placingCandidates
          }
        }}
        onSubmit={this.props.onSubmit}
        onSubmitFailed={this.props.onSubmitFailed}
        validateOn="submit"
      >
        <AUheading level="1" size="xl">
          Placing candidates
        </AUheading>
        <p> Your business will be placing candidates for  roles by submitting</p>
        <ErrorAlert
          model={this.props.model}
          messages={{
            requiredChoice: 'You must select who can respond'
          }}
        />
        <div>
          <RadioList
            id="placingCandidates"
            label=""
            name="placingCandidates"
            model={`${this.props.model}.placingCandidates`}
            options={[
              {
                label: 'contractors you organised through recruitment activities',
                value: 'recruitment'
              },
              {
                label: 'your own conusultants',
                value: 'consultants'
              },
              {
                label: 'both contractors and consultants',
                value: 'hybrid'
              }
            ]}
            messages={{}}
          />
        </div>
        {this.props.formButtons}
      </Form>
    )
  }
}

SellerAssessmentHybridPlacingCandidatesStage.defaultProps = {
  onSubmit: () => {},
  onSubmitFailed: () => {}
}

SellerAssessmentHybridPlacingCandidatesStage.propTypes = {
  model: PropTypes.string.isRequired,
  formButtons: PropTypes.node.isRequired,
  onSubmit: PropTypes.func,
  onSubmitFailed: PropTypes.func
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model),
  domains: state.brief.domains
})

export default connect(
  mapStateToProps
)(SellerAssessmentHybridPlacingCandidatesStage)

// export const done = formValues =>
//   formValues.placingCandidatesRadio

// const SellerAssessmentCandidatePool = props => (
//   <Form
//     model={props.model}
//     onSubmit={props.onSubmit}
//     onSubmitFailed={props.onSubmitFailed}
//     validateOn="submit"
//   >
//     <AUheadings level="1" size="xl">
//       Placing candidates
//     </AUheadings>
//     <p>
//     Your business will be placing candidates for  {props.meta.domain.name} roles by submitting:
//     </p>
  
//   <AUradio
//     model={`${props.model}.placingCandidatesRadio`}
//     label="contractors you organised through recruitment activies" 
//     name="radio-ex" 
//     id="radio-recrutierOnly-block" 
//     block defaultChecked 
//     />

//   <AUradio
//     model={`${props.model}.placingCandidatesRadio`}
//     label="your own consultants" 
//     name="radio-ex" 
//     id="radio-consultantOnly-block" 
//     block
//   />

//   <AUradio
//     model={`${props.model}.placingCandidatesRadio`}
//     label="both contractors and consultants" 
//     name="radio-ex" 
//     id="radio-Hybrid-block" 
//     block 
//   />
//     {props.formButtons}
//   </Form>
// )

// SellerAssessmentCandidatePool.defaultProps = {
//   onSubmit: () => {},
//   onSubmitFailed: () => {}
// }

// SellerAssessmentCandidatePool.propTypes = {
//   model: PropTypes.string.isRequired,
//   formButtons: PropTypes.node.isRequired,
//   meta: PropTypes.object.isRequired,
//   onSubmit: PropTypes.func,
//   onSubmitFailed: PropTypes.func
// }

// const mapStateToProps = (state, props) => ({
//   ...formProps(state, props.model)
// })

// export default connect(mapStateToProps)(SellerAssessmentCandidatePool)
