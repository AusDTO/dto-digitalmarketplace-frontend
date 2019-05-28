import React, { Component } from 'react'
import { connect } from 'react-redux'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import { ErrorBoxComponent } from 'shared/form/ErrorBox'
import { loadCategories } from 'marketplace/actions/sellerDashboardActions'
import { rootPath } from 'marketplace/routes'
import styles from './SellerDashboard.scss'

export class Categories extends Component {
  componentDidMount() {
    this.props.loadCategories()
  }

  getStatusBadge = category => {
    switch (category.status) {
      case 'unassessed':
        return <div className={`${styles.unassessed}`}>Unassessed</div>
      case 'draft':
        if (category.is_approved) {
          return <div className={`${styles.badge} ${styles.approved}`}>Approved</div>
        }
        return <div className={`${styles.badge} ${styles.submitted}`}>In draft</div>
      case 'submitted':
        return <div className={`${styles.badge} ${styles.submitted}`}>Submitted</div>
      case 'assessed':
        return <div className={`${styles.badge} ${styles.approved}`}>Approved</div>
      case 'rejected':
        return <div className={`${styles.badge} ${styles.rejected}`}>Rejected</div>
      default:
        return ''
    }
  }

  getActionLink = category => {
    switch (category.status) {
      case 'unassessed':
        return <a href={`${rootPath}/seller-assessment/create/${category.id}`}>Request assessment</a>
      case 'draft':
        return <a href={`${rootPath}/seller-assessment/${category.evidence_id}/introduction`}>Continue editing</a>
      case 'assessed':
        return <a href={`${rootPath}/seller-assessment/create/${category.id}`}>Adjust pricing</a>
      case 'rejected':
        return (
          <React.Fragment>
            <a href={`${rootPath}/seller-assessment/${category.evidence_id}/feedback`}>View feedback</a>
            <a href={`${rootPath}/seller-assessment/create/${category.id}`}>Resubmit</a>
          </React.Fragment>
        )
      case 'submitted':
      default:
        return ''
    }
  }

  categoryIdToHash = domainId => {
    let result = ''
    switch (domainId) {
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

  render() {
    const { errorMessage, loading, categories } = this.props

    if (loading) {
      return <LoadingIndicatorFullPage />
    }
    if (errorMessage) {
      return (
        <ErrorBoxComponent
          title="A problem occurred when loading the service details"
          errorMessage={errorMessage}
          setFocus={() => {}}
          form={{}}
          invalidFields={[]}
        />
      )
    }

    return (
      <div>
        <div className={`${styles.tableMargin} row`}>
          <div className="col-xs-12">
            {categories && categories.length > 0 ? (
              <table className={`${styles.resultListing} col-xs-12`}>
                <thead>
                  <tr className={styles.headingRow}>
                    <th scope="col" className={styles.colService}>
                      Category
                    </th>
                    <th scope="col" className={styles.colStatus}>
                      Status
                    </th>
                    <th scope="col" className={styles.colAssessmentAction}>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map(category => (
                    <tr key={`service.${category.id}`}>
                      <td className={styles.colService}>{category.name}</td>
                      <td className={styles.colStatus}>{this.getStatusBadge(category)}</td>
                      <td className={styles.colAssessmentAction}>
                        <a
                          target="_blank"
                          href={`https://marketplace1.zendesk.com/hc/en-gb/articles/333757011655-Assessment-criteria${this.categoryIdToHash(
                            category.id
                          )}`}
                        >
                          View criteria
                        </a>
                        <a
                          target="_blank"
                          href={`https://marketplace1.zendesk.com/hc/en-gb/articles/360000556476${this.categoryIdToHash(
                            category.id
                          )}`}
                        >
                          View rates
                        </a>
                        {this.getActionLink(category)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              'No categories'
            )}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.sellerDashboard.categories.loading,
  categories: state.sellerDashboard.categories.items,
  errorMessage: state.app.errorMessage
})

const mapDispatchToProps = dispatch => ({
  loadCategories: () => dispatch(loadCategories())
})

export default connect(mapStateToProps, mapDispatchToProps)(Categories)
