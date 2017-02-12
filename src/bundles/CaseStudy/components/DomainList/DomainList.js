import React                     from 'react';
import { connect }               from 'react-redux';
import { Link, Route, Redirect, Switch } from 'react-router-dom';
import { actions, Form }  from 'react-redux-form';
import isEmpty            from 'lodash/isEmpty';
import kebabCase          from 'lodash/kebabCase';

import Layout         from '../../../../shared/Layout';
import BaseForm       from '../../../../shared/form/BaseForm';
import ErrorBox       from '../../../../shared/form/ErrorBox';
import StatefulError  from '../../../../shared/form/StatefulError';
import formProps      from '../../../../shared/reduxModules/formPropsSelector';

import ProgressBar    from '../../../../shared/ProgressBar';

import ConnectedLink from '../../../SellerRegistration/components/ConnectedLink';
import { push } from '../../../SellerRegistration/redux/modules/application';

import CaseStudyForm from '../CaseStudyForm';
import View from '../View';

const getStudiesByService = (studies, service) => {
  return Object
    .keys(studies)
    .filter(studyId => studies[studyId].service === service)
    .reduce((list, guid, i, a) => {
      list[guid] = studies[guid];
      return list;
    }, {})
};

const calcRemaining = (studies, services) => {
  const serviceKeys = Object.keys(services);
  const mappedServices = Object.keys(studies).map(studyId => studies[studyId].service);
  const uniqueServices = mappedServices.reduce((unique, service) => {
    if (unique.indexOf(service) === -1) {
      return unique.concat(service);
    }

    return unique;
  }, []);

  return serviceKeys.filter(service => uniqueServices.indexOf(service) !== -1);
}

const s4 = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
}

const guid = () => {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
}

class DomainList extends BaseForm {

  static propTypes = {
    services: React.PropTypes.object,
    domainRoute: React.PropTypes.string
  }

  static defaultProps = {
    services: {},
    title: 'Case Study Domain List',
    domainRoute: '/domains'
  }

