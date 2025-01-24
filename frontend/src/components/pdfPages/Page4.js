import React from 'react';
import './Page4.css';
import logo from "./images/dp-logo.jpg";  // Use the same logo or update as per requirement
import Detail from "../RiskAnalysisPQ2";
const Page4 = () => {
  return (
    <div className="pdf-page4-page-container">
      <header className="pdf-page4-header">
        <div className="pdf-page4-logo">
            <img src={logo} alt="Healthians Logo" />
        </div>
        <div className="pdf-page4-header-text">Smart Report</div>
      </header>

      <main className="pdf-page4-main-content">
        {/* Empty main content section */}
        <Detail />
      </main>

      <footer className="pdf-page4-footer">
        <p>
          For any concern regarding this report, call our quality helpline at:
          1234567890
        </p>
        <p>www.dpdpasoftware.com</p>
      </footer>
    </div>
  );
};

export default Page4;
