import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import './Input.scss';
import { BiCalendar } from 'react-icons/bi';

const Input: React.FC<any> = props => {
  let [value, setValue] = useState(props.value);

  function onChange(e) {
    setValue(e.target.value);
    props.onChange(e.target.value);
  }
  return (
    <div className={'inpt ' + props.style}>
      <input
        name={props.name}
        value={value}
        type={props.type}
        placeholder={props.placeholder}
        onChange={onChange}
        onKeyDown={props.onKeyDown}
      />
      <BiCalendar className="inpt__calendar"></BiCalendar>
    </div>
  );
};

Input.defaultProps = {
  value: '',
  style: '',
  type: 'text',
  placeholder: '',
  onChange: () => {},
  onKeyDown: () => {},
};

export default Input;
