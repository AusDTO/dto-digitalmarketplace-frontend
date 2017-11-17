import React from 'react'
import DocumentTitle from 'react-document-title'
import { withRouter, Switch, NavLink, Route, Redirect } from 'react-router-dom'
import { uniqueID } from 'shared/utils/helpers'
import styles from './Landing.scss'
import funded from './funded.json'

const Landing = () =>
  <div className="landing">
    <DocumentTitle title="Smart Cities Collaboration Platform - Digital Marketplace">
      <h1 className={styles.title}>
        <center>Smart Cities Collaboration Platform</center>
      </h1>
    </DocumentTitle>
    <article className={styles.uikitDisplay3}>
      The Australian Government’s $50 million {' '}
      <a href="https://cities.dpmc.gov.au/smart-cities-program" rel="external noopener noreferrer" target="_blank">
        Smart Cities and Suburbs Program
      </a>{' '}
      provides direct investment for innovative technology-based solutions to urban challenges.
    </article>

    <div className={styles.map}>
      <img src="/static/media/map.png" alt="Map of councils and Marketplace sellers across Australia" />

      <div className={styles.mapOverlay}>
        <div>
          <strong className={styles.pop}>$28.5m</strong>
          <article>allocated for Round One</article>
        </div>
        <div>
          <strong className={styles.pop}>176</strong>
          <article> applications received</article>
        </div>
        <div>
          <strong className={styles.pop}>
            <font color="#870f48">
              {52}
            </font>
          </strong>{' '}
          <article>funded projects</article>
        </div>
      </div>
    </div>
    <article className={styles.filters}>
      <NavLink to={`/2/collaborate/funded/`} activeClassName={styles.activeFilter} className={styles.filter}>
        Funded projects
      </NavLink>
      <NavLink to={`/2/collaborate/projects`} activeClassName={styles.activeFilter} className={styles.filter}>
        Collaborations
      </NavLink>
      <hr />
    </article>
    <Switch>
      <Route
        path="/2/collaborate/funded/:state"
        render={childProps => {
          const projectCount = funded.filter(
            currentValue =>
              currentValue.state.includes(childProps.match.params.state) || childProps.match.params.state === 'all'
          ).length
          return (
            <div>
              <div className={styles.funded}>
                <span className={styles.projectCount}>{projectCount}</span> project{projectCount > 1 ? 's ' : ' '}
                {childProps.match.params.state === 'all' ? '' : ` in ${childProps.match.params.state.toUpperCase()}`}
                <span className={styles.sidebar}>
                  Show:{' '}
                  <NavLink to={`/2/collaborate/funded/all`} activeClassName={styles.activeLink}>
                    all
                  </NavLink>{' '}
                  |{' '}
                  <NavLink to={`/2/collaborate/funded/nsw`} activeClassName={styles.activeLink}>
                    NSW
                  </NavLink>{' '}
                  |{' '}
                  <NavLink to={`/2/collaborate/funded/vic`} activeClassName={styles.activeLink}>
                    VIC
                  </NavLink>{' '}
                  |{' '}
                  <NavLink to={`/2/collaborate/funded/wa`} activeClassName={styles.activeLink}>
                    WA
                  </NavLink>{' '}
                  |{' '}
                  <NavLink to={`/2/collaborate/funded/sa`} activeClassName={styles.activeLink}>
                    SA
                  </NavLink>{' '}
                  |{' '}
                  <NavLink to={`/2/collaborate/funded/qld`} activeClassName={styles.activeLink}>
                    QLD
                  </NavLink>{' '}
                  |{' '}
                  <NavLink to={`/2/collaborate/funded/tas`} activeClassName={styles.activeLink}>
                    TAS
                  </NavLink>{' '}
                  |{' '}
                  <NavLink to={`/2/collaborate/funded/act`} activeClassName={styles.activeLink}>
                    ACT
                  </NavLink>{' '}
                  |{' '}
                  <NavLink to={`/2/collaborate/funded/nt`} activeClassName={styles.activeLink}>
                    NT
                  </NavLink>
                </span>
                <br />
                <hr />
              </div>

              {funded.map(val => {
                if (val.state.includes(childProps.match.params.state) || childProps.match.params.state === 'all') {
                  return (
                    <div className={styles.project} key={`${uniqueID()}${val.title}`}>
                      <h3>
                        {val.title}
                      </h3>
                      <div>
                        {val.applicant}, {val.location}
                      </div>
                      <br />
                      <p>
                        <b>Grant Amount:</b> {val.grant}
                        <br />
                        <b>Co-contribution:</b> {val.contribution}
                        <br />
                        <b>Total project value:</b> {val.total}
                        <br />
                      </p>
                      <hr />
                    </div>
                  )
                }
                return undefined
              })}
            </div>
          )
        }}
      />
      <Redirect from="/2/collaborate" to="/2/collaborate/funded/all" exact />
      <Redirect from="/2/collaborate/funded" to="/2/collaborate/funded/all" exact />
      <Route
        render={() =>
          <div>
            <h2>
              <center>Council collaboration</center>
            </h2>
            <article>
              <center>
                Connect and learn from councils building smart communities<br />
                and digital services in user-centred, data informed ways.
              </center>
            </article>
            <ul className={styles.cardList}>
              <li>
                <figure>
                  <img src="/static/media/5d_data_modelling.jpg" alt="Computer model of suburban street" width="260" />
                </figure>
                <article>
                  <h3>
                    <a href="/collaborate/project/6">5D Data Modelling</a>
                  </h3>
                  <p>Ipswich City Council</p>
                  <div>
                    <span className={styles.stage}>Discovery</span>
                  </div>
                </article>
              </li>
              <li>
                <figure>
                  <img src="/static/media/asset_management_casey.jpg" alt="Map of asset locations" width="260" />
                </figure>
                <article>
                  <h3>
                    <a href="/collaborate/project/2">Finding value in data</a>
                  </h3>
                  <p>City of Casey Council</p>
                  <div>
                    <span className={styles.stage}>Discovery</span>
                  </div>
                </article>
              </li>
              <li>
                <figure>
                  <img
                    src="/static/media/smart_lighting_adelaide.jpg"
                    alt="Street lamp with attached sensor"
                    width="260"
                  />
                </figure>
                <article>
                  <h3>
                    <a href="/collaborate/project/3">Smart City Lighting Pilot</a>
                  </h3>
                  <p>Adelaide City Council</p>
                  <div>
                    <span className={styles.stage}>Pilot</span>
                  </div>
                </article>
              </li>
              <li>
                <figure>
                  <img
                    src="/static/media/sunshine_coast_automated_waste.jpg"
                    alt="Diagram of underground tubes transporting waste"
                    width="260"
                  />
                </figure>
                <article>
                  <h3>
                    <a href="/collaborate/project/1">Underground waste collection</a>
                  </h3>
                  <p>Sunshine Coast Council</p>
                  <div>
                    <span className={styles.stage}>In build</span>
                  </div>
                </article>
              </li>
              <li>
                <figure>
                  <img
                    src="/static/media/smart_hub.jpg"
                    alt="Illustration of the location of the smart hub building"
                    width="260"
                  />
                </figure>
                <article>
                  <h3>
                    <a href="/collaborate/project/7">The Smart Hub</a>
                  </h3>
                  <p>Rockhampton Regional Council</p>
                  <div>
                    <span className={styles.stage}>Live</span>
                  </div>
                </article>
              </li>
              <li>
                <figure>
                  <img src="/static/media/rpv_trial.png" alt="Remotely piloted aircraft" width="260" />
                </figure>
                <article>
                  <h3>
                    <a href="/collaborate/project/8">UAV shark surveillance</a>
                  </h3>
                  <p>Lake Macquarie City Council</p>
                  <div>
                    <span className={styles.stage}>Pilot</span>
                  </div>
                </article>
              </li>
            </ul>
            <br />
            <article width="100%">
              <center>
                <p>Got an idea, pilot or live project to share?</p>
                <a href="/collaborate/project/new" className="uikit-btn">
                  Add your project
                </a>
                <br />
              </center>
            </article>
            <br />
            <hr />
          </div>}
      />
    </Switch>
    <div className="row">
      <div>
        <center>
          <h2>Join the Digital Marketplace</h2>
          <div className="col-xs-12 col-md-4 col-md-push-2">
            <center>
              <h3>Need digital products or services for government?</h3>
              <p>Our buyers are from across local, state, territory and federal government.</p>
              <p>
                <a href="/2/signup" className="uikit-btn">
                  Join as a buyer
                </a>
              </p>
            </center>
          </div>
          <div className={`${styles.becomeASeller} col-xs-12 col-md-4 col-md-push-2`}>
            {' '}<center>
              <div>
                <h3>
                  Offer digital products <br />or services to government
                </h3>
                <p>Access more digital opportunities across all levels of government.</p>
                <p>
                  <a href="/become-a-seller" className="uikit-btn">
                    Become a seller
                  </a>
                </p>
              </div>
            </center>
          </div>
        </center>
      </div>
    </div>
  </div>

export default withRouter(Landing)
