import React, { Component } from 'react'
import { connect } from 'react-redux'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import differenceInSeconds from 'date-fns/difference_in_seconds'
import format from 'date-fns/format'
import { ErrorBoxComponent } from 'shared/form/ErrorBox'
import { loadOpportunities } from 'marketplace/actions/sellerDashboardActions'
import { rootPath } from 'marketplace/routes'
import styles from './SellerDashboard.scss'
import mainStyles from '../../main.scss'

const closed = o => differenceInSeconds(new Date(), o.closed_at) > 0
const invited = o => !closed(o) && !o.responseCount
const getOpportunityLink = (o, text) => (
  <a href={`${rootPath}/digital-marketplace/opportunities/${o.briefId}`}>{text || o.name}</a>
)
const getStatusBadge = o => (
  <React.Fragment>
    {o.numberOfSuppliers && o.responseCount && (
      <div className={`${mainStyles.badge} ${mainStyles.completed}`}>{o.responseCount} submitted</div>
    )}
    {!o.numberOfSuppliers && o.responseCount && (
      <div className={`${mainStyles.badge} ${mainStyles.completed}`}>Submitted</div>
    )}
    {invited(o) && <div className={`${mainStyles.badge} ${mainStyles['ready-for-action']}`}>Invited</div>}
    {closed(o) && <div className={`${mainStyles.badge}`}>Closed</div>}
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
      <div className={`${styles.tableMargin} row`}>
        <div className="col-xs-12">
          {items && items.length > 0 ? (
            <table className={`${styles.resultListing} col-xs-12`}>
              <thead>
                <tr className={styles.headingRow}>
                  <th scope="col" className={`${styles.colId}`}>
                    Id
                  </th>
                  <th scope="col" className={mainStyles['table-column-width-7x']}>
                    Name
                  </th>
                  <th scope="col" className={mainStyles['table-column-width-3x']}>
                    Canberra closing time
                  </th>
                  <th scope="col" className={mainStyles['table-column-width-1x']}>
                    Status
                  </th>
                  <th scope="col" className={mainStyles['table-column-width-1x']}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map(opportunity => (
                  <tr key={`opportunity.${opportunity.briefId}`}>
                    <td className={`${styles.colId}`}>{opportunity.briefId}</td>
                    <td className={mainStyles['table-column-width-7x']}>
                      {getOpportunityLink(opportunity)}
                      <br />
                      {opportunity.lotName}
                    </td>
                    <td className={mainStyles['table-column-width-3x']}>
                      {format(opportunity.closed_at, 'DD/MM/YYYY h:mmA')}
                    </td>
                    <td className={mainStyles['table-column-width-1x']}>{getStatusBadge(opportunity)}</td>
                    <td className={mainStyles['table-column-width-1x']}>
                      {invited(opportunity) && getOpportunityLink(opportunity, 'View opportunity')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className={styles.noRecords}>Apply for opportunities</div>
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
