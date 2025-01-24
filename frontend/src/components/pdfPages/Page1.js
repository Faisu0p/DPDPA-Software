import React from "react";
import "./Page1.css";
import logo from "./images/dp-logo.jpg";

const Page1 = () => {
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
            <h1>Preliminary Questions</h1>
            <h1 className="pdf-page1-highlight">Risk Report</h1>
          </div>
        </div>

        <div className="pdf-page1-booking-details">
          <p className="pdf-page1-booking-id">Booking ID: 574127618</p>
          <h2 className="pdf-page1-company-name">Company Name</h2>
          <p className="pdf-page1-company-details">Industry Type</p>
        </div>

        <div className="pdf-page1-report-title">
          <h2 className="pdf-page1-title-text">A Comprehensive</h2>
          <h2 className="pdf-page1-highlight-text">Risk Analysis Report</h2>
          <p className="pdf-page1-subtitle">AI Based Personalized Report for You</p>
        </div>

        <div className="pdf-page1-verification-section">
          <div className="pdf-page1-qr-code"></div>
          <div className="pdf-page1-verification-text">
            <h3>INDIA'S FIRST & ONLY CREDIBILITY CHECK FOR YOUR RISK ANALYSIS REPORT</h3>
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
