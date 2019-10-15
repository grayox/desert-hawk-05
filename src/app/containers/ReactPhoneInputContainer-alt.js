import React, { useState, } from 'react';

// https://www.npmjs.com/package/material-ui-phone-number
// import MuiPhoneNumber from 'material-ui-phone-number';
// https://www.npmjs.com/package/react-phone-input-2

import ReactPhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/dist/style.css'

const ReactPhoneInputContainer = ({ defaultCountry='us', }) => {
  const [ value, setValue, ] = useState('');

  const handleChange = data => setValue(data);

  const getReactPhoneInputContainer = () =>
    <div className="style mb-24 border border-green">
      <ReactPhoneInput
        className="h-32"
        defaultCountry={'us'}
        onChange={handleChange}
        value={value}
      />
    </div>

  return getReactPhoneInputContainer();
}

export default ReactPhoneInputContainer;