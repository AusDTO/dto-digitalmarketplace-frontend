import React from 'react';

const NotFound = () => (
  <div className="error-page">
    <div className="index-page grid-row">
      <div className="column-two-thirds">
        <header className="page-heading-smaller">
          <h1 className="au-display-xl">Page not found</h1>
        </header>
        <p>
          Check you've entered the correct web address or start again on the <a href="/">Digital Marketplace homepage</a>.
        </p>
        <p>
          If you can't find what you're looking for, email <a href="mailto:marketplace@dta.gov.au?subject=Marketplace%20feedback" title="Please send feedback to marketplace@dta.gov.au">marketplace@dta.gov.au</a>
        </p>
      </div>
    </div>
  </div>
);

export default NotFound;