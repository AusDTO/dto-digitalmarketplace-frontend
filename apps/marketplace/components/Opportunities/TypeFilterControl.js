import React from 'react'
import PropTypes from 'prop-types'
import { Control } from 'react-redux-form'
import styles from './Opportunities.scss'

const TypeFilter = props => (
  <a
    href={`#${props.filter}`}
    onClick={e => {
      e.preventDefault()
      props.onChange(e)
      props.submitForm()
    }}
    data-filter={props.filter}
    className={`${styles.filter} ${props.value && styles.active}`}
  >
    {props.name}
  </a>
)

TypeFilter.propTypes = {
  name: PropTypes.string.isRequired,
  filter: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired,
  value: PropTypes.bool.isRequired
}

const TypeFilterControl = props => (
  <Control.checkbox
    component={TypeFilter}
    model={props.model}
    submitForm={props.submitForm}
    name={props.name}
    filter={props.filter}
    mapProps={{
      onChange: ownProps => ownProps.onChange,
      value: ownProps => ownProps.modelValue
    }}
  />
)

export default TypeFilterControl
