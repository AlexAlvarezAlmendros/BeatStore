
import React from 'react';
import { APP_NAME } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 border-t border-slate-700 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <p className="text-sm text-slate-400">
          &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
        </p>
        <p className="text-xs text-slate-500 mt-1">
          Powered by React, Tailwind CSS, and Gemini API.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
