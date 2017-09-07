import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import * as styles from './ReportItem.scss'

const computeClassname = (base, alt, formatted) =>
  cx(base, {
    [alt]: formatted
  })

const ReportItem = props => {
  let { heading, subitems, media } = props
  let mobile = media === 'mobile'

  return (
    <div className="col-sm-12" id="report-item">
      <div className={styles.reportItem}>
        {heading &&
          <h2 className={`${styles.reportItemHeading} uikit-display-2`}>
            {heading}
          </h2>}
        {subitems.map((subitem, i) =>
          <p className={`${styles.reportSubitemContainer} ${subitem.fullWidth ? 'col-sm-12' : 'col-sm-6'}`} key={i}>
            {subitem.text &&
              <span className={styles.reportItemText}>
                {subitem.text}
              </span>}
            {subitem.image &&
              <div
                className={computeClassname(
                  styles.reportItemImage,
                  styles.reportFormattedQuoteImage,
                  subitem.formattedImage
                )}
              >
                <div dangerouslySetInnerHTML={{ __html: require(`${mobile ? subitem.mobileImage : subitem.image}`) }} />
              </div>}
          </p>
        )}
      </div>
    </div>
  )
}

ReportItem.propTypes = {
  text: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  image: PropTypes.string,
  imageAlt: PropTypes.string,
  heading: PropTypes.string
}

export default ReportItem
// <div dangerouslySetInnerHTML={{ __html: require(`${subitem.image}`) }} />