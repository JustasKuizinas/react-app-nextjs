import * as React from 'react';
import PropTypes from 'prop-types';
// import './Button.scss';

const Button: React.FC<any> = props => {
  return (
    <>
      <button
        type={props.type}
        className={'btn ' + props.style}
        onClick={props.onClick}
      >
        {props.children}
      </button>
    
    </> 
  );
};

Button.propTypes = {};

Button.defaultProps = {
  type: 'button',
  style: '',
  onClick: () => {},
};

export default Button;
