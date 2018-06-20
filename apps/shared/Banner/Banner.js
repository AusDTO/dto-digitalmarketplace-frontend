import React from 'react'
import styles from './Banner.scss'

const Banner = () => (
  <div className={styles.phaseBanner}>
    <div className="wrapper">
      <p>
        This is a beta. For support please <a href="/contact-us">contact us</a>
      </p>
    </div>
  </div>
)

export default Banner
