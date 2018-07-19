import React from 'react';
import isEmpty from 'lodash/isEmpty';

import './AppChangesTable.css'; // eslint-disable-line no-unused-vars

const displayBoolean = value => {
  return <span>{(value ? 'true' : 'false')}</span>
};

export const AppChangesTable = props => {
  let data = props.data;

  return (isEmpty(data) ? null :
    <section>
      <h3>
        Differences
      </h3>
      <table styleName="changes-table summary-item-body">
        <thead>
        <tr>
          <th>Field</th>
          <th>Action</th>
          <th>Changed To Value</th>
        </tr>
        </thead>
        <tbody>
        {
          data.map((change, i) => {
            return (
              <tr key={i}>
                <td>
                  {change.path && <div>{change.path.slice(1, change.path.length)}</div>}
                </td>
                <td>
                  {change.op && <div>{change.op}</div>}
                </td>
                <td>
                  {(typeof change.value === 'string' ? (<div>{change.value}</div>) :
                      (typeof change.value === 'boolean' ? displayBoolean(change.value) :
                        null)
                  )}
                  {typeof change.value === 'object' && (
                    <div>{JSON.stringify(change.value)}</div>
                  )}
                </td>
              </tr>
            )
          })
        }
        </tbody>
      </table>
    </section>
  )
};
