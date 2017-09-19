import React from 'react';

import Signup from 'orams/components/Signup';

export const SellerApplication = (props, history) => {
  const filterSteps = (step) => {
    // Remove steps with patterns of /start and /case-study and /review and /submit
    return step.pattern.match(/\/business-details|\/business-info|\/your-info|\/tools|\/awards|\/finish-profile/);
  };
  return (
    <main>
      <Signup filterSteps={filterSteps}/>
    </main>
  )
}

export default SellerApplication
