import React from 'react';

const RiskDashboard = () => {
  // Sample data
  const riskLevel = 'Medium';
  const riskScore = 55;
  const timestamp = Date.now();
  const highlights = [
    'High number of empty lists',
    'DPIA is not conducted',
    'ISO compliance missing',
  ];
  const recommendations = [
    'Conduct DPIA immediately',
    'Implement ISO standards',
    'Improve background checks',
  ];
  const inputs = [
    { name: 'Process Personal Data', value: 'Yes', riskStatus: 'Low' },
    { name: 'Internal Audits', value: 'No', riskStatus: 'High' },
    { name: 'DPIA', value: 'No', riskStatus: 'High' },
    { name: 'ISO Status', value: 'Yes', riskStatus: 'Low' },
    { name: 'Selected Biometrics', value: 'Empty', riskStatus: 'Medium' },
  ];

  const handleDownload = () => {
    alert('Report downloading...');
    // Placeholder for report generation logic
  };

  const getRiskColor = (level) => {
    switch (level) {
      case 'Low':
        return 'green';
      case 'Medium':
        return 'orange';
      case 'High':
        return 'red';
      case 'Critical':
        return 'darkred';
      default:
        return 'gray';
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      {/* Header Section */}
      <div
        style={{
          textAlign: 'center',
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '5px',
          marginBottom: '20px',
        }}
      >
        <h1>Risk Analysis Dashboard</h1>
        <div
          style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: getRiskColor(riskLevel),
          }}
        >
          Risk Level: {riskLevel}
        </div>
        <div style={{ fontSize: '18px' }}>
          Risk Score: <strong>{riskScore}</strong>
        </div>
        <small>Generated on: {new Date(timestamp).toLocaleString()}</small>
      </div>

      {/* Summary Section */}
      <div
        style={{
          padding: '20px',
          backgroundColor: '#ffffff',
          border: '1px solid #ddd',
          borderRadius: '5px',
          marginBottom: '20px',
        }}
      >
        <h2>Summary</h2>
        <div>
          <h3>Key Highlights:</h3>
          <ul>
            {highlights.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Recommendations:</h3>
          <ul>
            {recommendations.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Detailed Risk Analysis */}
      <div
        style={{
          padding: '20px',
          backgroundColor: '#ffffff',
          border: '1px solid #ddd',
          borderRadius: '5px',
          marginBottom: '20px',
        }}
      >
        <h2>Detailed Risk Analysis</h2>
        <table
          border="1"
          width="100%"
          style={{ borderCollapse: 'collapse', textAlign: 'left' }}
        >
          <thead>
            <tr>
              <th>Input Name</th>
              <th>Value</th>
              <th>Risk Status</th>
            </tr>
          </thead>
          <tbody>
            {inputs.map((input, index) => (
              <tr key={index}>
                <td>{input.name}</td>
                <td>{input.value}</td>
                <td
                  style={{
                    color:
                      input.riskStatus === 'High'
                        ? 'red'
                        : input.riskStatus === 'Medium'
                        ? 'orange'
                        : 'green',
                  }}
                >
                  {input.riskStatus}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Visualization Section */}
      <div
        style={{
          padding: '20px',
          backgroundColor: '#ffffff',
          border: '1px solid #ddd',
          borderRadius: '5px',
          marginBottom: '20px',
        }}
      >
        <h2>Visualizations</h2>
        <div>
          {/* Placeholder for visualizations */}
          <p>
            <strong>Bar Chart:</strong> This could represent the distribution of
            risk levels.
          </p>
          <p>
            <strong>Pie Chart:</strong> This could show the percentage of
            high-risk inputs vs low-risk ones.
          </p>
        </div>
      </div>

      {/* Download Button */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button
          onClick={handleDownload}
          style={{
            padding: '10px 20px',
            backgroundColor: 'blue',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Download Risk Report
        </button>
      </div>
    </div>
  );
};

export default RiskDashboard;
