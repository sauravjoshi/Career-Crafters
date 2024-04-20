import React from 'react';

const ResumeParser: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Resume Parser</h1>
      <p className="mt-2">This page will handle the parsing and analysis of resumes.</p>
      <div className="mt-4">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Upload your resume:</label>
        <input type="file" className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"/>
      </div>
    </div>
  );
};

export default ResumeParser;
