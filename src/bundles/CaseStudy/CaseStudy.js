import React from 'react';
import { connect } from 'react-redux'

import Layout from '../../shared/Layout'


const CaseStudyApp = () => (
  <Layout>
    <h2>Case Studies</h2>
  </Layout>
)

export default connect()(CaseStudyApp)
