import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import kebabCase from 'lodash/kebabCase';
import isEmpty   from 'lodash/isEmpty';

const getStudiesByService = (studies, service) => {
  return Object
    .keys(studies)
    .filter(studyId => studies[studyId].service === service)
    .reduce((list, guid, i, a) => {
      list[guid] = studies[guid];
      return list;
    }, {})
};

const CaseStudy = ({pathname, domain, index, caseStudyForm, onEditCaseStudy, onDeleteCaseStudy, onAddCaseStudy, actions}) => {
  let list = getStudiesByService(caseStudyForm.case_studies, domain);

  return (
    <section>
      <h4>{domain}</h4>
      {!isEmpty(list) && (
        <ul className="bordered-list">
          {Object.keys(list).map((guid, i) => {
            let study = list[guid];
            return (
              <li key={`casestudy.${domain}.${guid}`} className="bordered-list__item row">
                <div className="col-xs-5">
                  <p key={i}>{study.title}</p>
                </div>
                <div className="col-xs-7">
                  <div className="row">
                    <div className="col-xs-9" style={{textAlign: 'right'}}>
                      <Link
                        to={`${pathname}/edit/${guid}`}
                        id={`edit-${kebabCase(domain)}-${i}`}
                        onClick={() => onEditCaseStudy(study)}
                      >
                        Edit
                      </Link>
                    </div>
                    <div className="col-xs-3">
                      <Link
                        to={`${pathname}/delete/${guid}`}
                        id={`delete-${kebabCase(domain)}-${i}`}
                        onClick={(e) => {
                          e.preventDefault();
                          onDeleteCaseStudy(actions, guid)
                        }}
                      >
                        Delete
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      )}
      
      <Link
        to={`${pathname}/add/${domain}`}
        id={`add-service-${kebabCase(domain)}`}
        onClick={() => onAddCaseStudy()}>
        Add case study
      </Link>
      
    </section>
  )
};


export default CaseStudy;