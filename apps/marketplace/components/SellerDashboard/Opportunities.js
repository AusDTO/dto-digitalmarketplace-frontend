import React, { Component } from 'react'
import { connect } from 'react-redux'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import differenceInSeconds from 'date-fns/difference_in_seconds'
import format from 'date-fns/format'
import { ErrorBoxComponent } from 'shared/form/ErrorBox'
import { loadOpportunities } from 'marketplace/actions/sellerDashboardActions'
import { rootPath } from 'marketplace/routes'
import styles from '../../main.scss'

const withdrawn = o => o.withdrawn_at && differenceInSeconds(new Date(), o.withdrawn_at) > 0
const closed = o => !withdrawn(o) && differenceInSeconds(new Date(), o.closed_at) > 0
const invited = o => !withdrawn(o) && !closed(o) && !o.responseCount
const getOpportunityLink = (o, text) => (
  <a href={`${rootPath}/digital-marketplace/opportunities/${o.briefId}`}>{text || o.name}</a>
)
const getStatusBadge = o => (
  <React.Fragment>
    {!withdrawn(o) && !closed(o) && o.responseCount && (
      <React.Fragment>
        {o.numberOfSuppliers && (
          <div className={`${styles.badge} ${styles.lightBlue}`}>{o.responseCount} Submitted</div>
        )}
        {!o.numberOfSuppliers && <div className={`${styles.badge} ${styles.lightBlue}`}>Submitted</div>}
      </React.Fragment>
    )}

    {invited(o) && <div className={`${styles.badge} ${styles.green}`}>Invited</div>}
    {withdrawn(o) && <div className={`${styles.badge} ${styles.lightGrey}`}>Withdrawn</div>}
    {closed(o) && <div className={`${styles.badge}`}>Closed</div>}
  </React.Fragment>
)

export class Opportunities extends Component {
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
          title="A problem occurred when loading the opportunities"
          errorMessage={errorMessage}
          setFocus={() => {}}
          form={{}}
          invalidFields={[]}
        />
      )
    }

    return (
      <div className={`${styles.marginTop1} row`}>
        <div className="col-xs-12">
          {items && items.length > 0 ? (
            <table className={`${styles.defaultStyle} col-xs-12`}>
              <thead>
                <tr className={styles.headingRow}>
                  <th scope="col" className={`${styles.tableColumnWidth1} ${styles.textAlignCenter}`}>
                    Id
                  </th>
                  <th scope="col" className={`${styles.tableColumnWidth7} ${styles.textAlignLeft}`}>
                    Name
                  </th>
                  <th scope="col" className={`${styles.tableColumnWidth5} ${styles.textAlignLeft}`}>
                    Canberra closing time
                  </th>
                  <th scope="col" className={`${styles.tableColumnWidth1} ${styles.textAlignLeft}`}>
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map(opportunity => (
                  <tr key={`opportunity.${opportunity.briefId}`}>
                    <td className={`${styles.tableColumnWidth1} ${styles.textAlignCenter}`}>{opportunity.briefId}</td>
                    <td className={styles.tableColumnWidth7}>
                      {getOpportunityLink(opportunity)}
                      <br />
                      {opportunity.lotName}
                    </td>
                    <td className={styles.tableColumnWidth5}>
                      {!withdrawn(opportunity) && format(opportunity.closed_at, 'dddd Do MMMM YYYY h:mmA')}
                    </td>
                    <td className={styles.tableColumnWidth1}>{getStatusBadge(opportunity)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className={`${styles.marginTop3} ${styles.marginBottom3}`}>Apply for opportunities</div>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  supplier: state.sellerDashboard.supplier.supplier,
  items: state.sellerDashboard.opportunities.items,
  loading: state.sellerDashboard.opportunities.loading,
  loadedAt: state.sellerDashboard.opportunities.loadedAt,
  errors: state.sellerDashboard.opportunities.errors,
  errorMessage: state.app.errorMessage
})

const mapDispatchToProps = dispatch => ({
  loadData: () => dispatch(loadOpportunities())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Opportunities)
