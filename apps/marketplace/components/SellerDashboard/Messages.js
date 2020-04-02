import React, { Component } from 'react'
import { connect } from 'react-redux'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import differenceInSeconds from 'date-fns/difference_in_seconds'
import { ErrorBoxComponent } from 'shared/form/ErrorBox'
import { loadMessages } from 'marketplace/actions/sellerDashboardActions'
import styles from '../../main.scss'

export class Messages extends Component {
  componentDidMount() {
    const { loading, errors, loadedAt } = this.props

    if (!loading && !errors) {
      const difference = differenceInSeconds(new Date(), loadedAt)
      if (difference > 60) {
        this.props.loadData()
      }
    }
  }

  formatMessage = (item, row) => {
    const { message, links } = item

    let messages = [message]
    if (links) {
      Object.keys(links).forEach(link => {
        const temp = []
        messages.forEach(m => {
          if (m.split) {
            m.split(`{${link}}`).forEach((v, i, a) => {
              temp.push(v)
              if (a.length !== i + 1) {
                temp.push(
                  <a key={`${row}.link.${link}`} href={links[link]}>
                    {link}
                  </a>
                )
              }
            })
          } else {
            temp.push(m)
          }
        })
        messages = temp
      })
    }
    return messages
  }

  messageIdToAction = item => {
    const { id } = item
    const { supplier } = this.props
    if (!id) {
      return ''
    }
    let errorType = ''
    const dashIndex = id.indexOf('-')
    if (dashIndex > -1) {
      errorType = id.substring(0, dashIndex)
    } else {
      errorType = id
    }
    switch (errorType) {
      case 'SB001':
        return <a href={`/sellers/edit/?step=${item.step}`}>Preview and submit</a>
      case 'S001':
        return <a href={`/sellers/edit/?step=${item.step}`}>Update business details</a>
      case 'S002':
        return <a href={`/sellers/edit/?step=${item.step}`}>Update pricing</a>
      case 'S003':
        return <a href={`/sellers/edit/?step=case-study`}>Update your case study</a>
      case 'S004':
      case 'S005':
        return <a href={`/sellers/edit/?step=${item.step}`}>Update your case study</a>
      case 'S006':
      case 'S007':
      case 'S008':
      case 'S009':
      case 'S010':
      case 'S011':
      case 'S012':
        return <a href={`/sellers/edit/?step=${item.step}`}>Manage your documents</a>
      case 'S014':
        return <a href={`/sellers/edit/?step=${item.step}`}>Update licence details</a>
      case 'SB002':
        return <a href={`/2/seller-edit/${supplier.code}/${item.step}`}>View new Master Agreement</a>
      default:
        return ''
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
          title="A problem occurred when loading the notifications"
          errorMessage={errorMessage}
          setFocus={() => {}}
          form={{}}
          invalidFields={[]}
        />
      )
    }

    return (
      <div className={`${styles.marginTop2} row`}>
        <div className="col-xs-12">
          {items && items.length > 0 ? (
            <table className={`${styles.defaultStyle} ${styles.marginBottom3} ${styles.striped} col-xs-12`}>
              <thead>
                <tr className={styles.headingRow}>
                  <th scope="col" className={`${styles.tableColumnWidth10} ${styles.textAlignLeft}`}>
                    Notification
                  </th>
                  <th scope="col" className={`${styles.tableColumnWidth2} ${styles.textAlignLeft}`}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((message, i) => (
                  <tr key={`message.${message.message}`}>
                    <td className={styles.tableColumnWidth10}>{this.formatMessage(message, i)}</td>
                    <td className={styles.tableColumnWidth2}>{this.messageIdToAction(message, i)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className={`${styles.marginTop3} ${styles.marginBottom3}`}>No notifications</div>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  supplier: state.sellerDashboard.supplier.supplier,
  items: state.sellerDashboard.messages.items,
  loading: state.sellerDashboard.messages.loading,
  loadedAt: state.sellerDashboard.messages.loadedAt,
  errors: state.sellerDashboard.messages.errors,
  errorMessage: state.app.errorMessage
})

const mapDispatchToProps = dispatch => ({
  loadData: () => dispatch(loadMessages())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Messages)
