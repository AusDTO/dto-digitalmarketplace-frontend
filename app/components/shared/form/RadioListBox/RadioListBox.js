import React from 'react'
import PropTypes from 'prop-types'
import { Control } from 'react-redux-form'

import StatefulError from '../StatefulError'
import styles from './RadioListBox.scss'
import classNames from 'classnames'

const RadioListBox = props => {
  const { id, label, name, options, model, messages, validators } = props
  /*eslint-disable jsx-a11y/label-has-for*/
  const uiKitControl = classNames('uikit-control-input', 'uikit-control-input--full', styles.uiKitControl)

  return (
    <div className="field">
      <fieldset>
        <legend>
          {label}
        </legend>
        <StatefulError model={model} messages={messages} id={id} />
        <div>
          {options.map((option, i) => {
            let fieldId = `${id}-${option.value}`
            return (
              <span key={i} className={styles.radioListContainer}>
                <span className={uiKitControl}>
                  <Control.radio
                    model={model}
                    name={name}
                    id={fieldId}
                    mapProps={{
                      className: 'uikit-control-input__input'
                    }}
                    value={option.value}
                    validators={validators}
                  />
                  <label className="uikit-control-input__text" htmlFor={fieldId}>
                    {option.label}
                  </label>
                </span>
              </span>
            )
          })}
        </div>
      </fieldset>
    </div>
  )
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
