import { CompanyForm } from '../models/CompanyForm.js';
import PreliminaryQuestions from '../models/preliminaryQModel.js'; // Import the PreliminaryQuestions model

// Controller to fetch company name, industry type, report id, and timestamp
export const getCompanyData = async (req, res) => {
  try {
    // Fetch the company details (organization name and industry type) from the CompanyForm collection
    const companyData = await CompanyForm.find({}, 'companyDetails.organizationName companyDetails.industryType')
      .exec();

    // Fetch the reportId and timestamp from the PreliminaryQuestions collection
    const reportData = await PreliminaryQuestions.find({}, 'reportId createdAt')
      .exec();

    // Combine company and report data together
    const combinedData = companyData.map((company, index) => {
      // Assuming there's a 1:1 mapping between company data and report data based on order
      return {
        organizationName: company.companyDetails.organizationName,
        industryType: company.companyDetails.industryType,
        reportId: reportData[index] ? reportData[index].reportId : null,
        timestamp: reportData[index] ? reportData[index].createdAt : null, // Add the timestamp
      };
    });

    // Send the combined response with only the required fields
    res.status(200).json({
      success: true,
      data: combinedData,
    });
  } catch (err) {
    console.error('Error fetching company data or report data:', err);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};
