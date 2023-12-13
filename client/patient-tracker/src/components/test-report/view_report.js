import React, { useState, useEffect } from 'react';

const PatientResultsPage = () => {
  const [patientResults, setPatientResults] = useState([]);
  const [pdfUrl, setPdfUrl] = useState('');

  useEffect(() => {
    // Simulating fetching patient results from an API
    // Replace this with your actual API call or data fetching logic
    // For demonstration purposes, using a setTimeout to mimic async data fetching
    setTimeout(() => {
      // Dummy data for patient results
      const dummyResults = [
        { id: 1, patientName: 'John Doe', testType: 'Blood Test', result: 'Normal' },
        { id: 2, patientName: 'Jane Smith', testType: 'X-Ray', result: 'Abnormal' },
        // Add more patient results here if needed
      ];
      setPatientResults(dummyResults);
      
      // Simulated PDF URL (replace with actual URL)
      const pdf = 'https://www.buds.com.ua/images/Lorem_ipsum.pdf';
      setPdfUrl(pdf);
    }, 1000); // Simulate delay for fetching data
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Patient Results</h1>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {patientResults.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>Patient Name</th>
                  <th>Test Type</th>
                  <th>Result</th>
                </tr>
              </thead>
              <tbody>
                {patientResults.map(result => (
                  <tr key={result.id}>
                    <td>{result.patientName}</td>
                    <td>{result.testType}</td>
                    <td>{result.result}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Loading patient results...</p>
          )}
          {pdfUrl && (
            <div className="mt-4">
              <h2>Report PDF</h2>
              <embed src={pdfUrl} type="application/pdf" width="100%" height="500px" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientResultsPage;
