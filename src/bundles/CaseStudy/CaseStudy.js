import React from 'react';
import { connect } from 'react-redux'
import { Match } from 'react-router'

import Layout from '../../base/Layout'
import CaseStudyList from './components/CaseStudyList'
import CaseStudyAdd from './components/CaseStudyAdd'
import SellerList from './components/SellerList'


const CaseStudyApp = () => (
  <Layout>
    <h2>Case Studies</h2>
    <Match pattern="/case-studies" exactly component={CaseStudyList} />
    <Match pattern="/case-studies/add" exactly component={CaseStudyAdd} />
    <Match pattern="/case-studies/sellers" exactly component={SellerList} />
  </Layout>
)

export default connect()(CaseStudyApp)
