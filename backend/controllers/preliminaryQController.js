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

    // You don't need to manually handle risk levels here because they are predefined in the model
    const newPreliminaryQuestions = new PreliminaryQuestions({
      processPreservedData,  // Risk level predefined in the schema
      serviceCountries,       // No risk level here
      supportFunctionalities, // No risk level here
      processingApplications, // Risk level predefined in the schema
      pii,                    // Risk level predefined in the schema
      internalAudits,         // No risk level here
      dpiA,                   // Risk level predefined in the schema
      isoStatus,              // No risk level here
      processPersonalData,    // Risk level predefined in the schema
      selectedBackgroundChecks,
      selectedBiometrics,     // Risk level predefined in the schema
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
      processingPurposes,     // directly assign the processingPurposes object
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
