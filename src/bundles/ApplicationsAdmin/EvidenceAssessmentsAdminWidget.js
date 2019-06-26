import React from 'react'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import RegisterComponent from '../../RegisterComponent'

import createStore from './redux/create'

import EvidenceAssessmentList from './components/EvidenceAssessmentList'
import EvidenceAssessment from './components/EvidenceAssessment'
import EvidenceAssessmentHistory from './components/EvidenceAssessmentHistory'


const EvidenceAssessmentsAdminWidget = (props) => {
  const store = createStore(props)

  return (
    <Provider store={store} >
      <Switch>
        <Route exact path="/admin/evidence-assessments/:id/previous" component={EvidenceAssessmentHistory} />
        <Route exact path="/admin/evidence-assessments/:id" component={EvidenceAssessment} />
        <Route path="/admin/evidence-assessments" component={EvidenceAssessmentList} />
      </Switch>
    </Provider>
  )
}

export default new RegisterComponent({ 'evidence-assessments-admin': EvidenceAssessmentsAdminWidget })
