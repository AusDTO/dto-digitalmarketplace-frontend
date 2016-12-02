import React from 'react';

const Body = () => (
  <p>Body</p>
);

Body.propTypes = {
  services: React.PropTypes.object,
  casestudies: React.PropTypes.object,
  representative: React.PropTypes.string,
  website: React.PropTypes.string,
  linkedin: React.PropTypes.string,
  abn: React.PropTypes.string,
  address: React.PropTypes.shape({
    address_line: React.PropTypes.string,
    suburb: React.PropTypes.string,
    state: React.PropTypes.string,
    postalCode: React.PropTypes.string
  })
};

export default Body;