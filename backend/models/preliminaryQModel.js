import mongoose from 'mongoose';

const preliminaryQuestionsSchema = new mongoose.Schema({
  processPreservedData: {
    type: String,
    required: true,
  },
  serviceCountries: [{
    type: String,
    required: true,  // Optional: Remove if empty array is allowed
  }],
  supportFunctionalities: {
    type: String,
    required: true,
  },
  processingApplications: [{
    type: String,
    required: true,  // Optional: Remove if empty array is allowed
  }],
  pii: {
    type: String,
    default: '', // Optional: Can be left blank
  },
  internalAudits: {
    type: String,
    required: true,
  },
  dpiA: {
    type: String,
    required: true,
  },
  isoStatus: {
    type: String,
    required: true,
  },
  processPersonalData: {
    type: String,
    required: true,
  },
  selectedBackgroundChecks: [{
    type: String,
    required: true,  // Optional: Remove if empty array is allowed
  }],
  selectedBiometrics: [{
    type: String,
    required: true,  // Optional: Remove if empty array is allowed
  }],
  selectedBrowsingInformation: [{
    type: String,
    required: true,  // Optional: Remove if empty array is allowed
  }],
  selectedContactInformation: [{
    type: String,
    required: true,  // Optional: Remove if empty array is allowed
  }],
  selectedEducationAndSkills: [{
    type: String,
    required: true,  // Optional: Remove if empty array is allowed
  }],
  selectedEmploymentInformation: [{
    type: String,
    required: true,  // Optional: Remove if empty array is allowed
  }],
  selectedFamilyInformation: [{
    type: String,
    required: true,  // Optional: Remove if empty array is allowed
  }],
  selectedFinancialInformation: [{
    type: String,
    required: true,  // Optional: Remove if empty array is allowed
  }],
  selectedGeneticInformation: [{
    type: String,
    required: true,  // Optional: Remove if empty array is allowed
  }],
  selectedGovernmentIdentifiers: [{
    type: String,
    required: true,  // Optional: Remove if empty array is allowed
  }],
  selectedPersonalIdentification: [{
    type: String,
    required: true,  // Optional: Remove if empty array is allowed
  }],
  selectedProfessionalExperience: [{
    type: String,
    required: true,  // Optional: Remove if empty array is allowed
  }],
  selectedSocialInformation: [{
    type: String,
    required: true,  // Optional: Remove if empty array is allowed
  }],
  selectedTravelAndExpense: [{
    type: String,
    required: true,  // Optional: Remove if empty array is allowed
  }],
  selectedUserAccountInformation: [{
    type: String,
    required: true,  // Optional: Remove if empty array is allowed
  }],
  selectedWorkplaceWelfare: [{
    type: String,
    required: true,  // Optional: Remove if empty array is allowed
  }],
  selectedPurposes: [{
    type: String,
    required: true,  // Optional: Remove if empty array is allowed
  }],
  justification: {
    type: String,
    default: '', // Optional: Make it default to an empty string if no justification is provided
  },
}, { timestamps: true });

const PreliminaryQuestions = mongoose.model('PreliminaryQuestions', preliminaryQuestionsSchema);

export default PreliminaryQuestions;
