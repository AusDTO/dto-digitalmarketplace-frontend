import React, { Component } from 'react'
import { connect } from 'react-redux'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import { loadMessages } from 'marketplace/actions/sellerDashboardActions'
import styles from './SellerDashboard.scss'

export class Messages extends Component {
  componentDidMount() {
    if (!this.props.currentlySending) {
      this.props.loadData()
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
      case 'S000':
        return <a href={`/sellers/edit/?step=${item.step}`}>Preview and submit</a>
      case 'S003':
        return <a href={`/sellers/edit/?step=${item.step}`}>Update pricing</a>
      case 'S005':
        return <a href={`/sellers/edit/?step=${item.step}`}>Update case study</a>
      case 'S010':
      case 'S011':
        return <a href={`/sellers/edit/?step=${item.step}`}>Update documents</a>
      default:
        return ''
    }
  }

  render() {
    if (this.props.currentlySending) {
      return <LoadingIndicatorFullPage />
    }

    const { messages } = this.props

    return (
      <div className="row">
        <div className="col-xs-12">
          {messages && messages.length > 0 ? (
            <table className={`${styles.resultListing} col-xs-12`}>
              <thead>
                <tr className={styles.headingRow}>
                  <th scope="col" className={styles.colMessage}>
                    Notification
                  </th>
                  <th scope="col" className={styles.colAction}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {messages.map((message, i) => (
                  <tr key={`message.${message.message}`}>
                    <td className={styles.colMessage}>{this.formatMessage(message, i)}</td>
                    <td className={styles.colAction}>{this.messageIdToAction(message, i)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            'No messages'
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loadedMessages: state.sellerDashboard.loadedMessages,
  currentlySending: state.app.currentlySending,
  messages: state.sellerDashboard.messages.items
})

const mapDispatchToProps = dispatch => ({
  loadData: () => dispatch(loadMessages())
})

export default connect(mapStateToProps, mapDispatchToProps)(Messages)
