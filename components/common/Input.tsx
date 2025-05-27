
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  Icon?: React.ElementType;
}

const Input: React.FC<InputProps> = ({ label, id, error, Icon, className, ...props }) => {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-slate-400 mb-1">
          {label}
        </label>
      )}
      <div className="relative rounded-md shadow-sm">
        {Icon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Icon className="h-5 w-5 text-slate-500" aria-hidden="true" />
            </div>
        )}
        <input
          id={id}
          className={`
            block w-full appearance-none rounded-md border 
            bg-slate-800 border-slate-700 
            px-3 py-2 text-slate-50 placeholder-slate-500 
            focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm
            ${Icon ? 'pl-10' : ''}
            ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-slate-700'}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
