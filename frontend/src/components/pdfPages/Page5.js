import React from "react";
import "./Page5.css";
import logo from "./images/dp-logo.jpg";

const Page5 = () => {
  return (
    <div className="pdf-page5-page-container">
      <header className="pdf-page5-header">
        <div className="pdf-page5-logo">
          <img src={logo} alt="Healthians Logo" />
        </div>
        <div className="pdf-page5-header-text">Smart Report</div>
      </header>

      <main className="pdf-page5-main-content">
        <div className="pdf-page5-content">
          <section className="key-observations">
            <h2>Key Observations & Narration</h2>
            <ul>
              <li>
                Your organization processes sensitive personal data without
                conducting a DPIA (Data Protection Impact Assessment), exposing
                it to regulatory penalties under DPDP Act 2023.
              </li>
              <li>
                Global compliance gaps with ISO and NIST standards may hinder
                international operations or client trust.
              </li>
              <li>
                Identified lack of clear tracking for internal and external
                audits, potentially leaving blind spots in data security.
              </li>
            </ul>
          </section>

          <section className="recommendations">
            <h2>Recommendations</h2>
            <div>
              <h3>1. Immediate Actions:</h3>
              <ul>
                <li>Conduct a DPIA to identify and mitigate risks related to personal data.</li>
                <li>Establish a global compliance framework aligned with ISO 27001 or NIST standards.</li>
              </ul>
            </div>
            <div>
              <h3>2. Medium-Term Goals:</h3>
              <ul>
                <li>Automate data access controls and audit trails to strengthen accountability.</li>
                <li>Enhance training for teams handling personal data to reduce operational risks.</li>
              </ul>
            </div>
            <div>
              <h3>3. Long-Term Strategy:</h3>
              <ul>
                <li>Build a compliance-first culture by integrating real-time monitoring tools like Compliance360.</li>
              </ul>
            </div>
          </section>

          <section className="industry-insights">
            <h2>Industry Insights</h2>
            <ul>
              <li>
                74% of data breaches globally are due to improper access controls or lack of compliance measures.
              </li>
              <li>
                Recent regulatory fines: EUR20M imposed on a multinational corporation for non-compliance under GDPR.
              </li>
            </ul>
          </section>

          <section className="global-incidents">
            <h2>Global Incidents</h2>
            <ul>
              <li>
                <strong>Case Study:</strong> A leading retail company faced $10M in fines and reputational damage after processing personal data without a DPIA under GDPR.
              </li>
              <li>
                <strong>Insight:</strong> Over-reliance on manual audit processes is a common factor in data security breaches.
              </li>
            </ul>
          </section>

          <section className="recommended-solutions">
            <h2>Recommended Products & Solutions</h2>
            <ul>
              <li>
                <strong>Compliance360:</strong> Automates compliance tracking and DPIA processes. Real-time alerts for audit and regulatory risks.
              </li>
              <li>
                <strong>Azure Information Protection (AIP):</strong> Classifies and secures personal data.
              </li>
              <li>
                <strong>Microsoft Purview:</strong> Tracks and manages audit trails effectively.
              </li>
            </ul>
          </section>
        </div>
      </main>

      <footer className="pdf-page5-footer">
        <p>
          For any concern regarding this report, call our quality helpline at:
          1234567890
        </p>
        <p>www.dpdpasoftware.com</p>
      </footer>
    </div>
  );
};

export default Page5;
