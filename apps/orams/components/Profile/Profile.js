/* eslint-disable */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { uniqueID } from 'shared/utils/helpers'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'

import styles from './Profile.scss'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.loadProfileData()
  }

  render() {
    const { profileData } = this.props

    return (
      <div>
        {profileData
          ? <div>
              <div className={styles.headerSection}>
                <main>
                  <div className="row">
                    <div className="col-xs-12 col-sm-9">
                      <div className="uikit-display-5">
                        {profileData.user.name}
                      </div>
                      <p>
                        {profileData.user.summary}
                      </p>
                      <div className="row">
                        <div className="col-xs-12 col-sm-3">
                          <div className={styles.website}>Website</div>
                        </div>
                        <div className="col-xs-12 col-sm-8 col-sm-push-1">
                          <a className={styles.website} href={profileData.user.website} target="_blank" rel="external">
                            {profileData.user.website}
                          </a>
                        </div>
                      </div>
                      <div className={`row ${styles.businessContact}`}>
                        <div className="col-xs-12 col-sm-3">
                          <div className={styles.website}>Business contact</div>
                        </div>
                        <div className="col-xs-12 col-sm-8 col-sm-push-1">
                          <div>
                            {profileData.user.contact_name}
                          </div>
                          <div>
                            {profileData.user.contact_phone}
                          </div>
                          <div>
                            <a href={'mailto:' + profileData.user.contact_email}>
                              <strong>
                                {profileData.user.contact_email}
                              </strong>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xs-12 col-sm-3">
                      <div className={styles.contactSection}>
                        <div className={styles.contactTitle}>Update your profile and service pricing</div>
                        <a href="/orams/edit-profile">
                          <div className={styles.yellowButton}>Edit Profile</div>
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
                            {profileData.user.category_name}
                          </div>
                          <div>
                            <strong>Transacts on</strong>
                          </div>
                          <div>Occupational rehabilitation and associated medical services panel</div>
                        </div>
                      </div>
                      <div className={styles.separator} />
                      <div className="row">
                        <div className="col-sm-3 col-xs-12">
                          <div className={styles.title}>Operates in</div>
                        </div>
                        <div className="col-sm-8 col-sm-push-1 col-xs-12">
                          {profileData.user.regions.map((region, id = uniqueID()) =>
                            <div key={id}>
                              <div>
                                {region.state + ' ' + region.name}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className={styles.separator} />
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
                              {profileData.user.representative}
                            </div>
                            <div>
                              {profileData.user.phone}
                            </div>
                            <div>
                              <strong>
                                <a href={'mailto:' + profileData.user.email}>
                                  {profileData.user.email}
                                </a>
                              </strong>
                            </div>
                          </div>
                          <div className={styles.infoBlock}>
                            <div>
                              <strong>Headquarter address</strong>
                            </div>
                            <div>
                              {profileData.user.address_address_line}
                            </div>
                            <div>
                              {profileData.user.address_suburb +
                                ' ' +
                                profileData.user.address_state +
                                ' ' +
                                profileData.user.address_postal_code}
                            </div>
                          </div>
                          <div className={styles.infoBlock}>
                            <div>
                              <strong>ABN</strong>
                            </div>
                            <a
                              href={`https://abr.business.gov.au/SearchByAbn.aspx?SearchText=${profileData.user.abn}`}
                              target="_blank"
                              rel="external"
                            >
                              <strong>
                                {profileData.user.abn}
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

Profile.propTypes = {}

const mapStateToProps = state => {
  return {}
}

export default connect(mapStateToProps)(Profile)
