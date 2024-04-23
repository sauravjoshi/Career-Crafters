import React, { useState } from 'react';

interface JobData {
    "Match Distance": string;
    "City": string;
    "Company": string;
    "Job Level": string;
    "Job Link": string;
    "Job Location": string;
    "Job Skills": string;
    "Job Summary": string;
    "Job Title": string;
    "Job Type": string;
    "Token Number After Lemmatization": string;
}

const ResumeParser: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [resumeData, setResumeData] = useState<JobData[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files[0]) {
            setFile(files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            setError('Please select a file first.');
            return;
        }

        const formData = new FormData();
        formData.append('resume', file);

        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:5000/recommend', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to parse resume');
            }

            const data: JobData[] = await response.json();
            setResumeData(data);
            setError('');
        } catch (err) {
            setError((err as Error).message || 'Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold">Resume Parser</h1>
            <p className="mt-2">This page will handle the parsing and analysis of resumes.</p>
            <div className="mt-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Upload your resume:</label>
                <input type="file" onChange={handleFileChange} className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600"/>
                <button onClick={handleUpload} className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded">Upload and Parse</button>
            </div>
            {isLoading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {resumeData && (
                <div className="mt-4 overflow-x-auto shadow-lg">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-50">
                            <tr>
                                {Object.keys(resumeData[0] || {}).map((header, index) => (
                                    <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {resumeData.map((item, index) => (
                                <tr key={index}>
                                    {Object.entries(item).map(([key, value], idx) => (
                                        <td key={idx} className="px-6 py-4 whitespace-nowrap">
                                            {key === 'Job Summary' ? (
                                                <div className="overflow-hidden text-ellipsis max-w-xs" title={value}>
                                                    {value}
                                                </div>
                                            ) : (
                                                value
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ResumeParser;
