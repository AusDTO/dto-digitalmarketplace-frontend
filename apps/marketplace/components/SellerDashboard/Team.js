import AUbutton from '@gov.au/buttons/lib/js/react.js'
import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import { ErrorBoxComponent } from 'shared/form/ErrorBox'
import { loadTeam, removeUser } from 'marketplace/actions/sellerDashboardActions'
import styles from './SellerDashboard.scss'

export class Team extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showRemoveAlert: false,
      toRemoveUser: null
    }

    this.handleRemoveClicked = this.handleRemoveClicked.bind(this)
  }

  componentDidMount() {
    if (!this.props.loading && !this.props.errors) {
      this.props.loadData()
    }
  }

  handleYesClick = () => {
    const { toRemoveUser } = this.state
    this.props.handleRemoveClick(toRemoveUser.id)
    this.setState({
      toRemoveUser: null,
      showRemoveAlert: false
    })
  }

  handleRemoveClicked = item => {
    this.setState({
      toRemoveUser: item,
      showRemoveAlert: true
    })
  }

  handleNoClicked = () => {
    this.setState({
      toRemoveUser: null,
      showRemoveAlert: false
    })
  }

  render() {
    const {
      items,
      loading,
      errors,
      errorMessage
    } = this.props

    if (loading) {
      return <LoadingIndicatorFullPage />
    }
    if (errors) {
      return (
        <ErrorBoxComponent
          title="A problem occurred when loading the team details"
          errorMessage={errorMessage}
          setFocus={() => {}}
          form={{}}
          invalidFields={[]}
        />
      )
    }

    return (
      <div>
        {this.state.showRemoveAlert && (
          <div className="row">
            <div className="col-xs-12">
              <AUpageAlert as="warning">
                <p>{`Are you sure you want to remove ${this.state.toRemoveUser.name}?`}</p>
                <AUbutton onClick={this.handleYesClick}>Yes, remove</AUbutton>
                <AUbutton as="secondary" onClick={this.handleNoClicked}>
                  Do not remove
                </AUbutton>
              </AUpageAlert>
            </div>
          </div>
        )}
        <div className="row">
          <div className="col-xs-12">
            {items.length > 0 ? (
              <table className={`${styles.resultListing} col-xs-12`}>
                <thead>
                  <tr className={styles.headingRow}>
                    <th scope="col" className={styles.colName}>
                      Name
                    </th>
                    <th scope="col" className={styles.colEmail}>
                      Email
                    </th>
                    <th scope="col" className={styles.colAction}>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items.map(item => (
                    <tr key={`team.${item.email}`}>
                      <td className={styles.colName}>{item.name}</td>
                      <td className={styles.colEmail}>
                        {item.email}
                        {item.type === 'ar' ? (
                          <span className={`${styles.badge} ${styles.authorisedrepresentative}`}>
                            Authorised representative
                          </span>
                        ) : (
                          ''
                        )}
                      </td>
                      <td className={styles.colAction}>
                        {item.type === 'ar' ? (
                          <a href="/sellers/edit/?step=your-info">Change representative</a>
                        ) : (
                          <a href="#remove" onClick={() => this.handleRemoveClicked(item)}>
                            Remove
                          </a>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              'No team members'
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-xs-3">
            <a href="/sellers/invite-user" className="au-btn au-btn--secondary">
              Add new person
            </a>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  items: state.sellerDashboard.team.items,
  loading: state.sellerDashboard.team.loading,
  errors: state.sellerDashboard.team.errors,
  errorMessage: state.app.errorMessage
})

const mapDispatchToProps = dispatch => ({
  loadData: () => dispatch(loadTeam()),
  handleRemoveClick: userId => dispatch(removeUser(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Team)
