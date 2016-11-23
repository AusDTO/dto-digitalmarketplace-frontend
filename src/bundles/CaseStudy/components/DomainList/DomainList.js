import React              from 'react';
import { connect }        from 'react-redux';
import { Link, Match }    from 'react-router';
import { actions, Form }  from 'react-redux-form';
import get                from 'lodash/get';
import kebabCase          from 'lodash/kebabCase';

import Layout         from '../../../../shared/Layout';
import ErrorBox       from '../../../../shared/form/ErrorBox';
import StatefulError  from '../../../../shared/form/StatefulError';
import formProps      from '../../../../shared/reduxModules/formPropsSelector';

import CaseStudyForm from '../CaseStudyForm';

const getServiceList = (state, service) => {
  let currentStudies = get(state, `caseStudyForm.casestudies.${service}`, {});
  return Object.keys(currentStudies).map(key => currentStudies[key]);
};

const DomainList = (props) => {
  const { 
    services,
    title,
    domainRoute,
    pathname,
    getServiceList,
    router,
    buttonText,
    model,
    action,
    caseStudyForm,
    onSubmit,
    onCaseStudySubmit
  } = props;

  const serviceCount    = Object.keys(services).length;
  const addedService    = Object.keys(caseStudyForm.casestudies);
  const leftToAdd       = Object.keys(services).filter(service => addedService.indexOf(service) === -1);
  const leftToAddCount  = leftToAdd.length;

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
              let list = getServiceList(service);
              return (
                <li key={`casestudy.domain.${i}`}>
                  <h4>{service}</h4>
                  {!!list.length && (
                    <ul>
                      {list.map((study, i) => (
                        <p key={`casestudy.${service}.${i}`}><b key={i}>{study.title}</b></p>
                      ))}
                    </ul>
                  )}
                  <Link id={`add-service-${kebabCase(service)}`} to={`${pathname}/add/${service}`}>Add case study</Link>
                </li>
              )
              
            })}
            </ul>

            {/* This error will never actually render */}
            <StatefulError
              model={`${model}.casestudies`}
              id={`add-service-${kebabCase(leftToAdd[0])}`}
              messages={{
                casestudies: `You must add case studies for each service. Remaining: ${leftToAdd.join(', ')}.`
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

              <input type="submit" role="button" value={buttonText} />
            </Form>
            
          </article>
        </Layout>
      )} />
      <Match pattern={`${pathname}/add/:service`} render={({ params }) => (
        <CaseStudyForm model="casestudy" onSubmit={onCaseStudySubmit.bind(this, router, params.service)} formName="casestudy" />
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
    getServiceList: getServiceList.bind(null, state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCaseStudySubmit: (router, service, e, values) => {
      e.preventDefault();
      dispatch(actions.push(`caseStudyForm.casestudies.${service}[]`, values));
      dispatch(actions.reset('casestudy'));
      router.transitionTo('/case-study');
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DomainList);