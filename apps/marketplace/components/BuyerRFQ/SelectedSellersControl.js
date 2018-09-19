import React from 'react'
import PropTypes from 'prop-types'
import { Control } from 'react-redux-form'
import StatefulError from 'shared/form/StatefulError'
import styles from './SelectedSellersControl.scss'

const SelectedSellers = props => (
  <div>
    {Object.keys(props.value).length > 0 && (
      <ol id={props.id} className={styles.selectedSellers}>
        {Object.keys(props.value).map(sellerCode => (
          <li key={sellerCode}>
            {props.value[sellerCode].name}
            <a
              href="#remove"
              onClick={e => {
                e.preventDefault()
                props.onRemoveClick(sellerCode)
              }}
            >
              Remove
            </a>
          </li>
        ))}
      </ol>
    )}
    {props.messages && (
      <StatefulError model={props.formModel} messages={props.messages} showMessagesDuringFocus="false" id={props.id} />
    )}
  </div>
)

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
