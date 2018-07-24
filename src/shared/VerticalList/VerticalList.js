import React from 'react'
import PropTypes from 'prop-types';
const VerticalList = ({ items = [] }) => {
  if (!items.length) {
    return <span />
  }

  return (
    <ul className="list-vertical">
      {items.map((item, i) => (
        <li key={i}>
          <article>
            <h3 className="au-display-md"><a href={item.link}>{item.title}</a></h3>
            {item.meta ? <div className="meta" dangerouslySetInnerHTML={{ __html: item.meta }} /> : ''}
            {item.description ? <p>{item.description}</p> : ''}
          </article>
          {item.figure ? (
            <figure>
              <img src={item.figure.src} alt={item.figure.alt} />
            </figure>
          ) : ''}
        </li>
      ))}
  </ul>
  )
}

VerticalList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    link: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    meta: PropTypes.string,
    description: PropTypes.string,
    figure: PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired
    })
  }))
}


export default VerticalList
