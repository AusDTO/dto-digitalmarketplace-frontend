import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { fetchSellers } from '../redux/modules/sellers'

class SellerList extends Component {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchSellers())
  }

  render() {
    const { sellers } = this.props
    return (
      <section>
        <ul>
        {sellers.map((seller, i) => (
          <li key={i}>
            <a target="_blank" href={`/supplier/${seller.code}`}>{seller.longName}</a>
          </li>
        ))}
        </ul>
      </section>
    )
  }
}

SellerList.propTypes = {
  sellers: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    longName: PropTypes.string
  })).isRequired,
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = ({ sellers = [] }) => {
  return {
    sellers
  }
}

export default connect(mapStateToProps)(SellerList)
