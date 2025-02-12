/* eslint-disable react/prop-types */

import { useState } from "react";

export const SelectComponent = ({
  name,
  value,
  onChange,
  options,
  label,
  required = false,
  disabled = false,
  className = '',  // Permite pasar clases adicionales
  errorMessage = '', 
}) => {

  const [touched, setTouched] = useState(false);

  const handleBlur = () => {
    setTouched(true);
  };

  const isError = required && touched && !value;

  return (
    <div className="relative w-full">
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        onBlur={handleBlur}
        className={`${className} peer w-full pl-2 pr-3 py-2 border border-gray-300 rounded-md bg-transparent text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500`}
      >
        <option value="" disabled hidden>
          {label}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <label
        htmlFor={name}
        className={`${className} absolute left-2 px-1 text-gray-400 bg-white transition-all duration-200 ease-in-out
          ${value
            ? 'top-[-8px] text-xs text-green-500'
            : 'top-2 text-base peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-focus:top-[-8px] peer-focus:text-xs peer-focus:text-green-500'
          }`}
      >
        {label}
      </label>
      {isError && <p className="text-red-500 text-sm mt-1 ms-2">{errorMessage || ""}</p>}
    </div>
  );
};
