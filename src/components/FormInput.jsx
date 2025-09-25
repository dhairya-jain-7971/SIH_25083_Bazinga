import React from 'react';

const FormInput = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  required = false,
  placeholder,
  options = [],
  disabled = false,
  ...props
}) => {
  const baseInputClasses = `w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${
    error ? 'border-red-500' : 'border-gray-300'
  } ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`;

  const renderInput = () => {
    switch (type) {
      case 'textarea':
        return (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`${baseInputClasses} resize-vertical min-h-[100px]`}
            disabled={disabled}
            {...props}
          />
        );

      case 'select':
        return (
          <select
            name={name}
            value={value}
            onChange={onChange}
            className={baseInputClasses}
            disabled={disabled}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
          </select>
        );

      default:
        return (
          <input
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={baseInputClasses}
            disabled={disabled}
            {...props}
          />
        );
    }
  };

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {renderInput()}
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default FormInput;
