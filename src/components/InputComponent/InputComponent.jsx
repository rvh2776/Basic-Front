/* eslint-disable react/prop-types */

import { useState } from "react";

export const InputComponent = ({
    type,
    name,
    value,
    onChange,
    label,
    required = false,
    disabled = false,
    multiline = false,
    rows = 3,
    className = '',  // Permite pasar clases adicionales
    errorMessage = '',
}) => {

    const [touched, setTouched] = useState(false);

    const handleBlur = () => {
        setTouched(true);
    };

    const isError = required && touched && !value;

    return (
        <>
            {multiline ? (
                <textarea
                    name={name}
                    id={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    disabled={disabled}
                    rows={rows}
                    onBlur={handleBlur}
                    className="peer w-full pl-2 py-2 text-gray-900 bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder=" "
                >
                </textarea>
            ) : (
                <input
                    type={type}
                    name={name}
                    id={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    disabled={disabled}
                    onBlur={handleBlur}
                    className={`${className} peer w-full pl-2 py-2  text-gray-900 bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500`}
                    placeholder=" "
                />
            )}

            <label
                htmlFor={name}
                className={`${className} absolute left-2 top-2 text-gray-500 transition-all duration-200 ease-in-out bg-white px-1
                ${value ? 'top-[-8px] text-xs text-green-500 ' : 'top-5 peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-focus:top-[-8px] peer-focus:text-xs peer-focus:text-green-500'}`}
            >
                {label}
            </label>
            {isError && <p className="text-red-500 text-sm mt-1 ms-2">{errorMessage || ""}</p>}

        </>
    )
}