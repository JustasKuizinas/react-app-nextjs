import React from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';
// import './FormInput.scss';
import { BiCalendar } from 'react-icons/bi';

const FormInput: React.FC<any> = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  function hasError() {
    return meta.touched && meta.error;
  }

  let wrapperClasses = `form-inpt ${hasError() ? 'has-error' : ''}`;

  function click(evt) {
    if (props.type == 'number') {
      var charCode = evt.which;
      if (
        (charCode > 31 && (charCode < 48 || charCode > 57)) ||
        charCode === 101
      ) {
        evt.preventDefault();
        return false;
      }
      return true;
    }
  }
  return (
    <div className={wrapperClasses}>
      <label>{label}</label>
      <input {...field} {...props} onKeyPress={click} />
      <BiCalendar className="form-inpt__calendar"></BiCalendar>
      <div className="form-inpt__error">{hasError() ? meta.error : null}</div>
    </div>
  );
};

export default FormInput;
