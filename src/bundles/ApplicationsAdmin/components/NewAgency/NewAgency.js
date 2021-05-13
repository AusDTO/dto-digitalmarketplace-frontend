import React from 'react'
import { connect } from 'react-redux'
import { AUcheckbox } from '@gov.au/control-input'
import AUselect from '@gov.au/select'
import AUtextInput from '@gov.au/text-inputs'
import { createAgency } from '../../redux/modules/agency'
import format from 'date-fns/format'

class NewAgency extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      agency: null
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.setState({
      agency: this.props.agency
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    console.log('handlerSubmit')
    const formData = new FormData(event.target)
    let data = [...formData].reduce((obj, [key, val]) => {
      obj[key] = val
      return obj
    }, {})
    const { agency } = this.state
    data.id = agency.id
    if (data.reports === "on") {
      data.reports = true
    } else {
      data.reports = false
    }
    if (data.whitelisted === "on") {
      data.whitelisted = true
    } else {
      data.whitelisted = false
    }
    if (data.must_join_team === "on") {
      data.must_join_team = true
    } else {
      data.must_join_team = false
    }
    data.domains = data.domains.split('\n')
    // clean out any trailing white space and remove any empty rows
    data.domains = data.domains.map(x => x.trim())
    data.domains = data.domains.filter(x => x)

    this.setState({
      loading: true
    })
    console.log(data)
    this.props.createAgency(data)
    .then(r => {
      if (r.status === 200) {
        return r.json()
      }
      return Promise.reject()
    })
    .then(r => {
      this.setState({
        loading: false,
        agency: r,
        saved: format(new Date(), 'DD-MM-YYYY HH:mm:ss')
      })
    }, () => {
      this.setState({
        loading: false,
        saved: 'Error has occured'
      })
    })
  }


  render() {
    const { agency, loading, saved } = this.state
    
    return (
        <form onSubmit={this.handleSubmit}>
          <h1 className="au-display-xl">Create Agency</h1>
          <a href="/admin/agency">Back to agency list</a>
          <p>
            <label htmlFor="name">Name</label>
            <AUtextInput
              id="name"
              name="name"
              block
              defaultValue="MyAgency"
            />
          </p>
          <p>
            <label htmlFor="domain">Domains (One per line)</label>
            <AUtextInput
              as="textarea"
              id="domains"
              name="domains"
              block
              defaultValue="b.com"
            />
          </p>
          <p>
            <label htmlFor="bodyType">Type of body</label>
            <AUselect
              id="bodyType"
              name="bodyType"
              block
              options={[
                { value: 'ncce', text: 'Non-corporate Commonwealth entity', },
                { value: 'cce', text: 'Corporate Commonwealth entity', },
                { value: 'cc', text: 'Commonwealth company', },
                { value: 'local', text: 'Local', },
                { value: 'state', text: 'State', },
                { value: 'other', text: 'Other' }
              ]}
              defaultValue="ncce"
            />
          </p>
          <p>
            <label htmlFor="category">Category</label>
            <AUselect
              id="category"
              name="category"
              block
              options={[
                { value: 'Education', text: 'Education' },
                { value: 'Corporate', text: 'Corporate' },
                { value: 'Enterprise', text: 'Enterprise' },
                { value: 'Commonwealth', text: 'Commonwealth' },
                { value: 'State', text: 'State' },
                { value: 'Organisation', text: 'Organisation' },
                { value: 'Local', text: 'Local' }
              ]}
              defaultValue="Education"
            />
          </p>
          <p>
            <label htmlFor="state">State</label>
            <AUselect
              id="state"
              name="state"
              block
              options={[
                { value: 'SA', text: 'SA' },
                { value: 'QLD', text: 'QLD' },
                { value: 'VIC', text: 'VIC' },
                { value: 'NSW', text: 'NSW' },
                { value: 'TAS', text: 'TAS' },
                { value: 'NT', text: 'NT' },
                { value: 'ACT', text: 'ACT' },
                { value: 'WA', text: 'WA' }
              ]}
              defaultValue="SA"
            />
          </p>
          <AUcheckbox
            label="Reports"
            id="reports"
            name="reports"
          />
          <AUcheckbox
            label="Whitelisted"
            id="whitelisted"
            name="whitelisted"
          />
          <AUcheckbox
            label="Users must join team"
            id="must_join_team"
            name="must_join_team"
          />
          {loading ?
            <p>Loading</p> :
            <p>
              <input type="submit" value="Create" />
              <input type="submit" value="Clear" />
              <input type="submit" value="Cancel" />
            </p>
          }
        </form>
    )
  }
}

const mapStateToProps = ({ agency, meta }) => {
  return { agency, meta }
}

const mapDispatchToProps = dispatch => {
  return {
    createAgency: data => dispatch(createAgency(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewAgency)
