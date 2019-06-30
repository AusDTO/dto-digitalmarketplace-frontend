import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-redux-form'
import DocumentTitle from 'react-document-title'
import { required } from 'marketplace/components/validators'
import RadioList from 'shared/form/RadioList'

const BuyerAwardSeller = ({ model, suppliersResponded, handleSubmit, workOrderCreated }) => (
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
  handleSubmit: null,
  workOrderCreated: true
}

BuyerAwardSeller.propTypes = {
  model: PropTypes.string.isRequired,
  suppliersResponded: PropTypes.array.isRequired,
  handleSubmit: PropTypes.func,
  workOrderCreated: PropTypes.bool
}

export default BuyerAwardSeller
