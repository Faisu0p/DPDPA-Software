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

    // Define highlights and recommendations based on risk level
    const riskHighlights = {
      Low: [
        "Most required fields are completed.",
        "No significant risk indicators detected.",
        "Compliance measures are in place but may need minor improvements."
      ],
      Medium: [
        "Some fields are incomplete or contain insufficient data.",
        "Potential risks identified in specific areas.",
        "Compliance measures are present but require enhancement."
      ],
      High: [
        "Several critical data fields are missing or incomplete.",
        "High-risk indicators detected in multiple areas.",
        "Gaps in compliance and security protocols."
      ],
      Critical: [
        "Major security and compliance gaps identified.",
        "Significant data exposure risks present.",
        "High probability of regulatory non-compliance or data breaches."
      ]
    };

    const riskRecommendations = {
      Low: [
        "Regularly review and update data records.",
        "Conduct periodic internal audits to maintain compliance.",
        "Ensure continuous monitoring to prevent emerging risks."
      ],
      Medium: [
        "Address missing or incomplete data fields.",
        "Strengthen internal controls and risk assessments.",
        "Implement additional security measures for medium-risk areas."
      ],
      High: [
        "Perform a Data Protection Impact Assessment (DPIA).",
        "Increase the frequency of internal audits and monitoring.",
        "Implement stronger security controls for high-risk areas.",
        "Ensure compliance with regulatory requirements."
      ],
      Critical: [
        "Immediate remediation of critical vulnerabilities.",
        "Conduct a full-scale security audit and compliance review.",
        "Strengthen data protection measures and enforce strict access controls.",
        "Implement risk mitigation strategies and ensure urgent corrective actions."
      ]
    };

    // Prepare detailed response for the dashboard
    const response = {
      riskLevel: data.overallRiskLevel,
      riskScore: data.riskScore, // Default score if not calculated
      timestamp: data.createdAt || new Date(),
      highlights: riskHighlights[data.overallRiskLevel] || [],
      recommendations: riskRecommendations[data.overallRiskLevel] || [],
      inputs: [
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




