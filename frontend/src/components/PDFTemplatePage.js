import React from 'react';
import './PDFTemplatePage.css';

const PDFTemplatePage = () => {
  return (
    <div className="pdf-page-wrapper">



      <div className="pdf-page-container">
        <div className="pdf-page-header">
            <div className="pdf-page-header-left">
                <img 
                src="logo-placeholder.png" 
                alt="Company Logo" 
                className="pdf-page-header-logo" 
                />
            </div>
            <div className="pdf-page-header-right">
                <h2>Preliminary Report</h2>
            </div>
        </div>



        <div className="pdf-page-content">
            {/* Decorative Background */}
            <div className="pdf-cover-background"></div>
            
            {/* Content Section */}
            <div className="pdf-cover-content">
                <div className="pdf-cover-header">
                <img 
                    src="logo-placeholder.png" 
                    alt="Company Logo" 
                    className="pdf-cover-logo" 
                />
                </div>
                <div className="pdf-cover-main">
                <h1>Preliminart report</h1>
                <p>Subtitle or description for the report goes here. Keep it concise and professional.</p>
                </div>
                <div className="pdf-cover-footer">
                <p>© 2025 Company Name | Confidential Report</p>
                </div>
            </div>
        </div>



        <div className="pdf-page-footer">
            <p>© 2025 Company Name. All Rights Reserved. | Confidential Report - For Internal Use Only | Page 1</p>
        </div>

      </div>



      <div className="pdf-page-container">
  <div className="pdf-page-header">
    <div className="pdf-page-header-left">
      <img 
        src="logo-placeholder.png" 
        alt="Company Logo" 
        className="pdf-page-header-logo" 
      />
    </div>
    <div className="pdf-page-header-right">
      <h2>Preliminary Report</h2>
    </div>
  </div>

  <div className="pdf-page-content">
    <div className="pdf-cover-content">
      <h1>Introduction</h1>
      <p>
        We are a leading global provider of innovative solutions, committed to delivering outstanding products and services to our clients. Our team is dedicated to excellence, with a focus on customer satisfaction and value. With expertise in various industries, we offer tailored solutions that meet the unique needs of our clients.
      </p>

      <h2>Types of Industries We Serve</h2>
      <ul>
        <li><strong>Technology:</strong> Advancing digital transformation and innovation.</li>
        <li><strong>Healthcare:</strong> Providing cutting-edge medical solutions and services.</li>
        <li><strong>Finance:</strong> Delivering robust financial consulting and technology-driven solutions.</li>
        <li><strong>Retail:</strong> Offering customer-centric solutions for the retail industry.</li>
        <li><strong>Manufacturing:</strong> Streamlining processes and optimizing efficiency.</li>
      </ul>

      <h2>Countries Where We Provide Services</h2>
      <ul>
        <li><strong>United States</strong> – Our largest market, providing end-to-end solutions.</li>
        <li><strong>Germany</strong> – Offering specialized services for the automotive and manufacturing sectors.</li>
        <li><strong>United Kingdom</strong> – Expanding our footprint in Europe with top-tier solutions.</li>
        <li><strong>India</strong> – Delivering cost-effective solutions with a focus on innovation.</li>
        <li><strong>Australia</strong> – A growing market for our consulting and technology services.</li>
        <li><strong>Canada</strong> – Providing reliable and scalable solutions across various industries.</li>
      </ul>
    </div>
  </div>

  <div className="pdf-page-footer">
    <p>© 2025 Company Name. All Rights Reserved. | Confidential Report - For Internal Use Only | Page 1</p>
  </div>
</div>




      <div className="pdf-page-container">
      <div className="pdf-page-header">
            <div className="pdf-page-header-left">
                <img 
                src="logo-placeholder.png" 
                alt="Company Logo" 
                className="pdf-page-header-logo" 
                />
            </div>
            <div className="pdf-page-header-right">
                <h2>Preliminary Report</h2>
            </div>
        </div>
        <div className="pdf-page-content">
          <h1>Page 3</h1>
          <p>Content for the third page...</p>
        </div>
        <div className="pdf-page-footer">
            <p>© 2025 Company Name. All Rights Reserved. | Confidential Report - For Internal Use Only | Page 1</p>
        </div>
      </div>


      
      {/* Add more pages as needed */}
    </div>
  );
};

export default PDFTemplatePage;
