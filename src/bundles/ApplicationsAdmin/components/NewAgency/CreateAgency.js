import React from 'react'
import { connect } from 'react-redux'
import { AUcheckbox } from '@gov.au/control-input'
import AUselect from '@gov.au/select'
import AUtextInput from '@gov.au/text-inputs'
import { createAgency } from '../../redux/modules/agency'
import format from 'date-fns/format'
import { Redirect, userHistory } from 'react-router'
import { fromPairs, min } from 'lodash'

class NewAgency extends React.Component {
   
  constructor(props) {
    super(props)
    this.state = {
      redirect: false,
      created: false,
      fields:{},
      errors:{}
    }
  }

  componentDidMount() {
   this.setState({
     errors:{
       name: '',
       domains: '',
       body_type: '',
       category: ''
     }
   })
  }

  handleChange(field, e){
    let fields = this.state.fields;
    fields[field] = e.target.value;
    this.setState({fields})
  }
  validate(data){
    let errors =  [] 
    let formErrors = this.state.errors
    if (data['name'] === ''){
      formErrors.name = "*Name is required"
      errors.push('name')
    }else{  
      formErrors.name = ''
    }
    
    if(data['domains'] === ''){
      formErrors.domains = '*Domains is required'
      errors.push('domains')
    }else{
      var domainLines = data['domains'].split('\n') 
      for (var indx=0; indx <  domainLines.length; indx++){
        if (/([a-z0-9]+\.)*[a-z0-9]+\.[a-z]+/.test(domainLines[indx])){
          formErrors.domains = ""
        }else{
          formErrors.domains = "*Please enter valid domain pattern"
          errors.push(domainLines[indx])
        }
      }
    }

    if (data['bodyType'] === ''){
      formErrors.body_type = '*Please select a body type'
      errors.push('bodyType')
    }else{
      formErrors.body_type = ''
    }

    if (data['category'] === ''){
      formErrors.category = '*Please select a category'
      errors.push('category')
    }else{
      formErrors.category = ''
    }
    
    this.setState({
      errors: formErrors,
    })
  
    return (errors.length > 0 ) ? false : true
  }
  
  handleSubmit(event) {
    event.preventDefault()
   
    const formData = new FormData(event.target)
    let data = [...formData].reduce((obj, [key, val]) => {
      obj[key] = val
      return obj
    }, {})

    if (!this.validate(data)){
      return false
    }
  

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

    this.props.createAgency(data)
    .then(r => {
      if (r.status === 200) {
        return r.json()
      }
      return Promise.reject()
    })
    .then(r => {
      this.setState({
        redirect: true,
        created: true
      })
      this.props.history.push('/admin/agency');
    }, () => {
      this.setState({
        redirect: false,
        created: false
      })
    })
  }

  onCancelClick(){
    window.location.href = '/admin/agency'
  }


  render() {
    const redirect = this.state.redirect
    const created = this.state.created
    if (redirect){
      window.location = "/admin/agency"
    }
   
    return (
        <form onSubmit={this.handleSubmit.bind(this)}>
          <h1 className="au-display-xl">Create Agency</h1>
          <a href="/admin/agency">Back to agency list</a>
          <div>
            <label htmlFor="name">Name</label>
            {this.state.errors.name && <p style={{color: "red"}}>{this.state.errors.name}</p>}
            <AUtextInput
              id="name"
              name="name"
              block
              defaultValue=""
            />
          </div>
          <div>
            <label htmlFor="domain">Domains (One per line)</label>
            {this.state.errors.domains && <p style={{color: "red"}}>{this.state.errors.domains}</p>}
            <AUtextInput
              as="textarea"
              id="domains"
              name="domains"
              block
              defaultValue=""
            />
          </div>
          <div>
            <label htmlFor="bodyType">Type of body</label>
            {this.state.errors.body_type && <p style={{color: "red"}}>{this.state.errors.body_type}</p>}
            <AUselect
              id="bodyType"
              name="bodyType"
              block
              options={[
                { value: '', text: 'Please select a type of body'},
                { value: 'ncce', text: 'Non-corporate Commonwealth entity', },
                { value: 'cce', text: 'Corporate Commonwealth entity', },
                { value: 'cc', text: 'Commonwealth company', },
                { value: 'local', text: 'Local', },
                { value: 'state', text: 'State', },
                { value: 'other', text: 'Other' }
              ]}
            />
          </div>
          <div>
            <label htmlFor="category">Category</label>
            {this.state.errors.category && <p style={{color: "red"}}>{this.state.errors.category}</p>}
            <AUselect
              id="category"
              name="category"
              block
              options={[
                { value: '', text: 'Please select a category'},
                { value: 'Education', text: 'Education' },
                { value: 'Corporate', text: 'Corporate' },
                { value: 'Enterprise', text: 'Enterprise' },
                { value: 'Commonwealth', text: 'Commonwealth' },
                { value: 'State', text: 'State' },
                { value: 'Organisation', text: 'Organisation' },
                { value: 'Local', text: 'Local' }
              ]}
            />
          </div>
          <div>
            <label htmlFor="state">State</label>
            <AUselect
              id="state"
              name="state"
              block
              options={[
                { value: '', text: 'Please select a state'},
                { value: 'SA', text: 'SA' },
                { value: 'QLD', text: 'QLD' },
                { value: 'VIC', text: 'VIC' },
                { value: 'NSW', text: 'NSW' },
                { value: 'TAS', text: 'TAS' },
                { value: 'NT', text: 'NT' },
                { value: 'ACT', text: 'ACT' },
                { value: 'WA', text: 'WA' }
              ]}
            />
          </div>
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
  
            <p>
              <input type="submit" value="Create" />
              <input type="button" value="Cancel" onClick={this.onCancelClick}/>
            </p>
          
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

export default connect(null, mapDispatchToProps)(NewAgency)
