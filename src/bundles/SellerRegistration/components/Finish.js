import React from 'react';

const Finish = ({ onClick }) => (
  <div>
    <h1>Congratulations!</h1>
    <p>
      This is great.  You have completed the most important step to becoming an active participant of the Marketplace.
    </p>
    <p>
      We are still finalising our terms and conditions.
    </p>
    <p>
      Once the terms are completed in early 2017 you'll be able to put your new profile live!
    </p>
  </div>
);

Finish.defaultProps = {
  onClick: () => {},
}

Finish.propTypes = {
  onClick: React.PropTypes.func
};

export default Finish;