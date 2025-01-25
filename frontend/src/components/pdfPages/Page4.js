import React, { useEffect, useState } from 'react';
import './Page4.css';
import logo from './images/dp-logo.jpg';

const Page4 = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRiskData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          'http://localhost:8021/api/v1/preliminary-questions/risk-analysis'
        );
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
    return <div className="pdf-page4-loading">Loading Risk Analysis...</div>;
  }

  if (error) {
    return <div className="pdf-page4-error">Error: {error}</div>;
  }

  const { riskLevel, riskScore, timestamp, highlights, recommendations, inputs } = data;

  return (
    <div className="pdf-page4-container">
      <header className="pdf-page4-header">
        <div className="pdf-page4-logo">
          <img src={logo} alt="Healthians Logo" />
        </div>
        <div className="pdf-page4-header-text">Smart Report</div>
      </header>

      <main className="pdf-page4-main">
        <section className="pdf-page4-summary">
          <h2 className="pdf-page4-risk-level">
            Risk Level: <span style={{ color: getRiskColor(riskLevel) }}>{riskLevel}</span>
          </h2>
          <p className="pdf-page4-risk-score">Risk Score: {riskScore}</p>
          <p className="pdf-page4-timestamp">Generated on: {new Date(timestamp).toLocaleString()}</p>
        </section>

        <section className="pdf-page4-highlights">
          <h3>Key Highlights:</h3>
          <ul>
            {highlights.map((item, index) => (
              <li key={index} className="pdf-page4-highlight-item">{item}</li>
            ))}
          </ul>
        </section>

        <section className="pdf-page4-recommendations">
          <h3>Recommendations:</h3>
          <ul>
            {recommendations.map((item, index) => (
              <li key={index} className="pdf-page4-recommendation-item">{item}</li>
            ))}
          </ul>
        </section>

        <section className="pdf-page4-detailed-analysis">
          <h3>Detailed Analysis:</h3>
          <table className="pdf-page4-analysis-table">
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
                  <td style={{ color: getRiskColor(input.riskStatus) }}>{input.riskStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>

      <footer className="pdf-page4-footer">
        <p className="pdf-page4-footer-text">
          For any concern regarding this report, call our quality helpline at:
          1234567890
        </p>
        <p className="pdf-page4-footer-link">www.dpdpasoftware.com</p>
      </footer>
    </div>
  );
};

export default Page4;
