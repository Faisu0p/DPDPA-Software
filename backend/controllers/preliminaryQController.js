import PreliminaryQuestions from '../models/preliminaryQModel.js';

export const submitPreliminaryQuestions = async (req, res) => {
  try {
    const {
      processPreservedData,
      serviceCountries,
      supportFunctionalities,
      processingApplications,
      pii,
      internalAudits,
      dpiA,
      isoStatus,
      processPersonalData,
      selectedBackgroundChecks,
      selectedBiometrics,
      selectedBrowsingInformation,
      selectedContactInformation,
      selectedEducationAndSkills,
      selectedEmploymentInformation,
      selectedFamilyInformation,
      selectedFinancialInformation,
      selectedGeneticInformation,
      selectedGovernmentIdentifiers,
      selectedPersonalIdentification,
      selectedProfessionalExperience,
      selectedSocialInformation,
      selectedTravelAndExpense,
      selectedUserAccountInformation,
      selectedWorkplaceWelfare,
      processingPurposes, // This will now include 'purposes' and 'justification'
    } = req.body;

    // You might want to do some validation here before creating the document
    const newPreliminaryQuestions = new PreliminaryQuestions({
      processPreservedData,
      serviceCountries,
      supportFunctionalities,
      processingApplications,
      pii,
      internalAudits,
      dpiA,
      isoStatus,
      processPersonalData,
      selectedBackgroundChecks,
      selectedBiometrics,
      selectedBrowsingInformation,
      selectedContactInformation,
      selectedEducationAndSkills,
      selectedEmploymentInformation,
      selectedFamilyInformation,
      selectedFinancialInformation,
      selectedGeneticInformation,
      selectedGovernmentIdentifiers,
      selectedPersonalIdentification,
      selectedProfessionalExperience,
      selectedSocialInformation,
      selectedTravelAndExpense,
      selectedUserAccountInformation,
      selectedWorkplaceWelfare,
      processingPurposes, // directly assign the processingPurposes object
    });

    // Save the new document in the database
    const savedData = await newPreliminaryQuestions.save();
    return res.status(201).json({
      message: 'Data submitted successfully',
      data: savedData,
    });
  } catch (err) {
    // Log the error and send an appropriate response
    console.error('Error while saving preliminary questions:', err);
    return res.status(500).json({
      message: 'Failed to submit data',
      error: err.message || 'Unknown error',
    });
  }
};
