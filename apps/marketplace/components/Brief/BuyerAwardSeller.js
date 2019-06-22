import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-redux-form'
import DocumentTitle from 'react-document-title'
// import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'
// import AUheadings from '@gov.au/headings/lib/js/react.js'
import { required } from 'marketplace/components/validators'
// import ErrorBox from 'shared/form/ErrorBox'
import RadioList from 'shared/form/RadioList'

// import styles from './BriefSpecialistResponseForm2.scss'

const BuyerAwardSeller = ({ model, submitClicked, suppliersResponded, handleSubmit, workOrderCreated }) => (
  <div className="row">
    <DocumentTitle title="Award which seller? - Digital Marketplace">
      <div className="col-sm-push-2 col-sm-8 col-xs-12">
        <article role="main">
          <div>
            <Form model={model} id="buyerAwardSeller" onSubmit={data => handleSubmit(data)}>
              <h2 className="au-display-lg">Award which seller?</h2>
              <RadioList
                id="awardedSupplierCode"
                label={``}
                name="awardedSupplierCode"
                model={`${model}.awardedSupplierCode`}
                validators={{
                  required
                }}
                options={suppliersResponded.map(s => ({ label: s.supplier_name, value: `${s.supplier_code}` }))}
                messages={{
                  required: `A seller must be selected`
                }}
              />
              <span>
                <input
                  className="au-btn right-button-margin"
                  type="submit"
                  disabled={workOrderCreated || suppliersResponded.length === 0}
                  value="Save and continue"
                  onClick={e => {
                    submitClicked(e)
                  }}
                />
              </span>
            </Form>
          </div>
        </article>
      </div>
    </DocumentTitle>
  </div>
)

BuyerAwardSeller.defaultProps = {
  model: '',
  suppliersResponded: [],
  submitClicked: null,
  handleSubmit: null,
  workOrderCreated: true
}

BuyerAwardSeller.propTypes = {
  model: PropTypes.string.isRequired,
  suppliersResponded: PropTypes.array.isRequired,
  submitClicked: PropTypes.func,
  handleSubmit: PropTypes.func,
  workOrderCreated: PropTypes.bool
}

export default BuyerAwardSeller
