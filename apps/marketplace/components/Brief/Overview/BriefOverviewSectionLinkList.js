import React from 'react'
import PropTypes from 'prop-types'

import styles from './BriefOverviewSectionLinkList.scss'

const BriefOverviewSectionLinkListItem = props => {
  const { complete, path, text } = props

  return (
    <li>
      {complete === true &&
        <span className={styles.tick}>
          <img src="/static/svg/green-tick.svg" alt="Completed" />
        </span>}
      {path === null
        ? text
        : <a href={path}>
            {text}
          </a>}
    </li>
  )
}

const BriefOverviewSectionLinkList = props => {
  const { items } = props

  return (
    <ul className={styles.briefOverviewSectionLinkList}>
      {items.map(item => <BriefOverviewSectionLinkListItem key={`item.${item.text}`} {...item} />)}
    </ul>
  )
}

BriefOverviewSectionLinkListItem.defaultProps = {
  path: null
}

BriefOverviewSectionLinkListItem.propTypes = {
  complete: PropTypes.bool.isRequired,
  path: PropTypes.string,
  text: PropTypes.string.isRequired
}

BriefOverviewSectionLinkList.propTypes = {
  items: PropTypes.array.isRequired
}

export default BriefOverviewSectionLinkList
