import React, {Component} from 'react';
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty';

import {AppChangesTable} from '../AppChangesTable/AppChangesTable';
import {returnDiffedData, returnUnassessedCaseStudies} from './helper';

import './AppChanges.css'; // eslint-disable-line no-unused-vars


export class AppChanges extends Component {

  static propTypes = {
    body: PropTypes.shape({
      case_studies: PropTypes.object.isRequired,
      supplier_code: PropTypes.number,
      supplierCode: PropTypes.number,
      id: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired
    })
  };

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
                Case study <a href={`/admin/applications/case-study/${appID}/${study.uuid}`} target="_blank" rel="noopener noreferrer"><b>{study.title}</b></a> was added</li>
            })
          }
        </ul>
        <button onClick={() => this.toggleChangeView()}>
          {(this.state.changesView ? "Hide " : "Show ").concat("Detailed Changes")}
        </button>
        {this.state.changesView && (
          <div>
            <AppChangesTable data={appDiffData}/>
            <button onClick={() => this.toggleChangeView()}>
              {(this.state.changesView ? "Hide " : "Show ").concat("Detailed Changes")}
            </button>
          </div>
        )}
        {supplierCode && <div>
          <div styleName='admin-profile-link'>
            <a href={`https://marketplace.service.gov.au/supplier/${supplierCode}`} target="_blank" rel="noopener noreferrer">
              Live Supplier Profile
            </a>
            <a href={`/admin/applications/${appID}/diff`} target="_blank" rel="noopener noreferrer">
              Differences
            </a>
          </div>
        </div>}
      </div>
    )
  }
}