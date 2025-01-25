import React from 'react';
import './Page2.css';
import logo from './images/dp-logo.jpg';
import 'font-awesome/css/font-awesome.min.css';

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
              <h3>1. Risk Analysis and Zero-Day Vulnerabilities <i className="fa fa-shield"></i></h3>
              <p>
              This section provides a detailed assessment of potential
               risks based on the preliminary data provided.It highlights 
               key risk factors, including zero-day vulnerabilities, 
               that need attention and helps identify areas of concern 
               for further evaluation and mitigation.
              </p>
            </div>
            <div className="pdf-page2-section-icon pdf-page2-health-icon"></div>
          </div>

          <div className="pdf-page2-section-item">
            <div className="pdf-page2-section-content">
              <h3>2. Historical Charts <i className="fa fa-line-chart"></i></h3>
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
              <h3>3. Calculated Vulnerabilities Results <i className="fa fa-bug"></i></h3>
              <p>
              Here, we provide a thorough analysis of the results 
              from various tests conducted to assess vulnerabilities.
              These results have been calculated to identify critical 
              vulnerability areas, ensuring accuracy and clarity in 
              addressing potential risks.
              </p>
            </div>
            <div className="pdf-page2-section-icon pdf-page2-lab-icon"></div>
          </div>

          <div className="pdf-page2-section-item">
            <div className="pdf-page2-section-content">
            <h3>4. Cybersecurity Threat Landscape <i className="fa fa-exclamation-triangle"></i></h3>
            <p>
              This section provides an overview of the current cybersecurity 
              threat landscape, highlighting emerging threats and critical 
              areas of concern.It includes an analysis of key threats such 
              as data breaches and ransomware attacks, offering insights 
              into potential risks and areas for vigilance.
            </p>
            <ul>
              <li><strong>Data Breaches:</strong> Insights into the growing risks 
              associated with unauthorized access to sensitive information, along 
              with best practices for protection.</li>
              
              <li><strong>Ransomware Attacks:</strong> A look at the increasing 
              frequency of ransomware attacks, their potential impact, and 
              strategies to mitigate these threats.</li>
            </ul>

            </div>
            <div className="pdf-page2-section-icon pdf-page2-advisory-icon"></div>
          </div>

          <div className="pdf-page2-section-item">
            <div className="pdf-page2-section-content">
              <h3>5. General Recommendations <i className="fa fa-thumb-tack"></i></h3>
              <p>
              In this section, you'll find a set of general recommendations 
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
