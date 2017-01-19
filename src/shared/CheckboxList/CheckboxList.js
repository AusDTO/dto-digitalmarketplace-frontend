import React from 'react';

export default ({ id, list = [], onChange = () => {} }) => (
  <article>
    {list.map(({ key, label, description }, i) => (
      <div className="field" key={`${id}.${i}`}>
        <input type="checkbox" name={key} id={key} value={key} onChange={onChange} />
        <label htmlFor={key}>{label}</label>
      </div>
    ))}
  </article>
);