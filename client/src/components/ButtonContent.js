
import React from 'react';

import {Icon} from 'flight-common';

const ButtonContent = ({text, iconName}) => (
  <span>
    {text}&nbsp;&nbsp;<Icon name={`aam-${iconName}`}/>
  </span>
);

export default ButtonContent;
