import React from 'react';
import './Page3.css';
import globe from "./images/globe.jpg";
import logo from "./images/dp-logo.jpg";

const Page3 = () => {
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
          {/* Boxes arranged in a circle */}
          <div className="pdf-page3-box pdf-page3-box-a">A</div>
          <div className="pdf-page3-box pdf-page3-box-b">B</div>
          <div className="pdf-page3-box pdf-page3-box-c">C</div>
          <div className="pdf-page3-box pdf-page3-box-d">D</div>
          <div className="pdf-page3-box pdf-page3-box-e">E</div>
          <div className="pdf-page3-box pdf-page3-box-f">F</div>
          <div className="pdf-page3-box pdf-page3-box-g">G</div>
          <div className="pdf-page3-box pdf-page3-box-h">H</div>

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
