import React, { useEffect, useState } from 'react';
import './Page3.css';
import globe from './images/globe.jpg';
import logo from './images/dp-logo.jpg';

const Page3 = () => {
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

  const { inputs } = data || {};
  console.log(inputs);

  const businessFunctions = [
    'Human Resources (HR)',
    'Finance',
    'Legal',
    'Information Technology (IT)',
    'Operations',
    'Sales',
    'Marketing',
    'Customer Support/Service',
    'Strategy/Corporate Development',
    'Engineering',
    'R&D',
  ];

    // Extract support functionalities from the response
  const supportFunctionalitiesInData =
  inputs?.find((input) => input.name === "Support Functionalities")?.value
    .split(",") || [];

  // Function to check if a support functionality is present
  const isSupportFunctionalityPresent = (func) => {
  return supportFunctionalitiesInData.includes(func);
  };
  console.log(supportFunctionalitiesInData);

  return (
    <div className="pdf-page3-page-container">
      <header className="pdf-page3-header">
        <div className="pdf-page3-logo">
          <img src={logo} alt="Healthians Logo" />
        </div>
        <div className="pdf-page3-header-text">Smart Report</div>
      </header>

      <main className="pdf-page3-main-content">
        <h1 className="pdf-page3-title">Business and Support Functionalities</h1>

        <div className="pdf-page3-diagram-container">
          {/* Render boxes for each business function */}
          {businessFunctions.map((functionName, index) => (
            <div
              key={index}
              className={`pdf-page3-box pdf-page3-box-${String.fromCharCode(97 + index)}`}
            >
              {functionName}
            </div>
          ))}

          {/* Central globe image */}
          <div className="pdf-page3-globe-container">
            <img
              src={globe}
              alt="Digital globe with network connections"
              className="pdf-page3-globe-image"
            />
          </div>
        </div>
      </main>

      <footer className="pdf-page3-footer">
        <p>
          For any concern regarding this report, call our quality helpline at:
          1234567890
        </p>
        <p>www.dpdpasoftware.com</p>
      </footer>
    </div>
  );
};

export default Page3;
