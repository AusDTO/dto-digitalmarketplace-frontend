import React from 'react';
import snakeCase from 'lodash/snakeCase';

import './CheckboxList.css';

export default ({ id, title, list = {}, onChange = () => {} }) => (
  <article styleName="checkboxList">
    <fieldset>
      <legend>{title}</legend>

    {Object.keys(list).map((value, i) => (
      <div key={`${id}.${i}`}>
        <input
          type="checkbox"
          name={id}
          id={snakeCase(value)}
          defaultValue={value}
          checked={list[value]}
          onChange={onChange}
        />
        <label htmlFor={snakeCase(value)}>{value}</label>
      </div>
    ))}
    </fieldset>
  </article>
);