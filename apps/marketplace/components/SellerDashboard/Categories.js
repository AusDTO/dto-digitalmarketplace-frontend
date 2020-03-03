import React, { Component } from 'react'
import { connect } from 'react-redux'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import { ErrorBoxComponent } from 'shared/form/ErrorBox'
import { loadCategories } from 'marketplace/actions/sellerDashboardActions'
import { rootPath } from 'marketplace/routes'
import { categoryIdToHash } from 'marketplace/components/helpers'
import styles from '../../main.scss'

export class Categories extends Component {
  componentDidMount() {
    this.props.loadCategories()
  }

  getStatusBadge = category => {
    switch (category.status) {
      case 'unassessed':
        return <div className={`${styles.darkGrayText}`}>-</div>
      case 'draft':
        if (category.previous_evidence_id) {
          return <div className={`${styles.badge} ${styles.red}`}>Unsuccessful</div>
        }
        return <div className={`${styles.badge} ${styles.yellow}`}>In draft</div>
      case 'submitted':
        return <div className={`${styles.badge} ${styles.lightBlue}`}>Submitted</div>
      case 'assessed':
        return <div className={`${styles.badge} ${styles.green}`}>Approved</div>
      case 'rejected':
        return <div className={`${styles.badge} ${styles.red}`}>Unsuccessful</div>
      default:
        return ''
    }
  }

  getCriteriaLinks = categoryId => (
    <React.Fragment>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={`https://marketplace1.zendesk.com/hc/en-gb/articles/333757011655-Assessment-criteria${categoryIdToHash(
          categoryId
        )}`}
        className={styles.marginRight1}
      >
        View criteria
      </a>
      <a
        href={`https://marketplace1.zendesk.com/hc/en-gb/articles/360000556476${categoryIdToHash(categoryId)}`}
        className={styles.marginRight1}
      >
        View rates
      </a>
    </React.Fragment>
  )

  getActionsLinks = category => {
    switch (category.status) {
      case 'unassessed':
        return (
          <React.Fragment>
            {this.getCriteriaLinks(category.id)}
            <a href={`${rootPath}/seller-assessment/create/${category.id}`}>Request assessment</a>
          </React.Fragment>
        )
      case 'draft':
        return (
          <React.Fragment>
            <a
              href={`${rootPath}/seller-assessment/${category.evidence_id}/introduction`}
              className={styles.marginRight1}
            >
              Continue editing
            </a>
            {category.previous_evidence_id && (
              <a href={`${rootPath}/seller-assessment/${category.previous_evidence_id}/feedback`}>View feedback</a>
            )}
          </React.Fragment>
        )
      case 'assessed':
        return (
          <React.Fragment>
            {category.is_approved && category.rate && (
              <span>
                Your maximum daily rate (including GST): ${category.rate}
                <br />
              </span>
            )}
            <a href="https://marketplace1.zendesk.com/hc/en-gb/requests/new" rel="noopener noreferrer" target="_blank">
              Contact us to adjust your rate
            </a>
            <br />
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`${rootPath}/seller-assessment/${category.evidence_id}/view`}
              className={styles.marginRight1}
            >
              View Submitted Assessment
            </a>
          </React.Fragment>
        )
      case 'rejected':
        return (
          <React.Fragment>
            <a href={`${rootPath}/seller-assessment/${category.evidence_id}/feedback`} className={styles.marginRight1}>
              View feedback
            </a>
            <a href={`${rootPath}/seller-assessment/create/${category.id}`}>Resubmit</a>
          </React.Fragment>
        )
      case 'submitted':
        return (
          <React.Fragment>
            <p>The Marketplace is reviewing your request for assessment.</p>
            <a
              href={`${rootPath}/seller-assessment/${category.evidence_id}/view`}
              className={styles.marginRight1}
            >
              View Submitted Assessment
            </a>
          </React.Fragment>
        )
      default:
        return ''
    }
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
        <div className={`${styles.marginTop2} row`}>
          <div className="col-xs-12">
            {categories && categories.length > 0 ? (
              <table className={`${styles.defaultStyle} ${styles.marginBottom3}  col-xs-12`}>
                <thead>
                  <tr className={styles.headingRow}>
                    <th scope="col" className={`${styles.tableColumnWidth7} ${styles.textAlignLeft}`}>
                      Category
                    </th>
                    <th scope="col" className={`${styles.tableColumnWidth2} ${styles.textAlignLeft}`}>
                      Status
                    </th>
                    <th scope="col" className={`${styles.tableColumnWidth10} ${styles.textAlignLeft}`}>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map(category => (
                    <tr key={`service.${category.id}`}>
                      <td className={styles.tableColumnWidth7}>{category.name}</td>
                      <td className={styles.tableColumnWidth2}>{this.getStatusBadge(category)}</td>
                      <td className={styles.tableColumnWidth10}>{this.getActionsLinks(category)}</td>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Categories)
