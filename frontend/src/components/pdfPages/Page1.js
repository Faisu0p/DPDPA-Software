import React, { useEffect, useState } from "react";
import "./Page1.css";
import logo from "./images/dp-logo.jpg";

const Page1 = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8021/api/v1/pdf-pages/company-data"); // New API endpoint
        if (!response.ok) throw new Error("Failed to fetch company data");
        const result = await response.json();
        setData(result.data); // Use the 'data' from the response
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchCompanyData();
  }, []);
  
  

  const { timestamp } = data || {};

  return (
    <div className="pdf-page1-report-container">

      {/* Header Section */}
      <header className="pdf-page1-header">
        <div className="pdf-page1-logo">
          <img src={logo} alt="Healthians Logo" />
        </div>
        <div className="pdf-page1-header-text">Smart Report</div>
      </header>

      {/* Main Content */}
      <main className="pdf-page1-main-content">

        {/* Header Section */}
        <div className="pdf-page1-hero-section">
            <h1 className="pdf-page1-highlight">Preliminary Risk Report</h1>
            <p>Your personalized AI-based analysis</p>
        </div>

        
        {/* Report Title */}
        <div className="pdf-page1-report-title">
          <h2>A Comprehensive</h2>
          <h2 className="pdf-page1-highlight-text">Risk Analysis Report</h2>
          <p>Tailored insights for informed decision-making</p>
        </div>


        {/* Booking Details */}
        <div className="pdf-page1-booking-details">

          {/* Replace hardcoded values with dynamic ones from the API response */}
          <h2 className="pdf-page1-company-name">
            {data && data.length > 0 ? data[0].organizationName : "Loading..."}
          </h2>
          <p className="pdf-page1-company-details">
            Industry Type: {data && data.length > 0 ? data[0].industryType : "Loading..."}
          </p>
          <p className="pdf-page1-booking-id">
            Report ID: {data && data.length > 0 ? data[0].reportId : "Loading..."}
          </p>
          <p className="pdf-page1-date-generated">
            Generated on:{" "}
            {data && data.length > 0
              ? new Date(data[0].timestamp).toLocaleString()
              : "Loading..."}
          </p>

        </div>


        {/* Verification Section */}
        <div className="pdf-page1-verification-section">
          <div className="pdf-page1-qr-code"></div>
          <div className="pdf-page1-verification-text">
            <h3>
              INDIA'S FIRST & ONLY CREDIBILITY CHECK FOR YOUR RISK ANALYSIS
              REPORT
            </h3>
            <p>Check the authenticity of your risk report with machine data</p>
            <div className="pdf-page1-verify-options">
              <p>Go to security360.com on your mobile</p>
              <p>Scan the QR Code</p>
            </div>
          </div>
        </div>
      </main>


      {/* Footer */}      
      <footer className="pdf-page1-footer">
        <p>
          For any concern regarding this report, contact our quality helpline at:
          security360@gmail.com
        </p>
        <p>www.security360.com</p>
      </footer>
    </div>
  );
};

export default Page1;
