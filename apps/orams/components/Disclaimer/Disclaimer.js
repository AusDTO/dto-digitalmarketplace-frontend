/* eslint-disable */
import React from 'react'

import styles from './Disclaimer.scss'

const Disclaimer = props => {
  return (
    <main className={styles.container}>
      <h1>Disclaimer</h1>
      <p>We provide this website to inform the public, government agencies and sellers about the Digital Marketplace.</p>

      <h2>Website Content</h2>
      <p>
        We frequently update our content — please return to the site as required to ensure you have the latest advice.
      </p>

      <p>The material on this website may include the views or advice of third parties. These do not necessarily reflect:</p>

      <ul>
        <li>views of the DTA, or those of the Commonwealth</li>
        <li>our commitment to a particular course of action.</li>
      </ul>
    </main>
  )
}

export default Disclaimer
