import React from 'react'

const PageNavigation = props => (
  <div className="row">
    <div className="col-sm-12">
      <nav>
        <ul>{props.links.map(link => <li>{link}</li>)}</ul>
      </nav>
    </div>
  </div>
)

export default PageNavigation
