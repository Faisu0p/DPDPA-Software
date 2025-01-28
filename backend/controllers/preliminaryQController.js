import PreliminaryQuestions from '../models/preliminaryQModel.js';
import { v4 as uuidv4 } from 'uuid'; // Importing uuid to generate unique reportId

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


    // Generate a unique report ID
    const reportId = uuidv4();

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

      reportId,
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



// Function to fetch risk analysis
export const getRiskAnalysis = async (req, res) => {
  try {
    const data = await PreliminaryQuestions.findOne({}); // Adjust query as needed for user-specific data

    if (!data) {
      return res.status(404).json({ message: 'No risk analysis data found' });
    }

    // Prepare detailed response for the dashboard
    const response = {
      riskLevel: data.overallRiskLevel,
      riskScore: data.riskScore || 75, // Default score if not calculated
      timestamp: data.createdAt || new Date(),
      highlights: [
        "Critical fields are empty.",
        "Less than 50% of lists have data.",
        "High potential risk in certain areas.",
      ],
      recommendations: [
        "Conduct DPIA for missing critical fields.",
        "Increase audits to ensure compliance.",
        "Populate missing fields in data lists.",
      ],
      inputs: [
        {
          name: "Support Functionalities",
          value: data.supportFunctionalities.functionalities.length > 0
            ? data.supportFunctionalities.functionalities.join(', ')
            : "None",
        },
        {
          name: "Process Personal Data",
          value: data.processPersonalData,
          riskStatus: data.processPersonalData === 'Yes' ? 'Low' : 'High',
        },
        {
          name: "Internal Audits",
          value: data.internalAudits,
          riskStatus: data.internalAudits === 'Yes' ? 'Low' : 'High',
        },
        {
          name: "DPIA",
          value: data.dpiA,
          riskStatus: data.dpiA === 'Yes' ? 'Low' : 'Medium',
        },
        {
          name: "ISO Status",
          value: data.isoStatus,
          riskStatus: data.isoStatus === 'Yes' ? 'Low' : 'Medium',
        },
        
        ...[
          {
            list: data.selectedBackgroundChecks,
            label: "Background Checks",
          },
          {
            list: data.selectedBiometrics,
            label: "Biometrics",
          },
          {
            list: data.selectedBrowsingInformation,
            label: "Browsing Information",
          },
          {
            list: data.selectedGovernmentIdentifiers,
            label: "Government Identifiers",
          },
          {
            list: data.selectedGeneticInformation,
            label: "Genetic Information",
          },
          {
            list: data.selectedProfessionalExperience,
            label: "Professional Experience",
          },
          {
            list: data.selectedSocialInformation,
            label: "Social Information",
          },
          {
            list: data.selectedhealthcare,
            label: "Healthcare",
          },
        ].map(({ list, label }) => ({
          name: label,
          value: list.length > 0 ? `${list.length} items` : "Empty",
          riskStatus: list.length > 0 ? "Low" : "High",
        })),
      ],
    };

    return res.status(200).json(response);
  } catch (err) {
    console.error('Error while fetching risk analysis:', err);
    return res.status(500).json({
      message: 'Failed to fetch risk analysis data',
      error: err.message || 'Unknown error',
    });
  }
};




