import React from 'react'
import PropTypes from 'prop-types'
import { Control } from 'react-redux-form'
import classNames from 'classnames'

import StatefulError from '../StatefulError'
import styles from './RadioListBox.scss'

const RadioListBox = props => {
  const { id, label, name, options, model, messages, validators } = props
  const uiKitControl = classNames(
    'radioListBoxElement',
    'au-control-input',
    'au-control-input--full',
    styles.uiKitControl
  )

  return (
    <div className="field">
      <fieldset>
        <legend>
          {label}
        </legend>
        <div>
          {options.map(option => {
            const fieldId = `${id}-${option.value}`
            return (
              <span key={fieldId} className={styles.radioListContainer}>
                <span className={uiKitControl}>
                  <Control.radio
                    model={model}
                    name={name}
                    id={fieldId}
                    mapProps={{
                      className: 'au-control-input__input'
                    }}
                    value={option.value}
                    validators={validators}
                  />
                  <label className="au-control-input__text" htmlFor={fieldId}>
                    {option.label}
                  </label>
                </span>
              </span>
            )
          })}
        </div>
        <StatefulError
          model={model}
          messages={messages}
          id={`${id}-${options[0].value}`}
          showMessagesDuringFocus="false"
        />
      </fieldset>
    </div>
  )
}

RadioListBox.defaultProps = {
  validators: null,
  messages: null
}

RadioListBox.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  model: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })
  ).isRequired,

  validators: PropTypes.object,
  messages: PropTypes.object
}

export default RadioListBox
