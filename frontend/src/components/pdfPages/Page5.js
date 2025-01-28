import React, { useEffect, useState } from "react";
import "./Page5.css";
import logo from "./images/dp-logo.jpg";

// Define the Page5 component
const Page5 = () => {
  const [observations, setObservations] = useState([]);
  const [recommendations, setRecommendations] = useState({
    immediate: [],
    mediumTerm: [],
    longTerm: [],
  });

  // Fetch data from the API
  useEffect(() => {
    const fetchObservationsAndRecommendations = async () => {
      try {
        const response = await fetch('http://localhost:8021/api/v1/pdf-pages/yes-no-questions');  // Update with your actual API endpoint
        const data = await response.json();

        if (data.observations && data.recommendations) {
          setObservations(data.observations);
          setRecommendations(data.recommendations);
        }
      } catch (error) {
        console.error('Error fetching observations and recommendations:', error);
      }
    };

    fetchObservationsAndRecommendations();
  }, []);

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
              {observations.length > 0 ? (
                observations.map((observation, index) => (
                  <li key={index}>{observation}</li>
                ))
              ) : (
                <li>No observations available.</li>
              )}
            </ul>
          </section>

          <section className="recommendations">
            <h2>Recommendations</h2>
            <div>
              <h3>1. Immediate Actions:</h3>
              <ul>
                {recommendations.immediate.length > 0 ? (
                  recommendations.immediate.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))
                ) : (
                  <li>No immediate actions available.</li>
                )}
              </ul>
            </div>
            <div>
              <h3>2. Medium-Term Goals:</h3>
              <ul>
                {recommendations.mediumTerm.length > 0 ? (
                  recommendations.mediumTerm.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))
                ) : (
                  <li>No medium-term goals available.</li>
                )}
              </ul>
            </div>
            <div>
              <h3>3. Long-Term Strategy:</h3>
              <ul>
                {recommendations.longTerm.length > 0 ? (
                  recommendations.longTerm.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))
                ) : (
                  <li>No long-term strategies available.</li>
                )}
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
