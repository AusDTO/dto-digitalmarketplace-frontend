import React from 'react';
import { connect } from 'react-redux'

// TODO this should be more generic.
import { getInvalidFields } from '../../bundles/CaseStudy/redux/modules/selector';

const ErrorBox = ({ invalidFields, boxRef }) => (
  <div ref={boxRef} className="callout--warning" aria-labelledby="validation-masthead-heading" aria-role="group" tabIndex="-1" role="alert">
    <h4 className="validation-masthead-heading">There was a problem with the details you gave</h4>
    {invalidFields && (
      <ul>
        {invalidFields.map(({ messages, id }, i) => {
          return messages.map((message) => (
            <li key={i}>
              <a href={`#${id}`}> {message}</a>
            </li>
          ))
        })}
      </ul>
    )}
  </div>
);

export const mapStateToProps = (state, { boxRef }) => {
  return {
    invalidFields: getInvalidFields(state),
    boxRef
  }
}

export default connect(mapStateToProps)(ErrorBox);