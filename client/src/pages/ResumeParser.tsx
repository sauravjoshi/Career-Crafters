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

type Skill = {
  skill: string;
  frequency: number;
};

const ResumeParser: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [resumeData, setResumeData] = useState<JobData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [reducedVectors, setReducedVectors] = useState([]);
  const [topSkills, setTopSkills] = useState<Skill[]>([]);
  const [resumeUploaded, setResumeUploaded] = useState(false);

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
      setResumeUploaded(true);
    }
  }, []);

  const handleFileUpload = (files: any) => {
    // Logic to handle file upload
    console.log(files);
    setResumeUploaded(true);
  };

  const handleNewUpload = () => {
    setResumeUploaded(false);
    setResumeData([]);
  };

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
      setTopSkills(data.top_skills);

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
      setError("");
    } catch (err) {
      setError((err as Error).message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Resume Parser</h1>
        {!isLoading && resumeUploaded && (
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            onClick={handleNewUpload}
          >
            Upload New Resume
          </button>
        )}
      </div>
      <p className="mt-2 text-lg text-gray-600">
        Upload your Resume and let the system analyze the content.
      </p>

      {isLoading && (
        <div className="mt-6 flex justify-center items-center">
          <div className="spinner animate-spin ease-linear rounded-full border-4 border-t-4 border-gray-300 border-t-blue-500 h-12 w-12 mb-4"></div>
        </div>
      )}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      <div className="min-h-96 mb-8">
        {!resumeUploaded ? (
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
                <p className="text-sm text-gray-600">
                  PDF, DOC, DOCX up to 10MB
                </p>
              )}
            </div>
          </div>
        ) : (
          !isLoading && (
            <>
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-2 w-full min-h-96">
                  {" "}
                  {/* Increased the width to 2/3 and reduced padding */}
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
                        height: 500,
                        title:
                          "Resume vs Recommended Jobs & Non-Recommended Jobs",
                        scene: {
                          xaxis: { title: "Component 1" },
                          yaxis: { title: "Component 2" },
                          zaxis: { title: "Component 3" },
                        },
                        margin: { l: 20, r: 20, b: 20, t: 50 }, // Reduced margins
                      }}
                      config={{
                        responsive: true, // Makes the plot responsive
                      }}
                    />
                  )}
                </div>
                <div className="col-span-2 w-full min-h-96">
                  {topSkills && topSkills.length > 0 && (
                    <Plot
                      data={[
                        {
                          x: topSkills.map((skill) => skill.skill),
                          y: topSkills.map((skill) => skill.frequency),
                          type: "bar",
                          text: topSkills.map((skill) =>
                            skill.frequency.toString()
                          ), // To show frequency values on hover
                          marker: {
                            color: "#1f77b4", // Customize color
                          },
                        },
                      ]}
                      layout={{
                        height: 500,
                        title: "Top Skills for Recommended Jobs",
                        xaxis: {
                          title: "Skills",
                        },
                        yaxis: {
                          title: "Frequency",
                          range: [
                            0,
                            Math.max(
                              ...topSkills.map((skill) => skill.frequency)
                            ) + 1,
                          ], // Ensure proper y-axis range
                        },
                        margin: { l: 40, r: 20, b: 60, t: 40 }, // Set appropriate margins
                      }}
                      config={{ responsive: true }}
                    />
                  )}
                </div>
              </div>
            </>
          )
        )}
      </div>

      <div>
        {resumeData.length > 0 && (
          <div className="mt-4 overflow-x-auto shadow-lg rounded-lg">
            <p className="mt-2 mb-4 text-lg text-gray-600">Top Job Matches</p>
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
