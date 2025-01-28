import PreliminaryQuestions from '../models/preliminaryQModel.js';

export const getSupportAndSelectedLists = async (req, res) => {
  try {
    // Fetch support functionalities and the selected ABC lists from the PreliminaryQuestions collection
    const data = await PreliminaryQuestions.findOne({}, 'supportFunctionalities selectedBackgroundChecks selectedBiometrics selectedBrowsingInformation selectedGovernmentIdentifiers selectedGeneticInformation selectedProfessionalExperience selectedSocialInformation selectedhealthcare')
      .exec();

    if (!data) {
      return res.status(404).json({ message: 'No data found' });
    }

    // Prepare response with support functionalities and selected business functionalities (only names of non-empty lists)
    const supportFunctionalities = data.supportFunctionalities ? data.supportFunctionalities.functionalities || [] : [];

    const businessFunctionalities = [];

    // Check for selected business functionalities and add only the names of non-empty lists
    if (Array.isArray(data.selectedBackgroundChecks) && data.selectedBackgroundChecks.length > 0) {
      businessFunctionalities.push("Background Checks");
    }
    if (Array.isArray(data.selectedBiometrics) && data.selectedBiometrics.length > 0) {
      businessFunctionalities.push("Biometrics");
    }
    if (Array.isArray(data.selectedBrowsingInformation) && data.selectedBrowsingInformation.length > 0) {
      businessFunctionalities.push("Browsing Information");
    }
    if (Array.isArray(data.selectedGovernmentIdentifiers) && data.selectedGovernmentIdentifiers.length > 0) {
      businessFunctionalities.push("Government Identifiers");
    }
    if (Array.isArray(data.selectedGeneticInformation) && data.selectedGeneticInformation.length > 0) {
      businessFunctionalities.push("Genetic Information");
    }
    if (Array.isArray(data.selectedProfessionalExperience) && data.selectedProfessionalExperience.length > 0) {
      businessFunctionalities.push("Professional Experience");
    }
    if (Array.isArray(data.selectedSocialInformation) && data.selectedSocialInformation.length > 0) {
      businessFunctionalities.push("Social Information");
    }
    if (Array.isArray(data.selectedhealthcare) && data.selectedhealthcare.length > 0) {
      businessFunctionalities.push("Healthcare");
    }

    // Prepare the final response structure with renamed fields
    const response = {
      SupportFunctionalities: supportFunctionalities,
      BusinessFunctionalities: businessFunctionalities,
    };

    return res.status(200).json({
      success: true,
      data: response,
    });
  } catch (err) {
    console.error('Error fetching support functionalities and selected lists:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch data',
      error: err.message || 'Unknown error',
    });
  }
};
