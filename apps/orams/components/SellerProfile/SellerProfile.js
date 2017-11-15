/* eslint-disable */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { uniqueID } from 'shared/utils/helpers'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'

import styles from './SellerProfile.scss'

class SellerProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.loadSupplierData()
  }

  render() {
    const { supplierData } = this.props

    return (
      <div>
        {supplierData
          ? <div>
              <div className={styles.headerSection}>
                <main>
                  <div className="row">
                    <div className="col-xs-12 col-sm-9">
                      <div className="uikit-display-5">
                        {supplierData.name}
                      </div>
                      <p>
                        {supplierData.summary}
                      </p>
                      <div className="row">
                        <div className="col-xs-12 col-sm-3">
                          <div className={styles.website}>Website</div>
                        </div>
                        <div className="col-xs-12 col-sm-8 col-sm-push-1">
                          <a className={styles.website} href={supplierData.website} target="_blank" rel="external">
                            {supplierData.website}
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="col-xs-12 col-sm-3">
                      <div className={styles.contactSection}>
                        <div className={styles.contactTitle}>Business Contact</div>
                        <div className={styles.contactName}>
                          {supplierData.contact_name}
                        </div>
                        <div className={styles.contactNumber}>
                          {supplierData.contact_phone}
                        </div>
                        <a href={'mailto:' + supplierData.contact_email}>
                          <div className={styles.yellowButton}>Email Seller</div>
                        </a>
                      </div>
                    </div>
                  </div>
                </main>
              </div>
              <div className={styles.informationSection}>
                <main>
                  <div className="row">
                    <div className="col-sm-8 col-xs-12">
                      <div className="row">
                        <div className="col-sm-3 col-xs-12">
                          <div className={styles.title}>Services</div>
                        </div>
                        <div className="col-sm-8 col-sm-push-1 col-xs-12">
                          <div className={styles.badge}>
                            {supplierData.category_name}
                          </div>
                          <div>
                            <strong>Transacts on</strong>
                          </div>
                          <div>Occupational rehabilitation and associated medical services panel</div>
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3 col-xs-12">
                          <div className={styles.title}>Operates in</div>
                        </div>
                        <div className="col-sm-8 col-sm-push-1 col-xs-12">
                          {supplierData.regions.map((region, id = uniqueID()) =>
                            <div key={id}>
                              <div>
                                {region.state + ' ' + region.name}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3 col-xs-12">
                          <div className={styles.title}>Company details</div>
                        </div>
                        <div className="col-sm-8 col-sm-push-1 col-xs-12">
                          <div className={styles.infoBlock}>
                            <div>
                              <strong>Authorised representative</strong>
                            </div>
                            <div>
                              {supplierData.representative}
                            </div>
                            <div>
                              {supplierData.phone}
                            </div>
                            <div>
                              <strong>
                                <a href={'mailto:' + supplierData.email}>
                                  {supplierData.email}
                                </a>
                              </strong>
                            </div>
                          </div>
                          <div className={styles.infoBlock}>
                            <div>
                              <strong>Headquarter address</strong>
                            </div>
                            <div>
                              {supplierData.address_address_line}
                            </div>
                            <div>
                              {supplierData.address_suburb +
                                ' ' +
                                supplierData.address_state +
                                ' ' +
                                supplierData.address_postal_code}
                            </div>
                          </div>
                          <div className={styles.infoBlock}>
                            <div>
                              <strong>ABN</strong>
                            </div>
                            <a
                              href={`https://abr.business.gov.au/SearchByAbn.aspx?SearchText=${supplierData.abn}`}
                              target="_blank"
                              rel="external"
                            >
                              <strong>
                                {supplierData.abn}
                              </strong>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </main>
              </div>
            </div>
          : <LoadingIndicatorFullPage />}
      </div>
    )
  }
}

SellerProfile.propTypes = {}

const mapStateToProps = state => {
  return {}
}

export default connect(mapStateToProps)(SellerProfile)
