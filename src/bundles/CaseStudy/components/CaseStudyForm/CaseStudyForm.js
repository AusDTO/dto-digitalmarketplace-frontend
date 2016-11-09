import React from 'react';
import { connect } from 'react-redux';

import BaseForm from '../../../../shared/form/BaseForm';
import formProps from '../../../../shared/reduxModules/formPropsSelector';

import StepOne from './StepOne';

class CaseStudyForm extends BaseForm {

  static propTypes = {
    action: React.PropTypes.string,
    form: React.PropTypes.object.isRequired,
    caseStudyForm: React.PropTypes.object.isRequired,
    maxSteps: React.PropTypes.number.isRequired,
    model: React.PropTypes.string.isRequired,

    formErrors: React.PropTypes.object,
    returnLink: React.PropTypes.string,
    mode: React.PropTypes.oneOf(['add', 'edit']),
    csrf_token: React.PropTypes.string,
    serverRender: React.PropTypes.bool
  }

  static defaultProps = {
    maxSteps: 1
  }

  render() {
    const sidebarOptions = [
      { path: '/', label: 'Add case study' },
      { path: '/reference', label: 'Add reference' }
    ];

    const props = {
      ...this.props,
      sidebarOptions,
      mounted: this.state.mounted
    };

    return <StepOne {...props} />
  }
}

const mapStateToProps = (state, { router }) => {
  const { casestudy = {} } = state;
  return {
    router,
    maxSteps: 2,
    returnLink: casestudy.returnLink,
    ...formProps(state, 'caseStudyForm'),
  }
}

export {
  mapStateToProps,
  CaseStudyForm as Form
}

export default connect(mapStateToProps)(CaseStudyForm);
