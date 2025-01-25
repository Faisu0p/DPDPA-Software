import React, { useEffect, useState } from "react";
import "./Page1.css";
import logo from "./images/dp-logo.jpg";

const Page1 = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRiskData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://localhost:8021/api/v1/preliminary-questions/risk-analysis"
        );
        if (!response.ok) throw new Error("Failed to fetch data");
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

  const { timestamp } = data || {}; // Destructure safely for timestamp

  return (
    <div className="pdf-page1-report-container">
      <header className="pdf-page1-header">
        <div className="pdf-page1-logo">
          <img src={logo} alt="Healthians Logo" />
        </div>
        <div className="pdf-page1-header-text">Smart Report</div>
      </header>

      <main className="pdf-page1-main-content">
        <div className="pdf-page1-hero-section">
          <div className="pdf-page1-hero-text">
            <h1 className="pdf-page1-highlight">Preliminary Risk Report</h1>
          </div>
        </div>

        
        <div className="pdf-page1-report-title">
          <h2 className="pdf-page1-title-text">A Comprehensive</h2>
          <h2 className="pdf-page1-highlight-text">Risk Analysis Report</h2>
          <p className="pdf-page1-subtitle">
            AI-Based Personalized Report for You
          </p>
        </div>

        <div className="pdf-page1-booking-details">
          <h2 className="pdf-page1-company-name">Pink Unicorn Algorithms</h2>
          <p className="pdf-page1-company-details">Industry Type: IT</p>
          <p className="pdf-page1-booking-id">Booking ID: 574127618</p>
          <p className="pdf-page1-date-generated">
            Generated on:{" "}
            {timestamp
              ? new Date(timestamp).toLocaleString()
              : "Loading..."}
          </p>
        </div>


        <div className="pdf-page1-verification-section">
          <div className="pdf-page1-qr-code"></div>
          <div className="pdf-page1-verification-text">
            <h3>
              INDIA'S FIRST & ONLY CREDIBILITY CHECK FOR YOUR RISK ANALYSIS
              REPORT
            </h3>
            <p>Check the authenticity of your risk report with machine data</p>
            <div className="pdf-page1-verify-options">
              <p>Go to dpdpa.com on your mobile</p>
              <p>Scan the QR Code</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="pdf-page1-footer">
        <p>
          For any concern regarding this report, call our quality helpline at:
          1234567890
        </p>
        <p>www.dpdpasoftware.com</p>
      </footer>
    </div>
  );
};

export default Page1;
