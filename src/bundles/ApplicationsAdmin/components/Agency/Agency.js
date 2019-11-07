import React from 'react'
import { connect } from 'react-redux'
import { AUcheckbox } from '@gov.au/control-input'
import AUselect from '@gov.au/select'
import AUtextInput from '@gov.au/text-inputs'
import { saveAgency } from '../../redux/modules/agency'
import format from 'date-fns/format'

class Agency extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      agency: null,
      saved: null
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
    const formData = new FormData(event.target)
    let data = Object.fromEntries(formData)
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
    data.domains = data.domains.split('\n')

    this.setState({
      loading: true
    })
    this.props.saveAgency(data)
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
    if (!agency) {
      return (
        <div>
          <h1 className="au-display-xl">Agency not found</h1>
        </div>
      )
    }

    if (agency) {
      return (
        <form onSubmit={this.handleSubmit}>
          <h1 className="au-display-xl">Agency edit</h1>
          <a href="/admin/agency">Back to agency list</a>
          <p>
            <label htmlFor="name">Name</label>
            <AUtextInput
              id="name"
              name="name"
              block
              defaultValue={agency.name}
            />
          </p>
          <p>
            <label htmlFor="domain">Domains (One per line)</label>
            <AUtextInput
              as="textarea"
              id="domains"
              name="domains"
              block
              defaultValue={agency.domains.map(d => d.domain).join('\n')}
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
              defaultValue={agency.body_type}
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
              defaultValue={agency.category}
            />
          </p>
          <p>
            <label htmlFor="state">State</label>
            <AUselect
              id="state"
              name="state"
              block
              options={[
                { value: '', text: 'Please select a state' },
                { value: 'SA', text: 'SA' },
                { value: 'QLD', text: 'QLD' },
                { value: 'VIC', text: 'VIC' },
                { value: 'NSW', text: 'NSW' },
                { value: 'TAS', text: 'TAS' },
                { value: 'NT', text: 'NT' },
                { value: 'ACT', text: 'ACT' },
                { value: 'WA', text: 'WA' }
              ]}
              defaultValue={agency.state}
            />
          </p>
          <AUcheckbox
            label="Reports"
            id="reports"
            name="reports"
            defaultChecked={agency.reports}
          />
          <AUcheckbox
            label="Whitelisted"
            id="whitelisted"
            name="whitelisted"
            defaultChecked={agency.whitelisted}
          />
          {loading ?
            <p>Loading</p> :
            <p>
              <input type="submit" value="Save" />
              {saved && `Last saved: ${saved}`}
            </p>
          }
        </form>
      )
    }

    return <div />
  }
}

const mapStateToProps = ({ agency, meta }) => {
  return { agency, meta }
}

const mapDispatchToProps = dispatch => {
  return {
    saveAgency: data => dispatch(saveAgency(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Agency)