  render() {
    let { 
      services,
      title,
      domainRoute,
      match = {},
      router,
      buttonText,
      model,
      action,
      caseStudyForm,
      children,
      currentStudy,
      actions: dispatchActions,
      getStudiesByService,
      calcRemaining,
      onSubmit,
      onCaseStudySubmit,
      onEditCaseStudy,
      onAddCaseStudy,
      onDeleteCaseStudy
    } = this.props;

    onCaseStudySubmit = onCaseStudySubmit.bind(this, {
      router,
      pathname: match.url,
      dispatchActions
    });

    const studies         = caseStudyForm.case_studies;
    const serviceCount    = Object.keys(services).length;
    const addedServices   = calcRemaining(studies, services);
    const leftToAdd       = Object.keys(services).filter(service => addedServices.indexOf(service) === -1);
    const leftToAddCount  = serviceCount - addedServices.length;

    if (!serviceCount) {
      return (
        <Layout>
          <header>
            <h1 tabIndex="-1">{title}</h1>
          </header>
          <article role="main">
            <p>Before you can add any case studies you need to select the services you will offer.</p>
            <p><Link to={domainRoute}>Select services</Link></p>
          </article>
        </Layout>
      )
    };

    return (
      <Switch>
        <Route path={match.url} exact render={() => (
          <Layout>
            <header>
              <h1 tabIndex="-1">{title}</h1>
              <p>Need a pep talk? Your case studies are important for showing you meet our <a href="/assessment-criteria" target="_blank" rel="external">assessment criteria</a>, like other tenders.
                But they’re also much more. Think of them as the beginning of a conversation with hundreds of government buyers from all over Australia.
                This a space for your stories that could spark all sorts of wonderful and productive relationships.
              </p>
            </header>
            <article role="main">
             
              <ErrorBox focusOnMount={true} model={model}/>

              <strong>{leftToAddCount === 0
                ? 'All services have a case study'
                : `${leftToAddCount} services to add`
              }</strong>

              <ProgressBar value={addedServices.length} max={serviceCount} />

              {Object.keys(services).map((service, i) => {
                let list = getStudiesByService(caseStudyForm.case_studies, service);
                return (
                  <section key={`casestudy.domain.${i}`}>
                    <h4>{service}</h4>
                    {!isEmpty(list) && (
                      <ul className="bordered-list">
                        {Object.keys(list).map((guid, i) => {
                          let study = list[guid];
                          return (
                            <li key={`casestudy.${service}.${guid}`} className="bordered-list__item row">
                              <div className="col-xs-6">
                                <Link
                                  to={`${match.url}/edit/${guid}`}
                                  id={`edit-${kebabCase(service)}-${i}`}
                                  onClick={() => onEditCaseStudy(study)}
                                  children={study.title}
                                />
                                <p key={i}></p>
                              </div>
                              <div className="col-xs-6" style={{textAlign: 'right'}}>
                                <Link
                                  to={`${match.url}/delete/${guid}`}
                                  id={`delete-${kebabCase(service)}-${i}`}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    onDeleteCaseStudy(dispatchActions, guid)
                                  }}
                                >
                                  Delete
                                </Link>
                              </div>
                            </li>
                          )
                        })}
                      </ul>
                    )}
                    
                    <Link
                      to={`${match.url}/add/${service}`}
                      id={`add-service-${kebabCase(service)}`}
                      onClick={() => onAddCaseStudy()}>
                      Add case study
                    </Link>
                    
                  </section>
                )
                
              })}

              {/* This error will never actually render */}
              <StatefulError
                model={`${model}.case_studies`}
                id={`add-service-${kebabCase(leftToAdd[0])}`}
                messages={{
                  case_studies: `You must add at least one case study for each service. Remaining: ${leftToAdd.join(', ')}.`
                }}
              />
              <br/>
              <Form 
                model={model}
                action={action}
                method="post"
                validators={{
                  case_studies: (studies) => {
                     let studyServices = Object.keys(studies)
                       .map(study => studies[study].service);

                     let unique = studyServices.filter((s, i) => {
                       return studyServices.indexOf(s) === i;
                     })
                    return serviceCount === unique.length
                  }
                }}
                onSubmit={onSubmit}>

                {children}

                <input type="submit" role="button" value={buttonText} />
              </Form>
              
            </article>
          </Layout>
        )} />
        <Route path={`${match.url}/add/:service`} render={({ match: subMatch }) => (

          <CaseStudyForm
            model="casestudy"
            formName="casestudy"
            buttonText="Save & Preview"
            service={subMatch.params.service}
            returnLink={<ConnectedLink to={match.url}>Return without saving</ConnectedLink>}
            onSubmit={onCaseStudySubmit.bind(this, subMatch.params)}
          />

        )} />
        <Route path={`${match.url}/edit/:id`} render={({ match: subMatch }) => (

          <CaseStudyForm
            model={`caseStudyForm.case_studies.${subMatch.params.id}`}
            formName={`caseStudyForm.case_studies.${subMatch.params.id}`}
            mode="edit"
            buttonText="Save & Preview"
            returnLink={<ConnectedLink to={match.url}>Return without saving</ConnectedLink>}
            onSubmit={onCaseStudySubmit.bind(this, subMatch.params)}
          />

        )} />
        <Route path={`${match.url}/view/:id?`} render={({ match: subMatch }) => {
          if (subMatch.params.id && subMatch.params.id !== 'undefined') {
            // If `id` is present, load from pre-saved state.
            currentStudy = caseStudyForm.case_studies[subMatch.params.id];
          }
          return (
            <div>
              {currentStudy.title
                ? <View
                    {...currentStudy}
                    onSubmit={onCaseStudySubmit.bind(this, subMatch.params)}
                    confirmButton={<ConnectedLink role="button" to={match.url}>Finish case study</ConnectedLink>}
                    returnLink={<p><Link to={`${match.url}/edit/${subMatch.params.id}`}>Continue Editing</Link></p>}
                  />
                : <Redirect to="/case-study" />
              }
            </div>
          )
        }} />
      </Switch>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...formProps(state, 'caseStudyForm'),
    ...ownProps,
    currentStudy: state.casestudy,
    getStudiesByService,
    calcRemaining
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCaseStudySubmit: ({ router, dispatchActions, pathname }, params, e, values) => {
      e.preventDefault();
      let { service, id } = params;

      if (!id) {
        id = guid();
      }

      if (values.service) {
        service = values.service;
      }

      const props = Object.assign({}, values, { service })
      dispatch(actions.change(`caseStudyForm.case_studies.${id}`, props ));
      dispatch(actions.reset('casestudy'));
      dispatchActions.submitApplication();
      dispatch(push(`${pathname}/view/${id}`));
    },
    onEditCaseStudy: (study) => {
      dispatch(actions.change('casestudy', study));
    },
    onAddCaseStudy: () => {
      dispatch(actions.reset('casestudy'));
    },
    onDeleteCaseStudy: (dispatchActions, id) => {
      dispatch(actions.omit('caseStudyForm.case_studies', id));
      dispatchActions.submitApplication();
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DomainList);