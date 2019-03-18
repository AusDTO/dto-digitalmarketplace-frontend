import PropTypes from 'prop-types'
import differenceInSeconds from 'date-fns/difference_in_seconds'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import { ErrorBoxComponent } from 'shared/form/ErrorBox'
import { loadTeam } from 'marketplace/actions/sellerDashboardActions'
import styles from './SellerDashboard.scss'

export class Team extends Component {
  componentDidMount() {
    const { loading, errors, loadedAt } = this.props

    if (!loading && !errors) {
      const difference = differenceInSeconds(new Date(), loadedAt)
      if (difference > 60) {
        this.props.loadData()
      }
    }
  }

  render() {
    const { items, loading, errors, errorMessage } = this.props

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
                          <div className={`${styles.badge} ${styles.authorisedrepresentative}`}>
                            Authorised representative
                          </div>
                        ) : (
                          ''
                        )}
                      </td>
                      <td className={styles.colAction}>
                        {item.type === 'ar' ? (
                          <a href="/sellers/edit/?step=your-info">Change representative</a>
                        ) : (
                          <a href="#remove" onClick={() => this.props.removeClicked(item)}>
                            Remove
                          </a>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className={styles.noRecords}>
                No team members
              </div>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-3">
            <a href="/sellers/invite-user" className="au-btn au-btn--secondary">
              Add new person
            </a>
          </div>
        </div>
      </div>
    )
  }
}

Team.propTypes = {
  removeClicked: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  items: state.sellerDashboard.team.items,
  loading: state.sellerDashboard.team.loading,
  loadedAt: state.sellerDashboard.team.loadedAt,
  errors: state.sellerDashboard.team.errors,
  errorMessage: state.app.errorMessage
})

const mapDispatchToProps = dispatch => ({
  loadData: () => dispatch(loadTeam())
})

export default connect(mapStateToProps, mapDispatchToProps)(Team)
