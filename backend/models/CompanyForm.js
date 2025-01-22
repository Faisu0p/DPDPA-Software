import mongoose from 'mongoose';

const companyFormSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  phoneNumber: {
    type: String,
    required: true,
    match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number.']
  },
  companyDetails: {
    organizationName: {
      type: String,
      required: true
    },
    industryType: {
      type: String,
      enum: [
        'Consulting', 
        'Finance', 
        'Banking', 
        'Ecommerce', 
        'Cloud Service Provider', 
        'Gaming', 
        'IT/ITeS', 
        'Healthcare', 
        'Insurance', 
        'Education', 
        'Analytics', 
        'OEMs', 
        'Defense', 
        'Health Service Provider', 
        'AI', 
        'Tech', 
        'Others'
      ],
      required: true
    },
    
    customIndustryType: {
      type: String,
      required: function() { return this.companyDetails.industryType === 'Others'; }
    },
    numberOfEmployees: {
      type: String,
      enum: ['10-50', '50-100', '100-500', '1000-5000', '5000+'],
      required: true
    },
    stakeholdersName: { // Added field
      type: String,
      required: true
    }
  },
  otp: {
    type: String,
    default: '9999'
  }
}, {
  timestamps: true
});

export const CompanyForm = mongoose.model('CompanyForm', companyFormSchema);
