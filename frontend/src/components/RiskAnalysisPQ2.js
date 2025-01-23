import React, { useEffect, useState } from 'react';

const RiskDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRiskData = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8021/api/v1/preliminary-questions/risk-analysis'); // Replace with your actual API endpoint
        if (!response.ok) throw new Error('Failed to fetch data');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRiskData();
  }, []);

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

  if (loading) {
    return <div>Loading Risk Analysis...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const { riskLevel, riskScore, timestamp, highlights, recommendations, inputs } = data;

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
