import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AUheading from '@gov.au/headings/lib/js/react.js'
import Tick from 'marketplace/components/Icons/Tick/Tick'
import styles from './InvitedSellers.scss'

const InvitedSellers = props => (
  <div>
    <AUheading size="xl" level="1">
      Invited sellers
    </AUheading>
    <div className="row">
      <div className="col-xs-12">
        <table className={`${styles.resultListing} col-xs-12`}>
          <thead>
            <tr className={styles.headingRow}>
              <th scope="col" className={styles.colName}>
                Seller name
              </th>
              <th scope="col" className={styles.colNumber}>
                Phone number
              </th>
              <th scope="col" className={styles.colEmail}>
                Email
              </th>
              <th scole="col" className={styles.colApplied}>
                Applied for opportunity
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(props.sellers).map(id => (
              <tr key={`item.${id}`}>
                <td className={styles.colName}>{props.sellers[id].name}</td>
                <td className={styles.colNumber}>{props.sellers[id].number && props.sellers[id].number}</td>
                <td className={styles.colEmail}>
                  {props.sellers[id].email && (
                    <a href={`mailto:${props.sellers[id].email}`}>{props.sellers[id].email}</a>
                  )}
                </td>
                <td className={styles.colApplied}>
                  <span className={styles.showSmall}>Applied for opportunity: </span>
                  {props.sellers[id].has_responded ? (
                    <span>
                      <Tick className={`${styles.tick} ${styles.hideSmall}`} colour="#17788D" />
                      Yes
                      {props.sellers[id].response_count > 0 &&
                        props.brief.lot === 'specialist' &&
                        props.brief.numberOfSuppliers > 0 && (
                          <span>
                            &nbsp;({props.sellers[id].response_count} of {props.brief.numberOfSuppliers} candidates
                            submitted)
                          </span>
                        )}
                    </span>
                  ) : (
                    'No'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
)

InvitedSellers.defaultProps = {}

InvitedSellers.propTypes = {
  sellers: PropTypes.object.isRequired,
  brief: PropTypes.object.isRequired
}

export default connect()(InvitedSellers)
