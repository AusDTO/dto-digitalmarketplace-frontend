import React              from 'react';
import { connect }        from 'react-redux';
import { Link, Match }    from 'react-router';
import { actions, Form }  from 'react-redux-form';
import isEmpty            from 'lodash/isEmpty';
import kebabCase          from 'lodash/kebabCase';

import Layout         from '../../../../shared/Layout';
import ErrorBox       from '../../../../shared/form/ErrorBox';
import StatefulError  from '../../../../shared/form/StatefulError';
import formProps      from '../../../../shared/reduxModules/formPropsSelector';

import CaseStudyForm from '../CaseStudyForm';

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
  const { 
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
    getStudiesByService,
    calcRemaining,
    onSubmit,
    onCaseStudySubmit,
    onEditCaseStudy,
    onAddCaseStudy
  } = props;

  const studies         = caseStudyForm.casestudies;
  const serviceCount    = Object.keys(services).length;
  const addedServices   = calcRemaining(studies, services);
  const leftToAdd       = Object.keys(services).filter(service => addedServices.indexOf(service) === -1);
  const leftToAddCount  = serviceCount - addedServices.length;

  if (!serviceCount) {
    return (
      <Layout>
        <header>
          <h1>{title}</h1>
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
            <h1>{title}</h1>
            <p>Add a case study for each of your selected services. Your case study must address the evaluation criteria</p>
          </header>
          <article role="main">
            
            <ErrorBox focusOnMount={true} model={model}/>

            <p>{leftToAddCount} services to add</p>
            <ul>
            {Object.keys(services).map((service, i) => {
              let list = getStudiesByService(caseStudyForm.casestudies, service);
              return (
                <li key={`casestudy.domain.${i}`}>
                  <h4>{service}</h4>
                  {!isEmpty(list) && (
                    <ul>
                      {Object.keys(list).map((guid, i) => {
                        let study = list[guid];
                        return (
                          <li key={`casestudy.${service}.${guid}`}>
                            <b key={i}>{study.title}</b>
                            <Link to={`${pathname}/edit/${guid}`}>{
                              ({ href, id, onClick }) =>
                                <a href={href} id={`edit-${kebabCase(service)}-${i}`} onClick={(e) => {
                                  onEditCaseStudy(study);
                                  onClick(e);
                                }}>Edit</a>
                            }</Link>
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
                </li>
              )
              
            })}
            </ul>

            {/* This error will never actually render */}
            <StatefulError
              model={`${model}.casestudies`}
              id={`add-service-${kebabCase(leftToAdd[0])}`}
              messages={{
                casestudies: `You must add at least one case study for each service. Remaining: ${leftToAdd.join(', ')}.`
              }}
            />

            <Form 
              model={model}
              action={action}
              method="post"
              validators={{
                casestudies: (studies) => {
                  return serviceCount === Object.keys(studies).length
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
          buttonText="Preview case study"
          onSubmit={onCaseStudySubmit.bind(this, router, params)}
        />

      )} />
      <Match pattern={`${pathname}/edit/:id`} render={({ params }) => (

        <CaseStudyForm
          model="casestudy"
          formName="casestudy"
          mode="edit"
          buttonText="Preview case study"
          onSubmit={onCaseStudySubmit.bind(this, router, params)}
        />

      )} />
      <Match pattern={`${pathname}/view/:id`} render={({ params }) => (
        <p>View {params.id}</p>
      )} />
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
    getStudiesByService,
    calcRemaining
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCaseStudySubmit: (router, params, e, values) => {
      e.preventDefault();
      let { service, id } = params;

      if (!id) {
        id = guid();
      }

      const props = Object.assign({}, { service }, values)
      dispatch(actions.change(`caseStudyForm.casestudies.${id}`, props ));
      dispatch(actions.reset('casestudy'));
      router.transitionTo('/case-study');
    },
    onEditCaseStudy: (study) => {
      dispatch(actions.change('casestudy', study));
    },
    onAddCaseStudy: () => {
      dispatch(actions.reset('casestudy'));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DomainList);