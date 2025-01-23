// import PreliminaryQuestions from '../models/preliminaryQModel.js';

// export const submitPreliminaryQuestions = async (req, res) => {
//   try {
//     const {
//       processPersonalData,
//       internalAudits,
//       dpiA,
//       isoStatus,

//       serviceCountries,
//       supportFunctionalities,
//       processingApplications, 
//       processingPurposes, 
//       individualData,


//       selectedBackgroundChecks,
//       selectedBiometrics,
//       selectedBrowsingInformation,
//       selectedContactInformation,
//       selectedEducationAndSkills,
//       selectedEmploymentInformation,
//       selectedFamilyInformation,
//       selectedFinancialInformation,
//       selectedGeneticInformation,
//       selectedGovernmentIdentifiers,
//       selectedPersonalIdentification,
//       selectedhealthcare,
//       selectedProfessionalExperience,
//       selectedSocialInformation,
//       selectedTravelAndExpense,
//       selectedUserAccountInformation,
//       selectedWorkplaceWelfare,

//     } = req.body;


//     const calculateRisk = (answers) => {
//       let overallRisk = 'Low'; // Default risk level is 'Low'
    
//       // Define a function to map "Yes" and "No" answers to risk levels
//       const getRiskLevelForAnswer = (answer) => {
//         if (answer === 'Yes') {
//           return 'Low'; // Yes means lower risk
//         } else if (answer === 'No') {
//           return 'Medium'; // No means higher risk (Medium level)
//         }
//         return 'Low'; // Default to low risk if no answer
//       };
    
//       // Define risk fields based on the Yes/No answers
//       const riskFields = [
//         { field: answers.processPersonalData, critical: false },
//         { field: answers.internalAudits, critical: true },
//         { field: answers.dpiA, critical: true },
//         { field: answers.isoStatus, critical: false },
//         { field: answers.individualData, critical: true },
//       ];
    
//       // Loop through the risk fields and check for "Yes" answers
//       riskFields.forEach(({ field, critical }) => {
//         const fieldRisk = getRiskLevelForAnswer(field);
    
//         // If any critical field has 'No' (higher risk), set overall risk to 'Medium'
//         if (fieldRisk === 'Medium' && critical) {
//           overallRisk = 'High'; // If any critical field is 'No', set risk to High
//         } else if (fieldRisk === 'Medium' && overallRisk !== 'High') {
//           overallRisk = 'Medium'; // If any non-critical field is 'No', set risk to Medium
//         }
//       });
    
//       return overallRisk; // Return the final risk level
//     };
//     // Calculate the risk level
//     const overallRiskLevel = calculateRisk(req.body);
    




//     // You don't need to manually handle risk levels here because they are predefined in the model
//     const newPreliminaryQuestions = new PreliminaryQuestions({
//       processPersonalData,  
//       serviceCountries,       
//       supportFunctionalities,
//       processingApplications,                   
//       internalAudits,         
//       dpiA,                   
//       isoStatus,              
//       individualData,    
//       selectedBackgroundChecks,
//       selectedBiometrics,     
//       selectedBrowsingInformation,
//       selectedContactInformation,
//       selectedEducationAndSkills,
//       selectedEmploymentInformation,
//       selectedFamilyInformation,
//       selectedFinancialInformation,
//       selectedGeneticInformation,
//       selectedGovernmentIdentifiers,
//       selectedPersonalIdentification,
//       selectedhealthcare,
//       selectedProfessionalExperience,
//       selectedSocialInformation,
//       selectedTravelAndExpense,
//       selectedUserAccountInformation,
//       selectedWorkplaceWelfare,
//       processingPurposes,
//       overallRiskLevel,
//     });

//     // Save the new document in the database
//     const savedData = await newPreliminaryQuestions.save();
//     return res.status(201).json({
//       message: 'Data submitted successfully',
//       data: savedData,
//     });
//   } catch (err) {
//     // Log the error and send an appropriate response
//     console.error('Error while saving preliminary questions:', err);
//     return res.status(500).json({
//       message: 'Failed to submit data',
//       error: err.message || 'Unknown error',
//     });
//   }
// };



// // New function to fetch risk analysis
// export const getRiskAnalysis = async (req, res) => {
//   try {
//     const data = await PreliminaryQuestions.findOne({}); // Or you can modify this to find specific user data
//     if (!data) {
//       return res.status(404).json({ message: 'No risk analysis data found' });
//     }
//     return res.status(200).json({
//       riskLevel: data.overallRiskLevel, // Assuming the risk level is stored as 'overallRiskLevel'
//     });
//   } catch (err) {
//     console.error('Error while fetching risk analysis:', err);
//     return res.status(500).json({
//       message: 'Failed to fetch risk analysis data',
//       error: err.message || 'Unknown error',
//     });
//   }
// };




