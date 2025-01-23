import React, { useEffect, useState, useRef } from 'react';
import { Button } from '@mui/material';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const RiskDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const reportRef = useRef();  // The reference for the component to be captured

  useEffect(() => {
    const fetchRiskData = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8021/api/v1/preliminary-questions/risk-analysis');
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

  const handleDownloadPDF = async (elementRef) => {
    const element = elementRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('RiskAnalysisReport.pdf');
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
      {/* Wrapper to apply ref to the component you want to capture */}
      <div ref={reportRef}>
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
      </div>

      {/* Download Button */}
      <Button
        variant="contained"
        color="secondary"
        onClick={() => handleDownloadPDF(reportRef)} // Pass the ref here
        sx={{
          marginBottom: 2,
          padding: '10px 20px',
          fontSize: '1rem',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          borderRadius: '30px',
          boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
          backgroundImage: 'linear-gradient(to right, #ff416c, #ff4b2b)',
          color: '#fff',
          transition: 'all 0.3s ease',
          '&:hover': {
            backgroundImage: 'linear-gradient(to right, #ff4b2b, #ff416c)',
            transform: 'scale(1.05)',
            boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
          },
        }}
      >
        🚀 Download Risk Report
      </Button>
    </div>
  );
};

export default RiskDashboard;
