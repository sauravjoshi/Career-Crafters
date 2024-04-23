import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Plot from "react-plotly.js";

interface JobData {
  Company: string;
  City: string;
  "Job Title": string;
  "Job Type": string;
  "Job Level": string;
  "Job Link": string;
  "Job Location": string;
  "Match Distance": string;
  "Token Number After Lemmatization": string;
  "Job Skills": string;
  "Job Summary": string;
}

const ResumeParser: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [resumeData, setResumeData] = useState<JobData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [reducedVectors, setReducedVectors] = useState([]);

  const handleRowClick = (index: number) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(index)) {
      newExpandedRows.delete(index);
    } else {
      newExpandedRows.add(index);
    }
    setExpandedRows(newExpandedRows);
  };

  const onDrop = useCallback((acceptedFiles: any) => {
    // Do something with the files
    const file = acceptedFiles[0];
    if (file) {
      handleUpload(file);
    }
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files?.[0] || null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("resume", file);

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/recommend", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to parse resume");
      }

      let data = await response.json();
      setReducedVectors(data.reduced_vectors);

      const jobDetails = data.job_details.map((item: any) => ({
        Company: item.company,
        City: item.city,
        "Job Title": item.job_title,
        "Job Type": item.job_type,
        "Job Level": item["job level"],
        "Job Link": item.job_link,
        "Job Location": item.job_location,
        "Match Distance": item["Match Distance"],
        "Token Number After Lemmatization":
          item.token_number_after_lem.toString(),
        "Job Skills": item.job_skills,
        "Job Summary": item.job_summary,
      }));
      setResumeData(jobDetails);
      setResumeData(jobDetails);
      setError("");
    } catch (err) {
      setError((err as Error).message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="mx-auto">
        <h1 className="text-3xl font-bold text-gray-800">Resume Parser</h1>
        <p className="mt-2 text-lg text-gray-600">
          This page will handle the parsing and analysis of resumes. Upload your
          document and let the system analyze the content.
        </p>

        <div
          {...getRootProps()}
          className="mt-6 bg-white p-6 shadow-lg rounded-lg cursor-pointer transition duration-300 ease-in-out hover:shadow-xl"
        >
          <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v24a4 4 0 004 4h16m8-12l8-8-8-8m-8 8h18"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <label
              htmlFor="file-upload"
              className="block mt-2 text-sm font-medium text-gray-900"
            >
              Upload your resume:
            </label>
            <input {...getInputProps()} className="sr-only" />
            <p className="mt-1 text-sm text-gray-900">
              Drag 'n' drop some files here, or click to select files
            </p>
            {isDragActive ? (
              <p className="text-sm text-blue-500">Drop the files here ...</p>
            ) : (
              <p className="text-sm text-gray-600">PDF, DOC, DOCX up to 10MB</p>
            )}
          </div>
        </div>

        {isLoading && (
          <div className="mt-6 flex justify-center items-center">
            <div className="spinner ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
            <p className="text-lg text-gray-600">Processing...</p>
          </div>
        )}
        {error && <p className="mt-4 text-red-500">{error}</p>}

        {reducedVectors.length > 0 && (
          <Plot
            data={[
              {
                x: reducedVectors.map((item) => item["Component 1"]),
                y: reducedVectors.map((item) => item["Component 2"]),
                z: reducedVectors.map((item) => item["Component 3"]),
                mode: "markers",
                type: "scatter3d",
                text: reducedVectors.map((item) => item["Job Title"]),
                marker: {
                  size: 8,
                  opacity: 0.8,
                  color: reducedVectors.map((item) => {
                    if (item["Type"] === "Resume") {
                      return "red";
                    } else if (item["Type"] === "Recommended Job") {
                      return "blue";
                    } else {
                      return "gray";
                    }
                  }),
                },
              },
            ]}
            layout={{
              title:
                "3D Visualization: Resume vs Recommended Jobs & Non-Recommended Jobs",
              width: 1000, // Adjust the width of the plot
              height: 800,
              scene: {
                xaxis: { title: "Component 1" },
                yaxis: { title: "Component 2" },
                zaxis: { title: "Component 3" },
              },
              margin: { l: 50, r: 50, b: 50, t: 50 },
            }}
            config={{
              responsive: true, // Make the plot responsive
            }}
          />
        )}
        {resumeData.length > 0 && (
          <div className="mt-4 overflow-x-auto shadow-lg rounded-lg">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-6 py-3">Company</th>
                  <th className="px-6 py-3">City</th>
                  <th className="px-6 py-3">Job Title</th>
                  <th className="px-6 py-3">Job Type</th>
                  <th className="px-6 py-3">Job Level</th>
                  <th className="px-6 py-3">More</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {resumeData.map((item, index) => (
                  <>
                    <tr
                      key={index}
                      onClick={() => handleRowClick(index)}
                      className="hover:bg-gray-100 cursor-pointer"
                    >
                      <td className="px-6 py-4">{item.Company}</td>
                      <td className="px-6 py-4">{item.City}</td>
                      <td className="px-6 py-4">{item["Job Title"]}</td>
                      <td className="px-6 py-4">{item["Job Type"]}</td>
                      <td className="px-6 py-4">{item["Job Level"]}</td>
                      <td className="px-6 py-4 text-blue-500 hover:text-blue-700">
                        {expandedRows.has(index) ? "Less ↑" : "More ↓"}
                      </td>
                    </tr>
                    {expandedRows.has(index) && (
                      <tr className="bg-gray-50">
                        <td colSpan={6}>
                          <div className="px-6 py-4 flex flex-col space-y-2">
                            <div>
                              <strong>Location:</strong> {item["Job Location"]}
                            </div>
                            <div>
                              <strong>Match Distance:</strong>{" "}
                              {item["Match Distance"]}
                            </div>
                            <div>
                              <strong>Token Number:</strong>{" "}
                              {item["Token Number After Lemmatization"]}
                            </div>
                            <div>
                              <strong>Skills:</strong> {item["Job Skills"]}
                            </div>
                            <div>
                              <strong>Summary:</strong> {item["Job Summary"]}
                            </div>
                            <a
                              href={item["Job Link"]}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline"
                            >
                              View Job
                            </a>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeParser;
