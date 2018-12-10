import React from 'react'
import PropTypes from 'prop-types'
import styles from './NoticeBar.scss'

const NoticeBar = props => (
  <div className={`${props.className} ${styles.notice} ${props.heavyFont ? styles.heavyFont : ''}`}>
    {props.children}
  </div>
)

NoticeBar.defaultProps = {
  heavyFont: false,
  className: ''
}

NoticeBar.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  heavyFont: PropTypes.bool
}

export default NoticeBar
