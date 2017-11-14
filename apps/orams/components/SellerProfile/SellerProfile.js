/* eslint-disable */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './SellerProfile.scss'

class SellerProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {

    return (
      <div>
        <div className={styles.headerSection}>
          <main>
            <div className="row">
              <div className="col-xs-12 col-sm-9">
                <div className="uikit-display-5">Injury Treatment Management</div>
                <p>Injury Treatment is committed to delivering customised allied health and occupational consulting expertise, enabling organisations and individuals to achieve tangible, sustainable health outcomes.</p>
                <div className="row">
                  <div className="col-xs-12 col-sm-3">
                    <div className={styles.website}>Website</div>
                  </div>
                  <div className="col-xs-12 col-sm-8 col-sm-push-1">
                    <a className={styles.website} href="https://www.injurytreatment.com.au/" target="_blank" rel="external">https://www.injurytreatment.com.au/</a>
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-sm-3">
                <div className={styles.contactSection}>
                  <div className={styles.contactTitle}>Business Contact</div>
                  <div className={styles.contactName}>Mark Smith</div>
                  <div className={styles.contactNumber}>1300 622 734</div>
                  <a href="mailto:test@test.com" ><div className={styles.yellowButton}>Email Seller</div></a>
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
                      <div className={styles.title}>
                        Services
                      </div>
                    </div>
                    <div class="col-sm-8 col-sm-push-1 col-xs-12">
                      <div>Rehabilitation</div>
                      <div><strong>Transacts on</strong></div>
                      <div>Occupational rehabilitation and associated medical services panel</div>
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3 col-xs-12">
                      <div className={styles.title}>
                        Operates in
                      </div>
                    </div>
                    <div class="col-sm-8 col-sm-push-1 col-xs-12">
                      <div>ACT</div>
                      <div>NSW</div>
                      <div>QLD South East</div>
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3 col-xs-12">
                      <div className={styles.title}>
                        Company details
                      </div>
                    </div>
                    <div class="col-sm-8 col-sm-push-1 col-xs-12">
                      <div><strong>Authorised representative</strong></div>
                      <div>Kris Kringle</div>
                      <div>02 9123 4567</div>
                      <div><stong>kriskringle@zetainteractive.com.au</stong></div>
                      <div><strong>Headquarter address</strong></div>
                      <div>Level 3, 33 Erskine Street</div>
                      <div>Sydney NSW 2000</div>
                      <div><stong>ABN</stong></div>
                      <a href="#" target="_blank" rel="external"><strong>43 096 505 123</strong></a>
                    </div>
                  </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  }
}

SellerProfile.propTypes = {}

const mapStateToProps = state => {
  return {

  }
}

export default connect(mapStateToProps)(SellerProfile)
