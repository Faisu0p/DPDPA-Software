import mongoose from 'mongoose';

const preliminaryQuestionsSchema = new mongoose.Schema({


  //Yes/No questions
  processPersonalData: {
    type: String,
    required: true,
    enum: ['Yes', 'No'],
  },
  internalAudits: {
    type: String,
    required: true,
    enum: ['Yes', 'No'],
  },
  dpiA: {
    type: String,
    required: true,
    enum: ['Yes', 'No'],
  },
  isoStatus: {
    type: String,
    required: true,
    enum: ['Yes', 'No'],
  },

  //Others
  individualData: [{
    type: String,
    required: true,
}],
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
  processingPurposes: {
    purposes: [{
      type: String,
    }],
    justification: {
      type: String,
      default: '', 
    },
  },


  //Lists
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


  //Risk fields
  overallRiskLevel: { 
    type: String,
    enum: ['Low', 'Medium', 'High', 'Critical'],
    default: 'Low',
  },
  riskScore: { 
    type: Number,
    default: 0,
  },

}, { timestamps: true });

const PreliminaryQuestions = mongoose.model('PreliminaryQuestions', preliminaryQuestionsSchema);

export default PreliminaryQuestions;
