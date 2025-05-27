
import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea: React.FC<TextareaProps> = ({ label, id, error, className, ...props }) => {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-slate-400 mb-1">
          {label}
        </label>
      )}
      <textarea
        id={id}
        rows={4}
        className={`
          block w-full appearance-none rounded-md border 
          bg-slate-800 border-slate-700 
          px-3 py-2 text-slate-50 placeholder-slate-500 
          focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm
          ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-slate-700'}
          ${className}
        `}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default Textarea;
