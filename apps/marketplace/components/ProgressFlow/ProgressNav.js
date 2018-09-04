import React from 'react'
import PropTypes from 'prop-types'
import AUprogressIndicator from '@gov.au/progress-indicator/lib/js/react.js'

const ProgressFlow = props => {
  const items = props.items.slice(0)
  const { onNavChange } = props
  items.map(item => {
    const newItem = item
    newItem.onClick = () => {
      onNavChange(item)
    }
    return newItem
  })

  return <AUprogressIndicator items={items} />
}

ProgressFlow.defaultProps = {
  onNavChange: () => {}
}

ProgressFlow.propTypes = {
  items: PropTypes.array.isRequired,
  onNavChange: PropTypes.func
}

export default ProgressFlow
