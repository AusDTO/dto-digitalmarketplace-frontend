/* eslint-disable */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Switch, Route } from 'react-router-dom'
import PriceHistory from 'orams/components/PriceHistory/PriceHistory'
import {
  loadBuyerSuppliers
} from 'orams/actions/priceHistoryActions'

class PriceHistoryPage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.loadBuyerSuppliers()
  }

  render() {
    const { match } = this.props

    return (
      <Switch>
        <Route
          exact
          path={match.url}
          render={() =>
            <PriceHistory
              {...this.props}
            />}
        />
      </Switch>
    )
  }
}

PriceHistoryPage.propTypes = {
  match: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    buyerSuppliers: state.priceHistory.buyerSuppliers
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadBuyerSuppliers: () => dispatch(loadBuyerSuppliers())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PriceHistoryPage))
