import React, { useState } from 'react';
import { Upload, FileCheck, Loader2 } from 'lucide-react';
import "./resumechecker.css"

function ResumeChecker() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return;

        setLoading(true);
        const formData = new FormData();
        formData.append('resume', file);

        try {
            const response = await fetch('https://cv.ablyworks.com/api/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            setResponse(data);
        } catch (error) {
            console.error('Error uploading resume:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="resume-checker">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-10">
                            <div className="text-center mb-5">
                                <h1 className="display-4 fw-bold text-success mb-3">ATS Friendly Resume Checker</h1>
                                <p className="lead text-muted">
                                    Optimize your resume for Applicant Tracking Systems (ATS)
                                </p>
                            </div>
                            <div className="upload-container p-4 p-md-5 mb-4">
                                <form onSubmit={handleSubmit}>
                                    <div className="drop-zone p-5 text-center mb-4">
                                        <input
                                            type="file"
                                            onChange={handleFileChange}
                                            className="d-none"
                                            id="resume-upload"
                                            accept=".pdf,.doc,.docx"
                                        />
                                        <label
                                            htmlFor="resume-upload"
                                            className="mb-0 cursor-pointer"
                                        >
                                            <Upload className="text-success mb-3" size={48} />
                                            <h4 className="mb-2">{file ? file.name : 'Upload your resume'}</h4>
                                            <p className="text-muted mb-0">
                                                Supported formats: PDF, DOC, DOCX
                                            </p>
                                        </label>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={!file || loading}
                                        className="custom-btn w-100 d-flex align-items-center justify-content-center"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="loader me-2" size={20} />
                                                Analyzing Resume...
                                            </>
                                        ) : (
                                            <>
                                                <FileCheck className="me-2" size={20} />
                                                Analyze Resume
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>

                            {response && (
                                <div className="upload-container p-4 p-md-5">
                                    <div className="row align-items-center mb-5">
                                        <div className="col-md-6">
                                            <h2 className="h3 mb-4">ATS Score</h2>
                                            <p className="text-muted">
                                                Your resume's compatibility with ATS systems
                                            </p>
                                        </div>
                                        <div className="col-md-6 text-center">
                                            <div className="score-circle mx-auto">
                                                <svg viewBox="0 0 100 100">
                                                    <circle
                                                        className="background"
                                                        cx="50"
                                                        cy="50"
                                                        r="45"
                                                    />
                                                    <circle
                                                        className="progress"
                                                        cx="50"
                                                        cy="50"
                                                        r="45"
                                                        strokeDasharray={`${2 * Math.PI * 45 * parseInt(response.atsScore) / 100} ${2 * Math.PI * 45}`}
                                                    />
                                                </svg>
                                                <div className="score-value">{response.atsScore}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h2 className="h3 mb-4">Improvement Suggestions</h2>
                                        <div className="suggestions">
                                            {response.suggestions.split('\n').map((suggestion, index) => (
                                                <div key={index} className="suggestion-item">
                                                    <p className="mb-0">{suggestion.replace('• ', '')}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ResumeChecker;