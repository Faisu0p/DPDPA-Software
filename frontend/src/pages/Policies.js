import React, { useState } from "react";
import "./Policies.css";

const Policies = () => {
  const [controlType, setControlType] = useState("");
  const [riskLevel, setRiskLevel] = useState("");

  const policies = {
    IT: {
      low: [
        "Use antivirus software.",
        "Install software updates regularly.",
        "Limit user permissions on devices.",
        "Use strong passwords.",
        "Enable automatic system backups.",
        "Monitor system activity for anomalies.",
        "Restrict access to sensitive files.",
        "Provide basic IT security training.",
        "Disable unused services on servers.",
        "Conduct periodic IT audits.",
      ],
      medium: [
        "Introduce multi-factor authentication.",
        "Use encrypted communication channels.",
        "Perform monthly vulnerability scans.",
        "Restrict admin rights to IT staff only.",
        "Ensure endpoint security solutions.",
        "Regularly review firewall configurations.",
        "Track user login attempts.",
        "Maintain a secure remote access policy.",
        "Provide intermediate IT security training.",
        "Ensure secure disposal of old devices.",
      ],
      high: [
        "Implement advanced threat detection systems.",
        "Conduct weekly penetration testing.",
        "Encrypt all sensitive data at rest and in transit.",
        "Use network segmentation for critical systems.",
        "Employ a zero-trust security model.",
        "Monitor cloud services for unauthorized access.",
        "Ensure 24/7 network monitoring.",
        "Develop an incident response plan.",
        "Provide advanced IT security training.",
        "Conduct biannual IT risk assessments.",
      ],
      critical: [
        "Implement AI-driven threat intelligence.",
        "Conduct real-time vulnerability assessments.",
        "Use hardware-level encryption for devices.",
        "Employ dedicated security teams for monitoring.",
        "Ensure compliance with global IT standards.",
        "Perform annual external security audits.",
        "Enforce strict data access control policies.",
        "Use advanced intrusion detection systems.",
        "Implement a disaster recovery plan.",
        "Partner with cybersecurity specialists.",
      ],
    },
    Documentation: {
      low: [
        "Maintain basic records for all processes.",
        "Use pre-defined templates for documents.",
        "Archive completed projects.",
        "Organize files into folders by category.",
        "Avoid duplication of records.",
        "Perform quarterly documentation reviews.",
        "Restrict edit access to key personnel.",
        "Use version control for key files.",
        "Ensure all files have clear naming conventions.",
        "Delete outdated files regularly.",
      ],
      medium: [
        "Introduce electronic documentation systems.",
        "Assign a documentation officer for oversight.",
        "Review documentation semi-annually.",
        "Ensure compliance with company standards.",
        "Use audit trails for key documents.",
        "Keep documentation accessible but secure.",
        "Establish document retention policies.",
        "Back up documents monthly.",
        "Train staff on proper documentation practices.",
        "Conduct internal reviews of documentation quality.",
      ],
      high: [
        "Implement documentation quality control teams.",
        "Introduce advanced version control software.",
        "Conduct monthly audits of key documents.",
        "Use automated tools for document consistency.",
        "Store all documents in encrypted databases.",
        "Limit access to sensitive documentation.",
        "Ensure compliance with industry standards.",
        "Provide extensive training for documentation staff.",
        "Maintain a central repository for critical files.",
        "Review access logs monthly.",
      ],
      critical: [
        "Introduce AI-based document management tools.",
        "Conduct weekly reviews of critical documentation.",
        "Ensure multi-layered access control policies.",
        "Store backups in secure, offsite locations.",
        "Develop a disaster recovery plan for documentation.",
        "Use blockchain for document integrity verification.",
        "Perform third-party audits annually.",
        "Implement 24/7 monitoring of document systems.",
        "Establish a crisis response team for documentation issues.",
        "Provide advanced training on sensitive document handling.",
      ],
    },
    Product: {
      low: [
        "Perform basic quality checks.",
        "Maintain product maintenance logs.",
        "Ensure compliance with local manufacturing rules.",
        "Track inventory manually or with spreadsheets.",
        "Keep product records updated monthly.",
        "Verify supplier compliance semi-annually.",
        "Use simple tools for defect tracking.",
        "Provide basic training to production staff.",
        "Review customer feedback annually.",
        "Conduct routine safety checks.",
      ],
      medium: [
        "Test products against standard benchmarks.",
        "Address customer feedback promptly.",
        "Introduce automated quality control tools.",
        "Ensure supplier contracts are updated yearly.",
        "Develop product testing protocols.",
        "Provide intermediate training for production teams.",
        "Review and optimize production workflows.",
        "Monitor product usage statistics.",
        "Perform biannual product compliance reviews.",
        "Maintain a comprehensive product defect log.",
      ],
      high: [
        "Engage third-party testers for critical components.",
        "Perform end-to-end testing pre-launch.",
        "Introduce predictive maintenance systems.",
        "Implement AI for defect prediction.",
        "Ensure products meet international standards.",
        "Conduct quarterly production reviews.",
        "Develop crisis response plans for product failures.",
        "Provide advanced training for production leads.",
        "Establish dedicated quality assurance teams.",
        "Audit supplier practices annually.",
      ],
      critical: [
        "Ensure compliance with all legal standards.",
        "Conduct regular product safety assessments.",
        "Partner with industry-leading quality firms.",
        "Use real-time monitoring for production lines.",
        "Implement blockchain for supply chain transparency.",
        "Develop AI-driven product optimization tools.",
        "Perform monthly customer satisfaction surveys.",
        "Ensure 24/7 monitoring of critical production systems.",
        "Conduct emergency drills for product recalls.",
        "Train all staff on handling product emergencies.",
      ],
    },
    Information: {
      low: [
        "Follow general information handling practices.",
        "Use password-protected files for sharing.",
        "Ensure basic encryption for sensitive data.",
        "Maintain accurate records of information access.",
        "Regularly review all access permissions.",
        "Train employees on basic information security.",
        "Limit external sharing of sensitive data.",
        "Back up data weekly.",
        "Ensure compliance with data retention policies.",
        "Use secure methods for information disposal.",
      ],
      medium: [
        "Encrypt sensitive data in transit.",
        "Restrict access to critical information.",
        "Conduct quarterly information security reviews.",
        "Ensure compliance with privacy regulations.",
        "Introduce intermediate security training for staff.",
        "Use secure file sharing platforms.",
        "Monitor information access logs monthly.",
        "Ensure offsite backups of critical data.",
        "Implement a secure email communication policy.",
        "Develop an incident response plan for data breaches.",
      ],
      high: [
        "Employ data masking techniques for user data.",
        "Conduct biannual information security audits.",
        "Introduce advanced encryption protocols.",
        "Develop a comprehensive data classification policy.",
        "Monitor all external data sharing.",
        "Ensure compliance with GDPR and other standards.",
        "Train staff on advanced data protection techniques.",
        "Conduct internal phishing awareness campaigns.",
        "Implement AI for data breach detection.",
        "Ensure redundancy for all critical data systems.",
      ],
      critical: [
        "Adopt advanced data loss prevention tools.",
        "Conduct penetration tests on information systems.",
        "Establish a 24/7 information security team.",
        "Use blockchain for sensitive data integrity.",
        "Ensure all data is backed up in real time.",
        "Develop a crisis response team for data breaches.",
        "Perform annual third-party information security audits.",
        "Ensure compliance with all global data protection laws.",
        "Provide continuous security training for all employees.",
        "Develop and test disaster recovery plans annually.",
      ],
    },
  };

  const getPolicies = () => {
    if (controlType && riskLevel) {
      return policies[controlType]?.[riskLevel] || ["No policies available for the selection."];
    }
    return ["Please select both a control type and a risk level to view the policies."];
  };

  return (
    <div className="policy-page-container">
      <div className="policy-page-card">
        <h1 className="policy-page-title">Policy Page</h1>

        <div className="policy-page-dropdown-section">
          {/* Control Type Dropdown */}
          <div className="policy-page-dropdown">
            <label className="policy-page-label">Select Control Type</label>
            <select
              value={controlType}
              onChange={(e) => setControlType(e.target.value)}
              className="policy-page-select"
            >
              <option value="">-- Choose Control Type --</option>
              <option value="IT">IT</option>
              <option value="Documentation">Documentation</option>
              <option value="Product">Product</option>
              <option value="Information">Information</option>
            </select>
          </div>

          {/* Risk Level Dropdown */}
          <div className="policy-page-dropdown">
            <label className="policy-page-label">Select Risk Level</label>
            <select
              value={riskLevel}
              onChange={(e) => setRiskLevel(e.target.value)}
              className="policy-page-select"
            >
              <option value="">-- Choose Risk Level --</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>
        </div>

        {/* Display Policies */}
        <div className="policy-page-display">
          <h2 className="policy-page-display-title">Policies:</h2>
          <ul className="policy-page-list">
            {getPolicies().map((policy, index) => (
              <li key={index} className="policy-page-list-item">
                {policy}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Policies;
