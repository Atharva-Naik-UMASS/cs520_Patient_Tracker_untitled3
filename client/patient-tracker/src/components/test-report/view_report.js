import React, { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

import johnDoeReport from 'c:/Users/rachn/OneDrive/Documents/SEM 1/CS 520/project/cs520_Patient_Tracker_untitled3/client/patient-tracker/src/components/test-report/John_Doe_CBC-sample-report-with-notes_0.pdf';
import janeSmithReport from 'c:/Users/rachn/OneDrive/Documents/SEM 1/CS 520/project/cs520_Patient_Tracker_untitled3/client/patient-tracker/src/components/test-report/Jane_Smith_abdomen-mri-with-contrast-sample-report-1.pdf';

import "./view_report.css" // Import your custom CSS file for styling

const PatientResultsPage = () => {
  const [patientResults, setPatientResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);

  useEffect(() => {
    // Simulating fetching patient results from an API
    setTimeout(() => {
      const dummyResults = [
        { id: 1, patientName: 'John Doe', testType: 'Blood Test', result: 'Normal', pdfUrl: johnDoeReport },
        { id: 2, patientName: 'Jane Smith', testType: 'X-Ray', result: 'Abnormal', pdfUrl: janeSmithReport },
        // Add more patient results here if needed
      ];
      setPatientResults(dummyResults);
    }, 1000); // Simulate delay for fetching data
  }, []);

  const handleResultClick = (result) => {
    setSelectedResult(result === selectedResult ? null : result);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Patient Results</h1>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {patientResults.length > 0 ? (
            <table className="table table-bordered table-hover">
              <thead className="thead-dark">
                <tr>
                  <th>Patient Name</th>
                  <th>Test Type</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {patientResults.map(result => (
                  <React.Fragment key={result.id}>
                    <tr onClick={() => handleResultClick(result)}>
                      <td>{result.patientName}</td>
                      <td>{result.testType}</td>
                      <td>{selectedResult === result ? '▼' : '►'}</td>
                    </tr>
                    {selectedResult === result && (
                      <React.Fragment>
                        <tr>
                          <td colSpan="3">
                            <p><strong>Test Type:</strong> {result.testType}</p>
                            <p><strong>Result:</strong> {result.result}</p>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="3">
                            <p><strong>PDF Report:</strong> <a href={result.pdfUrl} target="_blank" rel="noopener noreferrer">View Report</a></p>
                          </td>
                        </tr>
                      </React.Fragment>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Loading patient results...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientResultsPage;
