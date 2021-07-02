import React from 'react'
import { connect } from 'react-redux'
import { loadAgencies } from '../../redux/modules/agency'

class AgencyList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      agencies: [],
      saved: null
    }

  }

  componentDidMount() {
    this.setState({
      loading: true
    })
    this.props.loadAgencies()
      .then(r => {
        if (r.status === 200) {
          return r.json()
        }
        return Promise.reject()
      })
      .then(r => {
        this.setState({
          loading: false,
          agencies: r
        })
      }, () => {
        this.setState({
          loading: false,
          agencies: []
        })
      })
  }

  render() {
    const { agencies, loading } = this.state
    if (loading) {
      return <p>Loading agencies</p>
    }
    return (
      <React.Fragment>
        <div>
        <div className="au-display-xl" style={{float:"left"}}>Agencies</div>
        <div style={{float:"right"}}>
        <a href="/admin/agency/create">Create Agency</a>
        </div>
        </div>
        <table className="content-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Category</th>
              <th>State</th>
              <th>Body&nbsp;type</th>
              <th>Whitelisted</th>
              <th>Reports</th>
              <th>Domain</th>
            </tr>
          </thead>

          <tbody>
            {(agencies).map((a, i) => {
              return (
                <tr key={i}>
                  <td><a href={`/admin/agency/${a.id}`}>{a.id}</a></td>
                  <td>{a.name}</td>
                  <td>{a.category}</td>
                  <td>{a.state}</td>
                  <td>{a.body_type}</td>
                  <td>{a.whitelisted ? 'yes' : 'no'}</td>
                  <td>{a.reports ? 'yes' : 'no'}</td>
                  <td>{a.domains.map(a => a.domain).join(', ')}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({ meta }) => {
  return { meta }
}

const mapDispatchToProps = dispatch => {
  return {
    loadAgencies: () => dispatch(loadAgencies())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AgencyList)
