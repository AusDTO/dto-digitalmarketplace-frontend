import React, {Component} from 'react';
import isEmpty from 'lodash/isEmpty';

import {AppChangesTable} from '../AppChangesTable/AppChangesTable';
import {returnDiffedData, returnUnassessedCaseStudies} from './helper';

import './AppChanges.css'; // eslint-disable-line no-unused-vars


export class AppChanges extends Component {

  constructor(props) {
    super(props);
    this.state = {changesView: false};
  }

  toggleChangeView() {
    this.setState({changesView: !this.state.changesView})
  }

  render() {
    let {body} = this.props;
    let {case_studies: applicationCaseStudies, supplier_code, supplierCode, id: appID, type} = body;
    supplierCode = (!supplier_code ? supplierCode : supplier_code);
    let unassessedCaseStudies = returnUnassessedCaseStudies(applicationCaseStudies);
    let appDiffData = returnDiffedData(body);

    return ((isEmpty(appDiffData) || type !== 'edit') ? null :
      <div styleName="callout--info">
        <ul>
          {
            unassessedCaseStudies.map((study, i) => {
              return <li key={i}>
                Case study <a href={`/admin/applications/case-study/${appID}/${study.uuid}`} target="_blank" rel="external"><b>{study.title}</b></a> was added</li>
            })
          }
        </ul>
        <a href="#" onClick={() => this.toggleChangeView()}>
          {(this.state.changesView ? "Hide " : "Show ").concat("Detailed Changes")}
        </a>
        {this.state.changesView && (
          <div>
            <AppChangesTable data={appDiffData}/>
            <a href="#" onClick={() => this.toggleChangeView()}>
              {(this.state.changesView ? "Hide " : "Show ").concat("Detailed Changes")}
            </a>
          </div>
        )}
        {supplierCode && <div>
          <div styleName='admin-profile-link'>
            <a href={`https://marketplace.service.gov.au/supplier/${supplierCode}`} target="_blank" rel="external">
              Live Supplier Profile
            </a>
          </div>
        </div>}
      </div>
    )
  }
}