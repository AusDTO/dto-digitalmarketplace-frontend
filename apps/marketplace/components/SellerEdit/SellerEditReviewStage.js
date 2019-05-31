import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Form } from 'react-redux-form'
import formProps from 'shared/form/formPropsSelector'
import AUheading from '@gov.au/headings/lib/js/react.js'

const SellerEditReviewStage = props => (
  <Form model={props.model} onSubmit={props.onSubmit} validators={{}}>
    <div>
      <AUheading level="1" size="xl">
        Accept the new Master Agreement from July 1st 2019
      </AUheading>
      <p>
        Your authorised representative "name" will be able to accept or decline the Master Agreement from July 1st 2019.
      </p>
      <p>
        We recommend you view and circulate the new Master Agreement with the relevant parties before this date.
      </p>
      <p>
        <a href="#"
          rel="noopener noreferrer"
          target="_blank">Download Master Agreement [TODO]</a><br />
        <a href="#"
          rel="noopener noreferrer"
          target="_blank">View Master Agreement in HTML [TODO]</a>
      </p>
    </div>
  </Form>
)

SellerEditReviewStage.defaultProps = {
  onSubmit: () => { },
  stagesTodo: []
}

SellerEditReviewStage.propTypes = {
  model: PropTypes.string.isRequired,
  formButtons: PropTypes.node.isRequired,
  stagesTodo: PropTypes.array,
  onSubmit: PropTypes.func
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

export default connect(mapStateToProps)(SellerEditReviewStage)
