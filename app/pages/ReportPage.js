import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Switch, Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import ReportView from '../components/Reports/ReportView'
const itemData = require('../components/Reports/reportdata.json')
import { rootPath } from '../routes'

class ReportPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataLoaded: false
    }
  }

  render() {
    const { match } = this.props

    return (
      <div id="report-page">
        <Switch>
          <Route
            exact
            path={match.url}
            render={() => <ReportView {...this.props} data={itemData} dataLoaded={this.state.dataLoaded} />}
          />
          <Redirect to={{ pathname: `${rootPath}/reports` }} />
        </Switch>
      </div>
    )
  }
}

ReportPage.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
        image: PropTypes.string
      })
    )
  }),
  match: PropTypes.object
}

ReportPage.defaultProps = {
  data: {
    title: 'Marketplace Reports',
    items: [
      {
        text: '',
        image: ''
      }
    ]
  },
  match: () => ({ url: `${rootPath}/reports` })
}

const matchStateToProps = state => ({
  media: state.media
})

export default withRouter(connect(matchStateToProps)(ReportPage))