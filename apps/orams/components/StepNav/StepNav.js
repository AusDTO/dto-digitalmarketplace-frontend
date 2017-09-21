import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import './StepNav.scss'

class StepNav extends React.Component {
  render() {
    const { buttonText } = this.props

    return (
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-9">
          <button type="submit" className="uikit-btn">
            {buttonText || 'Update profile'}
          </button>
        </div>
      </div>
    )
  }
}

StepNav.propTypes = {
  buttonText: PropTypes.string
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps
  }
}

export default connect(mapStateToProps)(StepNav)
