import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { createBriefResponse } from 'marketplace/actions/briefActions'
import { ErrorBoxComponent } from 'shared/form/ErrorBox'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'

class BriefResponseCreatePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      briefResponseId: null,
      loading: true
    }
  }

  componentDidMount() {
    const briefId = this.props.match.params.briefId
    if (briefId) {
      this.props.createBriefResponse(briefId).then(response => {
        if (response.status === 200) {
          this.setState({
            briefResponseId: parseInt(response.data.id, 10),
            loading: false
          })
        }
      })
    }
  }

  render() {
    if (this.props.errorMessage) {
      let hasFocused = false
      const setFocus = e => {
        if (!hasFocused) {
          hasFocused = true
          e.focus()
        }
      }
      return (
        <ErrorBoxComponent
          title="A problem occurred when loading the assessment details"
          errorMessage={this.props.errorMessage}
          setFocus={setFocus}
          form={{}}
          invalidFields={[]}
        />
      )
    }

    if (this.state.briefResponseId) {
      return <Redirect to={`respond/${this.state.briefResponseId}`} />
    }

    return <LoadingIndicatorFullPage />
  }
}

const mapStateToProps = state => ({
  errorMessage: state.app.errorMessage
})

const mapDispatchToProps = dispatch => ({
  createBriefResponse: briefId => dispatch(createBriefResponse(briefId))
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(BriefResponseCreatePage)
)
