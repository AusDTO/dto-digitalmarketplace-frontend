import React from 'react'

import Start from './components/Start';
import RegisterComponent from '../../RegisterComponent'

export const StartWidget = (props) => <Start {...props} />

export default new RegisterComponent({ 'seller-registration-start': StartWidget })
