import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { memberInfoFetchData } from '../../actions/memberActions'
import './Header.scss'

class Header extends Component {
  componentDidMount() {
    this.props.fetchData()
  }

  dashBoardLink = () => {
    if (this.props.memberInfo.userType == 'buyer') {
      return <a href="/buyers">Dashboard</a>
    } else if (this.props.memberInfo.userType == 'applicant') {
      return <a href="/sellers/application">Continue application</a>
    } else {
      return <a href="/sellers">Dashboard</a>
    }
  }

  render() {
    return (
      <section className="marketplace--header">
        <div className="wrapper">
          <div className="marketplace--logo">
            <a href="/" title="Go to the Marketplace homepage" className="logo">
              Digital Marketplace
            </a>{' '}
            <span className="badge--beta">BETA</span>
          </div>
          <div className="user-nav">
            <div id="react-bundle-auth-header-state" />
            <div id="react-bundle-auth-header">
              <ul
                data-reactroot=""
                id="main-navigation"
                className="inline-links--inverted"
              >
                <li>
                  {this.props.memberInfo.isAuthenticated
                    ? <span>
                        {this.dashBoardLink()}
                      </span>
                    : <a href="/signup">Join the Marketplace</a>}
                </li>
                <li>
                  {this.props.memberInfo.isAuthenticated
                    ? <a href="/logout">Sign out</a>
                    : <a href="/login">Sign in</a>}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

Header.propTypes = {
  fetchData: PropTypes.func.isRequired,
  hasErrored: PropTypes.bool,
  isLoading: PropTypes.bool
}

const mapStateToProps = state => {
  return {
    memberInfo: state.memberInfo,
    hasErrored: state.memberInfoHasErrored,
    isLoading: state.memberInfoIsLoading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchData: () => dispatch(memberInfoFetchData())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
