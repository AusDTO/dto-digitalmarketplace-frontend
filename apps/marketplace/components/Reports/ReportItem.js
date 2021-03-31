/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import includes from 'lodash/includes'
import { uniqueID } from '../helpers'
import * as styles from './ReportItem.scss'

const computeClassname = (base, alt, formatted) =>
  classnames(base, {
    [alt]: formatted
  })

const imageRoot = '/static/media/insights/'

const ReportItem = props => {
  const { heading, subitems } = props
  const renderImage = subitem => {
    const imgClass = includes(
      [
        '768 Briefs by phase',
        '767 Briefs by phase',
        '768 Average responses per brief',
        '767 Average responses per brief',
        '768 Number of sellers per area of expertise',
        '767 Number of sellers per area of expertise'
      ],
      subitem.image.replace('.svg', '')
    )
      ? styles.bigReportImage
      : styles.reportImage
    return [
      <img
        key={subitem.image}
        className={`${styles.desktop_only} ${imgClass}`}
        src={`${imageRoot}${subitem.image}`}
        alt={subitem.imageAlt}
      />,
      <img
        key={`${subitem.mobileImage}-mobile`}
        className={`${styles.mobile_only} ${imgClass}`}
        src={`${imageRoot}${subitem.mobileImage}`}
        alt={subitem.imageAlt}
      />
    ]
  }
  return (
    <div className="col-sm-12 report-item">
      <div className={styles.reportItem}>
        {heading && (
          <h2
            className={`${styles.reportItemHeading} ${
              heading !== 'Who is buying?' ? styles.pageBreak : ''
            } au-display-lg`}
          >
            {heading}
          </h2>
        )}
        {subitems.map((subitem, id = uniqueID()) => (
          <p className={`${styles.reportSubitemContainer} ${subitem.fullWidth ? 'col-sm-12' : 'col-sm-6'}`} key={id}>
            {subitem.text && <span className={styles.reportItemText}>{subitem.text}</span>}
            {subitem.image && (
              <span
                className={computeClassname(
                  styles.reportItemImage,
                  styles.reportFormattedQuoteImage,
                  subitem.formattedImage
                )}
              >
                {subitem.imageCaption ? (
                  <span tabIndex="0" className={styles.imageCaptionContainer} aria-describedby={`${id}-caption`}>
                    {renderImage(subitem)}
                    <span className={styles.sr_only} id={`${id}-caption`}>
                      {subitem.imageCaption}
                    </span>
                  </span>
                ) : (
                  renderImage(subitem)
                )}
              </span>
            )}
          </p>
        ))}
      </div>
    </div>
  )
}

ReportItem.propTypes = {
  heading: PropTypes.string,
  subitems: PropTypes.array
}

ReportItem.defaultProps = {
  heading: '',
  subitems: []
}

export default ReportItem
