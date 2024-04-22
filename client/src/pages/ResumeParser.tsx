import React from 'react';

const ResumeParser: React.FC = () => {
  // Sample data to display
  const sampleData = {
    "Match Distance": "0.129",
    "City": "Houston",
    "Company": "Fluence",
    "Job Level": "Mid-Senior",
    "Job Link": "https://www.linkedin.com/jobs/view/3774813683",
    "Job Location": "Houston, TX",
    "Job Skills": "Python, Go, C++, Rust, PostgreSQL",
    "Job Summary": "Responsible for developing and maintaining the backend systems.",
    "Job Title": "Senior Backend Engineer / Data Engineer",
    "Job Type": "Hybrid",
    "Token Number After Lemmatization": "465"
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Resume Parser</h1>
      <p className="mt-2">This page will handle the parsing and analysis of resumes.</p>
      <div className="mt-4">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Upload your resume:</label>
        <input type="file" className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"/>
      </div>
      {/* Enhanced table display */}
      <div className="mt-8 overflow-x-auto shadow-lg">
        <table className="w-full whitespace-no-wrap">
          <thead>
            <tr className="text-left font-bold bg-gray-100">
              <th className="px-6 py-3 border-b-2 border-gray-200">Parameter</th>
              <th className="px-6 py-3 border-b-2 border-gray-200">Value</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Object.entries(sampleData).map(([key, value], index) => (
              <tr key={key} className="hover:bg-blue-100 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-md">
                <td className="px-6 py-4 text-sm text-gray-700">{key}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResumeParser;
