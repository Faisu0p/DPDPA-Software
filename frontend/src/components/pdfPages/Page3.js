import React, { useEffect, useState } from "react";
import "./Page3.css";
import logo from "./images/dp-logo.jpg";

// icons for support functionalities
import hrIcon from "./images/hr-icon.png";
import financeIcon from "./images/finance-icon.png";
import legalIcon from "./images/legal-icon.png";
import itIcon from "./images/it-icon.png";
import operationsIcon from "./images/operations-icon.png";
import salesIcon from "./images/sales-icon.png";
import marketingIcon from "./images/marketing-icon.png";
import supportIcon from "./images/support-icon.png";
import strategyIcon from "./images/strategy-icon.png";
import engineeringIcon from "./images/engineering-icon.png";
import rndIcon from "./images/rnd-icon.png";

//icons for business functions
import bgcheckicon from "./images/bgcheck-icon.png";
import bioicon from "./images/bio-icon.png";
import brinfoicon from "./images/brinfo-icon.png";
import governmenticon from "./images/gov-icon.png";
import geneticicon from "./images/genetic-icon.png";
import experienceicon from "./images/exp-icon.png";
import socialicon from "./images/social-icon.png";
import healthcareicon from "./images/health-icon.png";

const Page3 = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRiskData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://localhost:8021/api/v1/pdf-pages/support-and-lists"
        );
        if (!response.ok) throw new Error("Failed to fetch data");
        const result = await response.json();
        setData(result.data);  // Updated to match the new structure
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchRiskData();
  }, []);
  
  const supportFunctionalities = [
    { name: "Human Resources (HR)", icon: hrIcon },
    { name: "Finance", icon: financeIcon },
    { name: "Legal", icon: legalIcon },
    { name: "Information Technology (IT)", icon: itIcon },
    { name: "Operations", icon: operationsIcon },
    { name: "Sales", icon: salesIcon },
    { name: "Marketing", icon: marketingIcon },
    { name: "Customer Support/Service", icon: supportIcon },
    { name: "Strategy/Corporate Development", icon: strategyIcon },
    { name: "Engineering", icon: engineeringIcon },
    { name: "R&D", icon: rndIcon },
  ];

  const businessFunctions = [
    { name: "Background Checks", icon: bgcheckicon },
    { name: "Biometrics", icon: bioicon },
    { name: "Browsing Information", icon: brinfoicon },
    { name: "Government Identifiers", icon: governmenticon },
    { name: "Genetic Information", icon: geneticicon },
    { name: "Professional Experience", icon: experienceicon },
    { name: "Social Information", icon: socialicon },
    { name: "Healthcare", icon: healthcareicon },
  ];

  const renderList = (items, type) =>
    items.map((item, index) => {
      // Check if the item is present in the response data for support or business functions
      const isDisabled = type === "support"
        ? !data?.SupportFunctionalities?.includes(item.name)
        : !data?.BusinessFunctionalities?.includes(item.name);
  
      return (
        <div
          key={index}
          className={`pdf-page3-item-box ${isDisabled ? "disabled" : ""}`}
        >
          <img
            src={item.icon}
            alt={`${item.name} Icon`}
            className="pdf-page3-item-icon"
          />
          <span>{item.name}</span>
        </div>
      );
    });

  return (
    <div className="pdf-page3-page-container">
      <header className="pdf-page3-header">
        <div className="pdf-page3-logo">
          <img src={logo} alt="Healthians Logo" />
        </div>
        <div className="pdf-page3-header-text">Smart Report</div>
      </header>

      <main className="pdf-page3-main-content">
        <div className="pdf-page3-content-container">
          {/* Left List */}
          <div className="pdf-page3-list-box">
            <h3 className="pdf-page3-list-title">Support Functionalities</h3>
            <div className="pdf-page3-list-content">
              {renderList(supportFunctionalities, "support")}
            </div>
          </div>

          {/* Center Logo */}
          <div className="pdf-page3-center-logo">
            <img src={logo} alt="Center Logo" />
          </div>

          {/* Right List */}
          <div className="pdf-page3-list-box">
            <h3 className="pdf-page3-list-title">Business Functions</h3>
            <div className="pdf-page3-list-content">
              {renderList(businessFunctions, "business")}
            </div>
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
