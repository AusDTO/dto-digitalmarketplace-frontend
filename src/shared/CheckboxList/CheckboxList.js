import React from 'react';
import snakeCase from 'lodash/snakeCase';

import './CheckboxList.css';

export default ({ id, list = {}, onChange = () => {} }) => (
  <article styleName="checkboxList">
    {Object.keys(list).map((value, i) => (
      <div key={`${id}.${i}`}>
        <input
          type="checkbox"
          name={id}
          id={snakeCase(value)}
          value={value}
          checked={list[value]}
          onChange={onChange}
        />
        <label htmlFor={snakeCase(value)}>{value}</label>
      </div>
    ))}
  </article>
);