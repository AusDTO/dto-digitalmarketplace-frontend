import React from 'react'
import PropTypes from 'prop-types'
import { Control } from 'react-redux-form'
import AUheading from '@gov.au/headings/lib/js/react.js'
import StatefulError from 'shared/form/StatefulError'
import styles from './SelectedSellersControl.scss'

export const SelectedSellers = props => {
  const { value, onRemoveClick, id, formModel, messages } = props
  return (
    <div>
      {Object.keys(value).length > 0 && (
        <div>
          <AUheading level="2" size="sm">
            Sellers to be invited
          </AUheading>
          <ul id={id} className={styles.selectedSellers}>
            {Object.keys(value).map(sellerCode => (
              <li key={sellerCode}>
                {value[sellerCode].name}
                <a
                  href="#remove"
                  onClick={e => {
                    e.preventDefault()
                    onRemoveClick(sellerCode)
                  }}
                >
                  Remove
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      {messages && <StatefulError model={formModel} messages={messages} showMessagesDuringFocus="false" id={id} />}
    </div>
  )
}

SelectedSellers.defaultProps = {
  messages: {},
  onRemoveClick: () => {},
  value: {}
}

SelectedSellers.propTypes = {
  id: PropTypes.string.isRequired,
  formModel: PropTypes.string.isRequired,
  messages: PropTypes.object,
  onRemoveClick: PropTypes.func,
  value: PropTypes.object
}

const SelectedSellersControl = props => (
  <Control.custom
    id={props.id}
    component={SelectedSellers}
    onRemoveClick={props.onRemoveClick}
    model={props.model}
    mapProps={{
      value: ownProps => ownProps.modelValue,
      formModel: ownProps => ownProps.model
    }}
    validators={props.validators}
    messages={props.messages}
  />
)

SelectedSellersControl.defaultProps = {
  validators: {},
  messages: {}
}

SelectedSellersControl.propTypes = {
  onRemoveClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  model: PropTypes.string.isRequired,
  validators: PropTypes.object,
  messages: PropTypes.object
}

export default SelectedSellersControl
