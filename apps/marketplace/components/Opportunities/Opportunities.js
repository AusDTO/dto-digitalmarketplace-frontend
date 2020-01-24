import React from 'react'
import PropTypes from 'prop-types'
import ClosedDate from 'shared/ClosedDate'
import { rootPath } from 'marketplace/routes'

import mainStyles from 'marketplace/main.scss'
import styles from './Opportunities.scss'

const mapOpenTo = (val, lot) => {
  let value = ''
  switch (lot) {
    case 'atm':
      value = 'all'
      break
    case 'rfx':
    case 'training2':
      value = 'selected'
      break
    default:
      value = val === 'allSellers' ? 'all' : 'selected'
      break
  }
  return value
}

const mapOpenToStyles = (val, lot) => {
  let value = ''
  switch (lot) {
    case 'atm':
      value = styles.green
      break
    case 'rfx':
    case 'training2':
      value = styles.blue
      break
    default:
      value = val === 'allSellers' ? styles.green : styles.blue
      break
  }
  return value
}

const mapStates = val => {
  const vals = {
    'Australian Capital Territory': 'ACT',
    'New South Wales': 'NSW',
    Victoria: 'VIC',
    Queensland: 'QLD',
    'South Australia': 'SA',
    'Western Australia': 'WA',
    'Northern Territory': 'NT',
    Tasmania: 'TAS'
  }
  return val in vals ? vals[val] : val
}

const Opportunities = props => (
  <div className={styles.container}>
    <article className="opportunities-page" role="main">
      {props.opportunities.length === 0 && (
        <div className="row">
          <div className="col-xs-12">There are no opportunities to show that match your filter.</div>
        </div>
      )}
      {props.opportunities.length > 0 && (
        <div className={styles.hideMobile} role="table" aria-label="Opportunities">
          <div className={styles.headingRow} role="rowgroup">
            <div className="row" role="row">
              <div
                className={`col-md-1 col-sm-1 ${styles.cell} ${styles.alignCenter} ${styles.firstColumn}`}
                role="columnheader"
                id="header_opento"
              >
                Open to
              </div>
              <div
                role="columnheader"
                className={`col-md-1 col-sm-1 ${styles.cell} ${styles.alignCenter}`}
                id="header_id"
              >
                ID
              </div>
              <div role="columnheader" className={`col-md-4 col-sm-4 ${styles.cell}`} id="header_name">
                Name
              </div>
              <div role="columnheader" className={`col-md-2 col-sm-2 ${styles.cell}`} id="header_location">
                Location
              </div>
              <div role="columnheader" className={`col-md-2 col-sm-2 ${styles.cell}`} id="header_closing">
                Closing
              </div>
              <div role="columnheader" className={`col-md-1 col-sm-1 ${styles.cell}`} id="header_submissions">
                Submissions
              </div>
            </div>
          </div>
          <div role="rowgroup">
            {props.opportunities.map(item => (
              <div className={styles.tableRow} key={`item.${item.id}`} role="row">
                <div className="row">
                  <div
                    className={`col-md-1 col-sm-1 ${styles.cell} ${styles.alignCenter} ${styles.firstColumn}`}
                    role="cell"
                    aria-labelledby="header_opento"
                  >
                    <div className={`${styles.badge} ${mapOpenToStyles(item.openTo, item.lot)}`}>
                      {mapOpenTo(item.openTo, item.lot)}
                    </div>
                  </div>
                  <div
                    className={`col-md-1 col-sm-1 ${styles.cell} ${styles.alignCenter}`}
                    role="cell"
                    aria-labelledby="header_id"
                  >
                    {item.id}
                  </div>
                  <div className={`col-md-4 col-sm-4 ${styles.cell}`} role="cell" aria-labelledby="header_name">
                    {['rfx', 'training2', 'atm', 'specialist'].includes(item.lot) ? (
                      <a href={`${rootPath}/digital-marketplace/opportunities/${item.id}`}>{item.name}</a>
                    ) : (
                      <a href={`/digital-marketplace/opportunities/${item.id}`}>{item.name}</a>
                    )}
                    {item.company && <div>At: {item.company}</div>}
                  </div>
                  <div className={`col-md-2 col-sm-2 ${styles.cell}`} role="cell" aria-labelledby="header_location">
                    {item.location ? item.location.map(v => mapStates(v)).join(', ') : ''}
                  </div>
                  <div className={`col-md-2 col-sm-2 ${styles.cell}`} role="cell" aria-labelledby="header_closing">
                    {item.status === 'withdrawn' ? (
                      <span className={mainStyles.darkGrayText}>Withdrawn</span>
                    ) : (
                      <ClosedDate countdown date={item.closed_at} />
                    )}
                  </div>
                  <div
                    className={`col-md-1 col-sm-1 ${styles.cell} ${styles.lastColumn}`}
                    role="cell"
                    aria-labelledby="header_submissions"
                  >
                    {item.submissions}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {props.opportunities.length > 0 && (
        <div className={styles.hideDesktop}>
          {props.opportunities.map(item => (
            <div className={styles.tableRowMobile} key={`item.${item.id}`}>
              <div className="row">
                <div className={`col-md-10 col-sm-10 col-xs-11 ${styles.mobileColumn}`}>
                  <div className={`${styles.badgeMobile} ${item.openTo === 'allSellers' ? styles.green : styles.blue}`}>
                    open to {mapOpenTo(item.openTo)}
                  </div>
                  <div className={styles.mobileName}>
                    {['rfx', 'training2', 'atm'].includes(item.lot) ? (
                      <a href={`${rootPath}/digital-marketplace/opportunities/${item.id}`}>{item.name}</a>
                    ) : (
                      <a href={`/digital-marketplace/opportunities/${item.id}`}>{item.name}</a>
                    )}
                    <div className={styles.companyMobile}>At: {item.company}</div>
                  </div>
                  <div className={`${styles.mobileDetails} row`}>
                    <div className="col-md-3 col-sm-3 col-xs-4">
                      <div>
                        <strong>Location:</strong>
                      </div>
                      <div>
                        <strong>Closing:</strong>
                      </div>
                      <div>
                        <strong>Submissions:</strong>
                      </div>
                    </div>
                    <div className="col-md-9 col-sm-9 col-xs-8">
                      <div>{item.location ? item.location.map(v => mapStates(v)).join(', ') : <span>&nbsp;</span>}</div>
                      <div>
                        {item.status === 'withdrawn' ? (
                          <span className={mainStyles.darkGrayText}>Withdrawn</span>
                        ) : (
                          <ClosedDate countdown date={item.closed_at} />
                        )}
                      </div>
                      <div>{item.submissions}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </article>
  </div>
)

Opportunities.defaultProps = {
  opportunities: []
}

Opportunities.propTypes = {
  opportunities: PropTypes.array.isRequired
}

export default Opportunities
