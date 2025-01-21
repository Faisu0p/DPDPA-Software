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
      processingPurposes, 
    } = req.body;


    const calculateRisk = (answers) => {
      let overallRisk = 'Low'; // Default risk level is 'Low'
    
      // Define a function to map "Yes" and "No" answers to risk levels
      const getRiskLevelForAnswer = (answer) => {
        if (answer === 'Yes') {
          return 'Low'; // Yes means lower risk
        } else if (answer === 'No') {
          return 'Medium'; // No means higher risk (Medium level)
        }
        return 'Low'; // Default to low risk if no answer
      };
    
      // Define risk fields based on the Yes/No answers
      const riskFields = [
        { field: answers.processPreservedData, critical: false },
        { field: answers.internalAudits, critical: true },
        { field: answers.dpiA, critical: true },
        { field: answers.isoStatus, critical: false },
        { field: answers.processPersonalData, critical: true },
      ];
    
      // Loop through the risk fields and check for "Yes" answers
      riskFields.forEach(({ field, critical }) => {
        const fieldRisk = getRiskLevelForAnswer(field);
    
        // If any critical field has 'No' (higher risk), set overall risk to 'Medium'
        if (fieldRisk === 'Medium' && critical) {
          overallRisk = 'High'; // If any critical field is 'No', set risk to High
        } else if (fieldRisk === 'Medium' && overallRisk !== 'High') {
          overallRisk = 'Medium'; // If any non-critical field is 'No', set risk to Medium
        }
      });
    
      return overallRisk; // Return the final risk level
    };
    
    

    // Calculate the risk level
    const overallRiskLevel = calculateRisk(req.body);
    




    // You don't need to manually handle risk levels here because they are predefined in the model
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
      processingPurposes,
      overallRiskLevel,
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
