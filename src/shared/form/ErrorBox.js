import React from 'react';
import { connect } from 'react-redux'

// TODO this should be more generic.
import { getInvalidFields } from '../../bundles/CaseStudy/redux/modules/selector';

class ErrorBox extends React.Component {

  componentDidMount() {
    const { focusOnMount } = this.props;
    if (focusOnMount) {
      this.refs.errorBox.focus();
    }
  }

  render() {
    const { invalidFields } = this.props;
    return (
      <div ref="errorBox" className="callout--warning" aria-labelledby="validation-masthead-heading" aria-role="group" tabIndex="-1" role="alert">
        <h4 className="validation-masthead-heading">There was a problem with the details you gave</h4>
        {invalidFields && (
          <ul>
            {invalidFields.map(({ messages, id }, i) => {
              return messages.map((message, j) => (
                <li key={`${i}${j}`}>
                  <a href={`#${id}`}>{message}</a>
                </li>
              ))
            })}
          </ul>
        )}
      </div>
    )
  }
}

export const mapStateToProps = (state, { focusOnMount }) => {
  return {
    invalidFields: getInvalidFields(state),
    focusOnMount
  }
}

export default connect(mapStateToProps)(ErrorBox);