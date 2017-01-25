import React from 'react';
import snakeCase from 'lodash/snakeCase';

export default ({ id, list = {}, onChange = () => {} }) => (
  <article>
    {Object.keys(list).map((value, i) => (
      <div className="field" key={`${id}.${i}`}>
        <input
          type="checkbox"
          name={snakeCase(value)}
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