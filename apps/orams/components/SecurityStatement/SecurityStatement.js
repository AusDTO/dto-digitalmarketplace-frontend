/* eslint-disable */
import React from 'react'

import styles from './SecurityStatement.scss'

const SecurityStatement = props => {
  return (
    <main className={styles.container}>
      <h1>Security statement</h1>
      <p>
       The Digital Marketplace is being delivered to make it easier for government and digital businesses to work together. We value transparency while also taking security seriously. This document describes the practices we employ to help ensure the security of our users’ data.
      </p>

      <h2>Open source</h2>
      <a href="#" className="scroll-to-top">Back to top of page <b>&uarr;</b></a>
      <p>
       All code behind the Digital Marketplace is open source and available on <a href="https://github.com/AusDTO/dto-digitalmarketplace-buyer-frontend" target="_blank" rel="external">Github</a>. The original project was forked from a version of the Digital Marketplace UK, a service that has successfully been running for a number of years. A full log of all changes since the code was forked is available on our GitHub repository.
      </p>

      <h2>Raising issues</h2>
      <a href="#" className="scroll-to-top">Back to top of page <b>&uarr;</b></a>
      <p>
       Any member of the public is able to log an issue on GitHub for the Digital Marketplace. Whether it be a bug, feature request or security concern our team is ready to respond in a timely manner to all issues. Alternatively, you can email us at <a href="mailto:marketplace@digital.gov.au">marketplace@digital.gov.au</a>.
      </p>

      <h2>Security audits</h2>
      <a href="#" className="scroll-to-top">Back to top of page <b>&uarr;</b></a>
      <p>
       The Digital Marketplace is regularly audited for vulnerabilities at source code level by the internal DTA Security Team. A full audit was completed for the Beta release and periodic audits are scheduled when new features go live. Any security bugs that are raised during these audits are fixed and deployed in a timely manner.
      </p>

      <h2>Secure cloud</h2>
      <a href="#" className="scroll-to-top">Back to top of page <b>&uarr;</b></a>
      <p>
       The Marketplace site is deployed to a secure Amazon Web Services (AWS) environment. It uses a combination of AWS services and services that are provided by the DTA cloud platform (Cloud Foundry). The database that contains all user data has restricted access and is periodically backed up.
      </p>

      <h2>Status and incident updates</h2>
      <a href="#" className="scroll-to-top">Back to top of page <b>&uarr;</b></a>
      <p>
       The current status of the Digital Marketplace site can be viewed at <a href="http://status.cloud.gov.au" target="_blank" rel="external">http://status.cloud.gov.au</a>. We publish our service availability in real time. If there is downtime for any reason, an incident will be raised on this site with regular updates until the service is restored.
      </p>

      <h2>Monitoring</h2>
      <a href="#" className="scroll-to-top">Back to top of page <b>&uarr;</b></a>
      <p>
       The Digital Marketplace is continually monitored by a range of tools that immediately notify the team of any errors or changes to performance that could affect the Digital Marketplace service.
      </p>

      <h2>Zero downtime</h2>
      <a href="#" className="scroll-to-top">Back to top of page <b>&uarr;</b></a>
      <p>
       The Digital Marketplace has a policy of zero downtime deployments. This means there’s no interruption when the site is being updated. The Digital Marketplace team regularly update the site, typically on a daily basis, and can quickly respond to any issues.
      </p>

      <h2>Feedback</h2>
      <a href="#" className="scroll-to-top">Back to top of page <b>&uarr;</b></a>
      <p>
       The Digital Marketplace is an agile development, which means it evolves in response to the needs of its users. If you have any feedback or questions relating to this document (or any other Digital Marketplace matters) else email <a href="mailto:marketplace@digital.gov.au">marketplace@digital.gov.au</a>.
      </p>

      <p>Last updated: 27-11-2017</p>
    </main>
  )
}

export default SecurityStatement
