import React, { Component } from 'react'
import { connect } from 'react-redux'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import { loadServices } from 'marketplace/actions/sellerDashboardActions'
import styles from './SellerDashboard.scss'

export class Services extends Component {
  componentDidMount() {
    if (!this.props.currentlySending) {
      this.props.loadData()
    }
  }

  serviceIdToHash = item => {
    let result = ''
    switch (item.service_id) {
      case 1:
        result = 'strategy'
        break
      case 3:
        result = 'userresearch'
        break
      case 4:
        result = 'deliverygov'
        break
      case 6:
        result = 'engineering'
        break
      case 7:
        result = 'contentpub'
        break
      case 8:
        result = 'cyber'
        break
      case 9:
        result = 'marketingcomms'
        break
      case 10:
        result = 'ops'
        break
      case 11:
        result = 'datasci'
        break
      case 13:
        result = 'emergtech'
        break
      case 14:
        result = 'changeTrans'
        break
      case 15:
        result = 'tld'
        break
      default:
        break
    }
    return `#${result}`
  }

  serviceStatusToDisplay = item => {
    if (item.active_assessment && item.status === 'unassessed') {
      return <div className={`${styles.badge} ${styles.requested}`}>Requested</div>
    }
    switch (item.status) {
      case 'unassessed':
        return <div className={`${styles.unassessed}`}>Unassessed</div>
      case 'assessed':
        return <div className={`${styles.badge} ${styles.approved}`}>Approved</div>
      case 'rejected':
        return <div className={`${styles.badge} ${styles.rejected}`}>Rejected</div>
      default:
        return ''
    }
  }

  render() {
    if (this.props.currentlySending) {
      return <LoadingIndicatorFullPage />
    }

    return (
      <div className="row">
        <div className="col-xs-12">
          {this.props.items.length > 0 ? (
            <table className={`${styles.resultListing} col-xs-12`}>
              <thead>
                <tr className={styles.headingRow}>
                  <th scope="col" className={styles.colService}>
                    Services
                  </th>
                  <th scope="col" className={styles.colAssessmentCriteria}>
                    Assessment criteria
                  </th>
                  <th scope="col" className={styles.colStatus}>
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.props.items.map(item => (
                  <tr key={`service.${item.id}`}>
                    <td className={styles.colService}>{item.service}</td>
                    <td className={styles.colAssessmentCriteria}>
                      <a
                        target="_blank"
                        href={`https://marketplace1.zendesk.com/hc/en-gb/articles/333757011655-Assessment-criteria${this.serviceIdToHash(
                          item
                        )}`}
                      >
                        View criteria
                      </a>
                      <a
                        target="_blank"
                        href={`https://marketplace1.zendesk.com/hc/en-gb/articles/360000556476${this.serviceIdToHash(
                          item
                        )}`}
                      >
                        View rates
                      </a>
                    </td>
                    <td className={styles.colStatus}>{this.serviceStatusToDisplay(item)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            'No services'
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  items: state.sellerDashboard.services.items,
  loadSuccess: state.sellerDashboard.loadServicesSuccess,
  currentlySending: state.app.currentlySending
})

const mapDispatchToProps = dispatch => ({
  loadData: () => dispatch(loadServices())
})

export default connect(mapStateToProps, mapDispatchToProps)(Services)
