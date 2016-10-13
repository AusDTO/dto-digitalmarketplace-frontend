import React from 'react';
import { connect } from 'react-redux'
import { Match } from 'react-router'

import Layout from '../../shared/Layout'
import CaseStudyList from './components/CaseStudyList'
import CaseStudyAdd from './components/CaseStudyAdd'
import SellerList from './components/SellerList'


const CaseStudyApp = () => (
  <Layout>
    <h2>Case Studies</h2>
    <Match pattern="/" exactly component={CaseStudyList} />
    <Match pattern="/add" exactly component={CaseStudyAdd} />
    <Match pattern="/sellers" exactly component={SellerList} />
  </Layout>
)

export default connect()(CaseStudyApp)
