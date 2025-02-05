import React, { useState } from 'react';
import './Policies.css';

const Policies = () => {
  const policyHeadings = [
    "1. Corporate Privacy Policy",
    "2. Data Retention Policy and Schedule",
    "3. Data Portability Policy",
    "4. Data Subject Access Request",
    "5. Guidelines on Lawful basis of Processing",
    "6. Guidelines on Lawful basis of Processing",
    "7. Guidelines for Automatic Decision Making",
    "8. Guidelines for processing Data Related to Criminal Convictions",
    "9. Data Classification and Handling Procedure",
    "10. Group Personal Data Processing Procedure",
    "11. Data Privacy Policy",
    "12. Privacy Compliance Monitoring Procedure",
  ];

  const policyDocs = [
    '/DOCS/1.pdf',
    '/DOCS/2.pdf',
    '/DOCS/3.pdf',
    '/DOCS/4.pdf',
    '/DOCS/5.pdf',
    '/DOCS/6.pdf',
    '/DOCS/7.pdf',
    '/DOCS/8.pdf',
    '/DOCS/9.pdf',
    '/DOCS/10.pdf',
    '/DOCS/11.pdf',
    '/DOCS/12.pdf',
  ];

  const handleViewDocument = (index) => {
    const documentPath = policyDocs[index];
    const fullUrl = window.location.origin + documentPath;
    window.open(fullUrl, '_blank');
  };

  const controlOptions = Array.from({ length: 172 }, (_, index) => `Control ${index + 1}`);
  
  const processTypeOptions = [
    "Technical", "Document", "Information", "Product"
  ];

  return (
    <div className="policy-page-container">
      <h1 className="policy-page-title">Privacy Policy</h1>
      <p className="policy-page-description">This Privacy Policy describes how we collect, use, and disclose your Personal Information.</p>

      <div className="policy-page-dropdown-container">
        <div className="policy-page-dropdown">
          <select className="policy-page-select">
            <option value="" disabled selected>Select a Control</option>
            {controlOptions.map((control, index) => (
              <option key={index} value={control}>{control}</option>
            ))}
          </select>
        </div>
        <div className="policy-page-dropdown">
          <select className="policy-page-select">
            <option value="" disabled selected>Select Process Type</option>
            {processTypeOptions.map((process, index) => (
              <option key={index} value={process}>{process}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="policy-page-list-container">
        <div className="policy-page-list">
          {policyHeadings.map((heading, index) => (
            <div key={index} className="policy-page-list-item">
              <p className="policy-page-list-heading">{heading}</p>
              <button className="policy-page-view-button" onClick={() => handleViewDocument(index)}>View Document</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Policies;
