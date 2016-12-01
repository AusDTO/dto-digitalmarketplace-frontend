import React                     from 'react';
import { connect }               from 'react-redux';
import { Link, Match, Redirect } from 'react-router';
import { actions, Form }  from 'react-redux-form';
import isEmpty            from 'lodash/isEmpty';
import kebabCase          from 'lodash/kebabCase';

import Layout         from '../../../../shared/Layout';
import ErrorBox       from '../../../../shared/form/ErrorBox';
import StatefulError  from '../../../../shared/form/StatefulError';
import formProps      from '../../../../shared/reduxModules/formPropsSelector';

import ProgressBar    from '../../../../shared/ProgressBar';

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

const DomainList = (props) => {
  let { 
    services,
    title,
    domainRoute,
    pathname,
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
  } = props;

  onCaseStudySubmit = onCaseStudySubmit.bind(this, {
    router,
    pathname,
    dispatchActions
  });

  const studies         = caseStudyForm.casestudies;
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
          <p>You must select some domains before adding case studies.</p>
          <p><Link to={domainRoute}>Select domains</Link></p>
        </article>
      </Layout>
    )
  };

  return (
    <div>
      <Match pattern={pathname} exactly render={() => (
        <Layout>
          <header>
            <h1 tabIndex="-1">{title}</h1>
            <p>The DTA will evaluate your case study for each service to ensure services provided on the Marketplace meet a sufficient standard. <a href="#criteria">Browse criteria for each service</a></p>
          </header>
          <article role="main">
            
            <ErrorBox focusOnMount={true} model={model}/>

            <p>{leftToAddCount} services to add</p>
            <ProgressBar value={addedServices.length} max={serviceCount} />

            {Object.keys(services).map((service, i) => {
              let list = getStudiesByService(caseStudyForm.casestudies, service);
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
                              <Link to={`${pathname}/edit/${guid}`}>{
                                ({ href, id, onClick }) =>
                                  <a
                                    href={href}
                                    id={`edit-${kebabCase(service)}-${i}`}
                                    onClick={(e) => {
                                      onEditCaseStudy(study);
                                      onClick(e);
                                    }}
                                    children={study.title}
                                  />
                              }</Link>
                              <p key={i}></p>
                            </div>
                            <div className="col-xs-6" style={{textAlign: 'right'}}>
                              <Link to={`${pathname}/delete/${guid}`}>{
                                ({ href, id, onClick }) =>
                                  <a
                                    href={href}
                                    id={`delete-${kebabCase(service)}-${i}`}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      onDeleteCaseStudy(dispatchActions, guid);
                                  }}>
                                    Delete
                                  </a>
                              }</Link>
                            </div>
                          </li>
                        )
                      })}
                    </ul>
                  )}
                  <Link to={`${pathname}/add/${service}`}>{
                    ({ href, id, onClick }) =>
                      <a href={href} id={`add-service-${kebabCase(service)}`} onClick={(e) => {
                        onAddCaseStudy();
                        onClick(e);
                      }}>Add case study</a>
                  }</Link>
                </section>
              )
              
            })}

            {/* This error will never actually render */}
            <StatefulError
              model={`${model}.casestudies`}
              id={`add-service-${kebabCase(leftToAdd[0])}`}
              messages={{
                casestudies: `You must add at least one case study for each service. Remaining: ${leftToAdd.join(', ')}.`
              }}
            />
            <br/>
            <Form 
              model={model}
              action={action}
              method="post"
              validators={{
                casestudies: (studies) => {
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
      <Match pattern={`${pathname}/add/:service`} render={({ params }) => (

        <CaseStudyForm
          model="casestudy"
          formName="casestudy"
          buttonText="Save & Preview"
          service={params.service}
          returnLink={<Link to={pathname}>Return without saving</Link>}
          onSubmit={onCaseStudySubmit.bind(this, params)}
        />

      )} />
      <Match pattern={`${pathname}/edit/:id`} render={({ params }) => (

        <CaseStudyForm
          model={`caseStudyForm.casestudies.${params.id}`}
          formName={`caseStudyForm.casestudies.${params.id}`}
          mode="edit"
          buttonText="Save & Preview"
          returnLink={<Link to={pathname}>Return without saving</Link>}
          onSubmit={onCaseStudySubmit.bind(this, params)}
        />

      )} />
      <Match pattern={`${pathname}/view/:id?`} render={({ params }) => {
        if (params.id && params.id !== 'undefined') {
          // If `id` is present, load from pre-saved state.
          currentStudy = caseStudyForm.casestudies[params.id];
        }
        return (
          <div>
            {currentStudy.title
              ? <View
                  {...currentStudy}
                  onSubmit={onCaseStudySubmit.bind(this, params)}
                  confirmButton={<Link role="button" to={pathname}>Add another</Link>}
                  returnLink={<Link to={`${pathname}/edit/${params.id}`}>Continue Editing</Link>}
                />
              : <Redirect to={pathname} />
            }
          </div>
        )
      }} />
    </div>
  )
 
};

DomainList.propTypes = {
  services: React.PropTypes.object,
  domainRoute: React.PropTypes.string
};

DomainList.defaultProps = {
  services: {},
  title: 'Case Study Domain List',
  domainRoute: '/domains'
};

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
      dispatch(actions.change(`caseStudyForm.casestudies.${id}`, props ));
      dispatch(actions.reset('casestudy'));
      dispatch(dispatchActions.submitApplication());
      router.transitionTo(`${pathname}/view/${id}`);
    },
    onEditCaseStudy: (study) => {
      dispatch(actions.change('casestudy', study));
    },
    onAddCaseStudy: () => {
      dispatch(actions.reset('casestudy'));
    },
    onDeleteCaseStudy: (dispatchActions, id) => {
      dispatch(actions.omit('caseStudyForm.casestudies', id));
      dispatch(dispatchActions.submitApplication());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DomainList);