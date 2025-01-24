import React from 'react';
import './Page2.css';
import logo from './images/dp-logo.jpg';

const Page2 = () => {
  return (
    <div className="pdf-page2-report-container">

      <header className="pdf-page2-header">
        <div className="pdf-page2-logo">
            <img src={logo} alt="Healthians Logo" />
        </div>
        <div className="pdf-page2-header-text">Smart Report</div>
      </header>
      
      <div className="pdf-page2-report-content">
        <h1 className="pdf-page2-report-title">Preliminary Risk Report</h1>
        <p className="pdf-page2-report-subtitle">A Self explanatory Risk Diagnostics Report</p>
        
        <div className="pdf-page2-description">
          <p>
          The Risk Analysis Report is designed to provide a clear and comprehensive 
          overview of the potential risks based on preliminary questions. 
          This report is structured to help you understand the key factors 
          that may impact your assessment and decision-making process.
          </p>
        </div>
        
        <p className="pdf-page2-section-intro">
        Below are the sections that detail the areas of risk you 
        can expect to be evaluated, how to interpret the findings, 
        and how this analysis can be used to inform your approach to risk management.
        </p>

        <div className="pdf-page2-report-sections">
          <div className="pdf-page2-section-item">
            <div className="pdf-page2-section-content">
              <h3>1. Risk Analysis</h3>
              <p>
              This section provides a detailed assessment of 
              potential risks based on the preliminary data provided. 
              It highlights key risk factors that need attention and 
              helps identify areas of concern for further evaluation.
              </p>
            </div>
            <div className="pdf-page2-section-icon pdf-page2-health-icon"></div>
          </div>

          <div className="pdf-page2-section-item">
            <div className="pdf-page2-section-content">
              <h3>2. Historical Charts</h3>
              <p>
              This section presents comparative charts that illustrate 
              how identified risks have evolved over time. These visual 
              representations allow you to track changes and identify 
              trends to inform future risk management decisions.
              </p>
            </div>
            <div className="pdf-page2-section-icon pdf-page2-chart-icon"></div>
          </div>

          <div className="pdf-page2-section-item">
            <div className="pdf-page2-section-content">
              <h3>3. Calculated Test Results</h3>
              <p>
              Here, we provide a thorough analysis of the results from 
              various tests conducted as part of the risk assessment process. 
              These results have been calculated to identify critical risk areas, 
              ensuring accuracy and clarity.
              </p>
            </div>
            <div className="pdf-page2-section-icon pdf-page2-lab-icon"></div>
          </div>

          <div className="pdf-page2-section-item">
            <div className="pdf-page2-section-content">
              <h3>4. Risk Advisory</h3>
              <p>
              This advisory provides actionable recommendations to 
              mitigate or manage the identified risks. It includes 
              suggestions for adjustments to processes, further assessments, 
              or consultations if needed to address any significant concerns.
              </p>
            </div>
            <div className="pdf-page2-section-icon pdf-page2-advisory-icon"></div>
          </div>

          <div className="pdf-page2-section-item">
            <div className="pdf-page2-section-content">
              <h3>5. General Recommendations</h3>
              <p>
              In this section, you’ll find a set of general recommendations 
              for minimizing potential risks, tailored to different scenarios. 
              The recommendations are categorized to provide clear guidance on 
              how often you should perform certain checks or updates based on 
              the risks identified.
              </p>
            </div>
            <div className="pdf-page2-section-icon pdf-page2-recommendations-icon"></div>
          </div>
        </div>
      </div>

      <footer className="pdf-page2-footer">
        <p>
          For any concern regarding this report, call our quality helpline at:
          1234567890
        </p>
        <p>www.dpdpasoftware.com</p>
      </footer>

    </div>
  );
};

export default Page2;
