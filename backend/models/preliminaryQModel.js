import mongoose from 'mongoose';

const preliminaryQuestionsSchema = new mongoose.Schema({
  processPersonalData: {
    type: String,
    required: true,
    riskLevel: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium',  
    },
  },
  individualData: [{
    type: String,
    required: true,
    riskLevel: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium',
  },}],
  serviceCountries: [{
    type: String,
    required: true,
  }],
  supportFunctionalities: {
    functionalities: [{
      type: String,
      required: true,
    }],
    otherFunctionality: [{
      type: String,
    }],
  },
  processingApplications: {
    applications: [{
      type: String,
      required: true,
    }],
    otherApplication: [{
      type: String,
    }],
  },

  internalAudits: {
    type: String,
    required: true,
    riskLevel: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium',
  },},
  dpiA: {
    type: String,
    required: true,
    riskLevel: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium',
  },},
  isoStatus: {
    type: String,
    required: true,
    riskLevel: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
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
  selectedhealthcare: [{
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
  overallRiskLevel: { // Added field to store overall risk
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Low',
  },

}, { timestamps: true });

const PreliminaryQuestions = mongoose.model('PreliminaryQuestions', preliminaryQuestionsSchema);

export default PreliminaryQuestions;
