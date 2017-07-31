jest.mock('react-dom');

import React from 'react';
import ReactDOM from 'react-dom';
import { GovAuBanner } from './GovAuBanner';


test('GovAuBanner renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GovAuBanner />, div);
});