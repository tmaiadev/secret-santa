import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const strToDate = (str) => {
  const date = new Date();
  if (str) date.parse(str);
  return str;
};

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const Input = ({
  type,
  id,
  name,
  label,
  error,
  onChange,
  defaultValue
}) => {
  const [defaultDateValue, setDefaultDateValue] = useState(
    type === "datetime"
      ? strToDate(defaultValue)
      : null
  );

  const getInput = () => {
    switch (type) {
      case 'datetime':
        return (
          <fieldset
            className="input__datetime"
            id={id}
            aria-label={label}
          >
            <div className="input__datetime-grid">
              <select
                type="text"
                name="date"
                className="input__input"
                onChange={onChange}
                defaultValue={defaultValue}
              >
                {
                  Array(31)
                    .fill(null)
                    .map((_, index) => (
                      <option
                        key={index}
                        value={index + 1}
                      >
                        {`0${index + 1}`.substr(-2)}
                      </option>
                    ))
                }
              </select>
              <select
                type="text"
                name="date"
                className="input__input"
                onChange={onChange}
                defaultValue={defaultValue}
              >
                {
                  Array(12)
                    .fill(null)
                    .map((_, index) => (
                      <option
                        key={index}
                        value={index}
                      >
                        {months[index]}
                      </option>
                    ))
                }
              </select>
              <select
                type="text"
                name="year"
                className="input__input"
                onChange={onChange}
                defaultValue={defaultValue}
              >
                {
                  Array(3)
                    .fill(null)
                    .map((_, index) => (
                      <option
                        key={index}
                        value={index + 1}
                      >
                        {new Date().getFullYear() + index}
                      </option>
                    ))
                }
              </select>
            </div>
          </fieldset>
        );

      case 'textarea':
        return (
          <textarea
            name={name}
            id={id}
            className="input__input input__input--textarea"
            onChange={onChange}
            defaultValue={defaultValue}
          />
        );

      default:
        return (
          <input
            type="text"
            name={name}
            id={id}
            className="input__input"
            onChange={onChange}
            defaultValue={defaultValue}
          />
        );
    }
  };

  return (
    <div className="input">
      <label
        htmlFor={id}
        className="input__label"
      >
        {label}:
      </label>
      {getInput()}      
    </div>
  )
};

Input.propTypes = {
  type: PropTypes.oneOf(['text', 'textarea', 'datetime']),
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.string
};

Input.defaultProps = {
  type: 'text',
  error: '',
  defaultValue: ''
};

export default Input;
