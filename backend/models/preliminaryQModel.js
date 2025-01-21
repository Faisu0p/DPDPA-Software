import mongoose from 'mongoose';

const preliminaryQuestionsSchema = new mongoose.Schema({
  processPreservedData: {
    type: String,
    required: true,
    riskLevel: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Critical'],
      default: 'Medium',  
    },
  },
  serviceCountries: [{
    type: String,
    required: true,
  }],
  supportFunctionalities: {
    type: String,
    required: true,
    riskLevel: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Critical'],
      default: 'Medium',
      },
  },
  processingApplications: [{
    type: String,
    required: true,
    riskLevel: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Critical'],
      default: 'Medium',
  },}],
  pii: {
    type: String,
    default: '',
  },
  internalAudits: {
    type: String,
    required: true,
    riskLevel: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Critical'],
      default: 'Medium',
  },},
  dpiA: {
    type: String,
    required: true,
    riskLevel: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Critical'],
      default: 'Medium',
  },},
  isoStatus: {
    type: String,
    required: true,
    riskLevel: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Critical'],
      default: 'Medium',
  },},
  processPersonalData: {
    type: String,
    required: true,
    riskLevel: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Critical'],
      default: 'Medium',
  },},
  selectedBackgroundChecks: [{
    type: String,
  }],
  selectedBiometrics: [{
    type: String,
  }],
  selectedBrowsingInformation: [{
    type: String,
  }],
  selectedContactInformation: [{
    type: String,
  }],
  selectedEducationAndSkills: [{
    type: String,
  }],
  selectedEmploymentInformation: [{
    type: String,
  }],
  selectedFamilyInformation: [{
    type: String,
  }],
  selectedFinancialInformation: [{
    type: String,
  }],
  selectedGeneticInformation: [{
    type: String,
  }],
  selectedGovernmentIdentifiers: [{
    type: String,
  }],
  selectedPersonalIdentification: [{
    type: String,
  }],
  selectedProfessionalExperience: [{
    type: String,
  }],
  selectedSocialInformation: [{
    type: String,
  }],
  selectedTravelAndExpense: [{
    type: String,
  }],
  selectedUserAccountInformation: [{
    type: String,
  }],
  selectedWorkplaceWelfare: [{
    type: String,
  }],
  processingPurposes: {
    purposes: [{
      type: String,
    }],
    justification: {
      type: String,
      default: '', 
    },
  },
}, { timestamps: true });

const PreliminaryQuestions = mongoose.model('PreliminaryQuestions', preliminaryQuestionsSchema);

export default PreliminaryQuestions;