import PreliminaryQuestions from '../models/preliminaryQModel.js';

export const submitPreliminaryQuestions = async (req, res) => {
  try {
    const {
      processPersonalData,
      internalAudits,
      dpiA,
      isoStatus,

      serviceCountries,
      supportFunctionalities,
      processingApplications, 
      processingPurposes, 
      individualData,


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
      selectedhealthcare,
      selectedProfessionalExperience,
      selectedSocialInformation,
      selectedTravelAndExpense,
      selectedUserAccountInformation,
      selectedWorkplaceWelfare,
    } = req.body;

    // Calculate risk level and score
    const calculateRisk = (answers) => {
      const yesNoFields = [
        answers.processPersonalData,
        answers.internalAudits,
        answers.dpiA,
        answers.isoStatus,
      ];

      const lists = [
        answers.selectedBackgroundChecks,
        answers.selectedBiometrics,
        answers.selectedBrowsingInformation,
        answers.selectedGovernmentIdentifiers,
        answers.selectedGeneticInformation,
        answers.selectedProfessionalExperience,
        answers.selectedSocialInformation,
        answers.selectedhealthcare,
      ];

      // Count Yes/No fields
      const yesCount = yesNoFields.filter((field) => field === 'Yes').length;
      const noCount = yesNoFields.filter((field) => field === 'No').length;

      // Count non-empty lists
      const filledListsCount = lists.filter((list) => list.length > 0).length;
      const emptyListsCount = lists.length - filledListsCount;

      let overallRiskLevel = 'Low'; // Default risk level
      let riskScore = 0; // Default risk score

      // Logic 1: All No and all lists empty => Critical risk
      if (noCount === yesNoFields.length && emptyListsCount === lists.length) {
        overallRiskLevel = 'Critical';
        riskScore = 100;
      }
      // Logic 2: Less than 50% Yes and less than 50% lists filled => High risk
      else if (
        yesCount < Math.ceil(yesNoFields.length / 2) &&
        filledListsCount < Math.ceil(lists.length / 2)
      ) {
        overallRiskLevel = 'High';
        riskScore = 75;
      }
      // Logic 3: 50% Yes, 50% No, and half lists empty => Medium risk
      else if (
        yesCount === Math.floor(yesNoFields.length / 2) &&
        noCount === Math.floor(yesNoFields.length / 2) &&
        emptyListsCount === Math.floor(lists.length / 2)
      ) {
        overallRiskLevel = 'Medium';
        riskScore = 50;
      }
      // Logic 4: Only one No and at least 80% lists filled => Low risk
      else if (
        noCount === 1 &&
        emptyListsCount <= Math.floor(lists.length * 0.2)
      ) {
        overallRiskLevel = 'Low';
        riskScore = 25;
      }

      return { overallRiskLevel, riskScore };
    };

    const { overallRiskLevel, riskScore } = calculateRisk(req.body);

    // Create a new PreliminaryQuestions document
    const newPreliminaryQuestions = new PreliminaryQuestions({
      processPersonalData,
      internalAudits,
      dpiA,
      isoStatus,

      serviceCountries,
      supportFunctionalities,
      processingApplications, 
      processingPurposes, 
      individualData,


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
      selectedhealthcare,
      selectedProfessionalExperience,
      selectedSocialInformation,
      selectedTravelAndExpense,
      selectedUserAccountInformation,
      selectedWorkplaceWelfare,

      overallRiskLevel,
      riskScore,
    });

    // Save to the database
    const savedData = await newPreliminaryQuestions.save();
    return res.status(201).json({
      message: 'Data submitted successfully',
      data: savedData,
    });
  } catch (err) {
    console.error('Error while saving preliminary questions:', err);
    return res.status(500).json({
      message: 'Failed to submit data',
      error: err.message || 'Unknown error',
    });
  }
};

// Function to fetch risk analysis (unchanged)
export const getRiskAnalysis = async (req, res) => {
  try {
    const data = await PreliminaryQuestions.findOne({}); // Or modify to fetch specific user data
    if (!data) {
      return res.status(404).json({ message: 'No risk analysis data found' });
    }
    return res.status(200).json({
      riskLevel: data.overallRiskLevel,
      riskScore: data.riskScore, // Include riskScore in response
    });
  } catch (err) {
    console.error('Error while fetching risk analysis:', err);
    return res.status(500).json({
      message: 'Failed to fetch risk analysis data',
      error: err.message || 'Unknown error',
    });
  }
};



