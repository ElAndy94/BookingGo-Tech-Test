import React from 'react';

import './Button.scss';

const Button = props => (
  <button
    disabled={props.disabled}
    className={['button', [props.btnType]].join(' ')}
    onClick={props.clicked}
  >
    {props.children}
  </button>
);

export default Button;
