import React from 'react'
import PropTypes from 'prop-types'

const HomePage = props => {
  return (
    <div>
      <main className="">
        <article role="main" id="content" className="content-main">
          <ul className="list-vertical--thirds">
            <li>
              <h2>Buyers</h2>
              <ul className="list-horizontal">
                <li>
                  <article>
                    <h3><a href="/buyers/frameworks/digital-marketplace/requirements/digital-outcome">Request an outcome</a></h3>
                    <p>Make use of Marketplace expertise to realise your project or policy goal.</p>
                  </article>
                </li>
                <li>
                  <article>
                    <h3><a href="/buyers/frameworks/digital-marketplace/requirements/digital-professionals">Find an individual specialist</a></h3>
                    <p>Add digital people to your project in as little as 2 weeks.</p>
                  </article>
                </li>
              </ul>
            </li>
            <li>
              <h2>Sellers</h2>
              <ul className="list-horizontal">
                <li>
                  <article>
                    <h3 id="collaborate__call-to-action"><a href="/digital-marketplace/opportunities">View the latest opportunities</a></h3>
                    <p>Browse briefs that buyers have created for individuals and outcomes.</p>
                  </article>
                </li>
                <li>
                  <article>
                    <h3><a href="/sellers-guide">Sell your products and services</a></h3>
                    <p>Learn how to get listed and get new business via the Marketplace.</p>
                  </article>
                </li>
              </ul>
            </li>
            <li>
              <h2>Collaborate</h2>
              <ul className="list-horizontal">
                <li>
                  <article>
                      <h3><a href="/collaborate/code">Browse library of shared models</a></h3>
                      <p>Browse open source projects that you can reuse or contribute to.</p>
                  </article>
                </li>
                <li>
                  <article>
                    <h3><a href="/collaborate"> View smart city initiatives</a></h3>
                    <p>    Connect and learn from teams building smart communities and digital services.</p>
                  </article>
                </li>
              </ul>
            </li>
          </ul>
        </article>
      </main>
    </div>
  )
}

HomePage.defaultProps = {
}

HomePage.propTypes = {

}

export default HomePage
