
import React from 'react';

interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string; 
}

const Select: React.FC<SelectProps> = ({ label, id, error, options, placeholder, className, ...props }) => {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-slate-400 mb-1">
          {label}
        </label>
      )}
      <select
        id={id}
        className={`
          block w-full appearance-none rounded-md border 
          bg-slate-800 border-slate-700 
          px-3 py-2 text-slate-50 placeholder-slate-500 
          focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm
          ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-slate-700'}
          ${className}
        `}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default Select;
