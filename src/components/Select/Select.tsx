import React from 'react';
import PropTypes from 'prop-types';
// import './Select.scss';
import { IoMdArrowDropdown } from 'react-icons/io';

const Select = props => {
  return (
    <div className="select">
      <select onChange={props.onChange}>
        {props.options.map(option => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <IoMdArrowDropdown className="select__arr" />
    </div>
  );
};

Select.propTypes = {};

Select.defaultProps = {
  onChange: e => {},
  options: [],
};

export default Select;
