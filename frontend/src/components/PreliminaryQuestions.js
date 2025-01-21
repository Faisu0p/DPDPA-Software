import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, Box, TextField, FormControl, 
  InputLabel, Select, MenuItem, FormControlLabel, Checkbox, 
  Button, Autocomplete, Chip, FormGroup } from '@mui/material';

const countries = [
  'United States',
  'India',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'Japan',
  'United Kingdom',
  'Brazil',
  'China',
  // Add more countries as needed
];

const applications = [
  'App1',
  'App2',
  'App3',
  'App4',
  'App5',
  // Add more applications as needed
];

const backgroundChecks = [
  'Criminal History', 
  'Criminal Records', 
  'Driving Citations', 
  'Drug Test Results', 
  'Reference or Background Checks'
];

const biometrics = [
  'Facial Recognition', 
  'Handprint', 
  'Retina Scan', 
  'Fingerprint', 
  'Photograph', 
  'Voice Recognition'
];

const browsingInformation = [
  'Browsing Time', 
  'IP Address', 
  'Website History', 
  'Cookie Information', 
  'Photograph'
];

const contactInformation = [
  'Emergency Contact Details',
  'General Location',
  'Personal Email',
  'Previous Residence Address',
  'GPS Coordinates',
  'Home Address',
  'Phone Numbers'
];

const educationAndSkills = [
  'Academic Transcripts',
  'Education & Training History',
  'Grade',
  'Professional License Number/Information',
  'Certification Information',
  'Educational Degrees',
  'Languages'
];

const employmentInformation = [
  'Benefits and Entitlements Data',
  'Disciplinary Action',
  'Exit Interview and Comments',
  'Health & Safety Related Information and Reporting',
  'Job Application Details',
  'Line Reporting',
  'Office Location',
  'Personnel Number',
  'Psychological or Competency Assessment Data',
  'Record of Absence Time Tracking',
  'Salary/Wage',
  'Start Date',
  'Business Unit/Division',
  'Contract Type',
  'End Date & Reason for Termination',
  'Grievances and Complaints',
  'Internal Investigation Materials',
  'Job Title/Role',
  'MAC Address of Workstation',
  'Performance Rating',
  'Previous Work History',
  'Reasonable Accommodation to Perform Duties Information',
  'Resumes and CVs',
  'Salary/Wage Expectation',
  'Workers Compensation Claims'
];

const familyInformation = [
  'Children\'s Name',
  'Spouse Name',
  'Parent\'s Names'
];

const financialInformation = [
  'Bank Account Information',
  'Beneficiary Information',
  'Compensation Data',
  'Creditworthiness Data',
  'Spending History/Pattern Information',
  'Bank Statements',
  'Bonus Payments',
  'Credit Card Number',
  'Income Information/Bracket',
  'Tax Information'
];

const geneticInformation = [
  'Genetic Sequence',
  'Medical Information'
];

const governmentIdentifiers = [
  'Driving License Number',
  'National Identity Card Details',
  'Visa Information',
  'National Identification Number',
  'Passport Information'
];

const personalIdentification = [
  'Age',
  'Date of Birth',
  'Dietary Restrictions or Allergies',
  'First Name',
  'Gender',
  'Hobbies and Interests',
  'Marital Status',
  'Racial or Ethnic Origin',
  'Sexual Orientation',
  'Weight',
  'Blood Type',
  'Demographic Information',
  'Email Address',
  'Full Name',
  'Height',
  'Last Name',
  'Nationality',
  'Religion/Religious Beliefs',
  'Signature'
];

const professionalExperience = [
  'Professional Memberships',
  'Trade Union Membership',
  'Qualifications/Certifications'
];

const socialInformation = [
  'Email/Support Correspondence',
  'Social Media Contact',
  'Text Messages',
  'Social Media Account',
  'Social Media History'
];

const travelAndExpense = [
  'Expense Details',
  'Travel History',
  'Plane/Hotel/Car Rental Loyalty Information',
  'Travel Booking Details'
];

const userAccountInformation = [
  'Account Age',
  'Account Number',
  'PIN Code',
  'Account Challenge Questions and Answers',
  'Account Password'
];

const workplaceWelfare = [
  'Bullying and Harassment Details',
  'Temperature',
  'Prescribed Medications'
];



const processingPurposes = [
  'Background Checks',
  'Campus Recruiting',
  'Consumer Engagement',
  'Customer Relationship Management',
  'Direct Marketing',
  'Finance',
  'Historical Research',
  'Leads Qualification',
  'New Product Development',
  'Online Recruiting Activities',
  'Public Health and Safety',
  'Travel Planning',
  'Benefits',
  'Compensation',
  'Contractual Obligations',
  'Customer Service',
  'Ecommerce Activities',
  'Health Related Initiatives',
  'Insurance Processing',
  'Market Research',
  'Online Learning Initiatives',
  'Payroll Processing',
  'Retirement Planning',
  'Scientific Research',
  'Other'
];


const PreliminaryQuestions = () => {
  const [processPreservedData, setProcessPreservedData] = useState('');
  const [serviceCountries, setServiceCountries] = useState([]); 
  const [supportFunctionalities, setSupportFunctionalities] = useState('');
  const [processingApplications, setProcessingApplications] = useState([]);
  const [pii, setPii] = useState('');
  const [internalAudits, setInternalAudits] = useState('');
  const [dpiA, setDpiA] = useState('');
  const [isoStatus, setIsoStatus] = useState('');
  const [processPersonalData, setProcessPersonalData] = useState('');
  
  const [selectedBackgroundChecks, setSelectedBackgroundChecks] = useState([]);
  const [selectedBiometrics, setSelectedBiometrics] = useState([]);
  const [selectedBrowsingInformation, setSelectedBrowsingInformation] = useState([]);
  const [selectedContactInformation, setSelectedContactInformation] = useState([]);
  const [selectedEducationAndSkills, setSelectedEducationAndSkills] = useState([]);
  const [selectedEmploymentInformation, setSelectedEmploymentInformation] = useState([]);
  const [selectedFamilyInformation, setSelectedFamilyInformation] = useState([]);
  const [selectedFinancialInformation, setSelectedFinancialInformation] = useState([]);
  const [selectedGeneticInformation, setSelectedGeneticInformation] = useState([]);
  const [selectedGovernmentIdentifiers, setSelectedGovernmentIdentifiers] = useState([]);
  const [selectedPersonalIdentification, setSelectedPersonalIdentification] = useState([]);
  const [selectedProfessionalExperience, setSelectedProfessionalExperience] = useState([]);
  const [selectedSocialInformation, setSelectedSocialInformation] = useState([]);
  const [selectedTravelAndExpense, setSelectedTravelAndExpense] = useState([]);
  const [selectedUserAccountInformation, setSelectedUserAccountInformation] = useState([]);
  const [selectedWorkplaceWelfare, setSelectedWorkplaceWelfare] = useState([]);

  const [selectedPurposes, setSelectedPurposes] = useState([]);
  const [justification, setJustification] = useState('');


  const handleChange = (event, setSelected) => {
    const value = event.target.value;
    setSelected((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((item) => item !== value)
        : [...prevSelected, value]
    );
  };

  const handleSelectAll = (event, category, setSelected) => {
    if (event.target.checked) {
      setSelected(category); 
    } else {
      setSelected([]); 
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    // The data to be submitted is collected from your state variables
    const dataToSubmit = {
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

      processingPurposes:{
        puposes: selectedPurposes,
        justification: justification,
      }
    };

    try {
      // Send POST request to backend
      const response = await axios.post('http://localhost:8021/api/v1/preliminary-questions/submit', dataToSubmit); 

      // Handle successful response
      if (response.status === 201) {
        console.log('Data submitted successfully', response.data);
        // Optionally show a success message or redirect
      } else {
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      // Handle error response
      console.error('Error submitting data', error.response ? error.response.data : error.message);
      console.log('Data to submit:', dataToSubmit);
      // Optionally show an error message to the user
    }
  };

  
  

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, marginTop: 4 }}>
        <Typography variant="h4" component="h1" color="primary" align="center">
          Preliminary Questions
        </Typography>

        <FormControl component="form" onSubmit={handleSubmit}>

            <FormControl fullWidth>
              <InputLabel>Q1. Do you Process Preserved Data?</InputLabel>
              <Select
                value={processPreservedData}
                onChange={(e) => setProcessPreservedData(e.target.value)}
                label="Do you Process Preserved Data?"
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </FormControl>

            <Autocomplete
              multiple
              options={countries}
              getOptionLabel={(option) => option}
              value={serviceCountries}
              onChange={(event, newValue) => setServiceCountries(newValue)}
              renderInput={(params) => <TextField {...params} label="Q2. In which countries do you provide services?" variant="outlined" />}
              fullWidth
            />

            <FormControl fullWidth>
              <InputLabel>Q3. Business and Support Functionality</InputLabel>
              <Select
                value={supportFunctionalities}
                onChange={(e) => setSupportFunctionalities(e.target.value)}
                label="Business and Support Functionalities"
              >
                <MenuItem value="IT Support">IT Support</MenuItem>
                <MenuItem value="Customer Service">Customer Service</MenuItem>
                <MenuItem value="Marketing">Marketing</MenuItem>
                <MenuItem value="HR">HR</MenuItem>
              </Select>
            </FormControl>

            <Autocomplete
              multiple
              options={applications}
              getOptionLabel={(option) => option}
              value={processingApplications}
              onChange={(event, newValue) => setProcessingApplications(newValue)}
              renderInput={(params) => <TextField {...params} label="Q4. Application(s) which process personal data" variant="outlined" />}
              fullWidth
            />

            {processPreservedData === "Yes" && (
              <TextField
                fullWidth
                label="What kind of PII?"
                value={pii}
                onChange={(e) => setPii(e.target.value)}
                variant="outlined"
              />
            )}

            {/* Internal Audits */}
            <FormControl fullWidth>
              <InputLabel>Q5. Do you perform Internal audits?</InputLabel>
              <Select
                value={internalAudits}
                onChange={(e) => setInternalAudits(e.target.value)}
                label="Do you perform Internal audits?"
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </FormControl>

            {/* DPIA */}
            <FormControl fullWidth>
              <InputLabel>Q6. Do you perform DPIA?</InputLabel>
              <Select
                value={dpiA}
                onChange={(e) => setDpiA(e.target.value)}
                label="Do you perform DPIA?"
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </FormControl>

            {/* ISO Status */}
            <FormControl fullWidth>
              <InputLabel>Q7. Is your Ongoing ISO A or B?</InputLabel>
              <Select
                value={isoStatus}
                onChange={(e) => setIsoStatus(e.target.value)}
                label="Is your Ongoing ISO A or B?"
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </FormControl>

            {/* Personal Data Processing */}
            <FormControl fullWidth>
              <InputLabel>Q8. Do you process personal data as part of your processing activity?</InputLabel>
              <Select
                value={processPersonalData}
                onChange={(e) => setProcessPersonalData(e.target.value)}
                label="Do you process personal data as part of your processing activity?"
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </FormControl>

            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Q9. Please select the types of individuals and data elements that are associated with this Business Process whether by collecting, storing, accessing, etc. 
            </Typography>

            {/* Background Checks */}
            <FormControl fullWidth>
              <Typography variant="h6">Background Checks</Typography>
              <FormGroup>
                {/* Select All Checkbox */}
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedBackgroundChecks.length === backgroundChecks.length}
                      onChange={(e) => handleSelectAll(e, backgroundChecks, setSelectedBackgroundChecks)}
                    />
                  }
                  label="Select All"
                />
                
                {/* Individual Background Checks */}
                {backgroundChecks.map((check) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={check}
                        checked={selectedBackgroundChecks.includes(check)}
                        onChange={(e) => handleChange(e, setSelectedBackgroundChecks)}
                      />
                    }
                    label={check}
                    key={check}
                  />
                ))}
              </FormGroup>
            </FormControl>


            {/* Biometrics */}
            <FormControl fullWidth>
              <Typography variant="h6">Biometrics</Typography>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedBiometrics.length === biometrics.length}
                      onChange={(e) => handleSelectAll(e, biometrics, setSelectedBiometrics)}
                    />
                  }
                  label="Select All"
                />
                {biometrics.map((check) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={check}
                        checked={selectedBiometrics.includes(check)}
                        onChange={(e) => handleChange(e, setSelectedBiometrics)}
                      />
                    }
                    label={check}
                    key={check}
                  />
                ))}
              </FormGroup>
            </FormControl>


            {/* Browsing Information */}
            <FormControl fullWidth>
              <Typography variant="h6">Browsing Information</Typography>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedBrowsingInformation.length === browsingInformation.length}
                      onChange={(e) => handleSelectAll(e, browsingInformation, setSelectedBrowsingInformation)}
                    />
                  }
                  label="Select All"
                />
                {browsingInformation.map((check) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={check}
                        checked={selectedBrowsingInformation.includes(check)}
                        onChange={(e) => handleChange(e, setSelectedBrowsingInformation)}
                      />
                    }
                    label={check}
                    key={check}
                  />
                ))}
              </FormGroup>
            </FormControl>


            {/* Contact Information */}
            <FormControl fullWidth>
              <Typography variant="h6">Contact Information</Typography>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedContactInformation.length === contactInformation.length}
                      onChange={(e) => handleSelectAll(e, contactInformation, setSelectedContactInformation)}
                    />
                  }
                  label="Select All"
                />
                {contactInformation.map((check) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={check}
                        checked={selectedContactInformation.includes(check)}
                        onChange={(e) => handleChange(e, setSelectedContactInformation)}
                      />
                    }
                    label={check}
                    key={check}
                  />
                ))}
              </FormGroup>
            </FormControl>


            {/* Education & Skills */}
            <FormControl fullWidth>
              <Typography variant="h6">Education & Skills</Typography>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedEducationAndSkills.length === educationAndSkills.length}
                      onChange={(e) => handleSelectAll(e, educationAndSkills, setSelectedEducationAndSkills)}
                    />
                  }
                  label="Select All"
                />
                {educationAndSkills.map((check) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={check}
                        checked={selectedEducationAndSkills.includes(check)}
                        onChange={(e) => handleChange(e, setSelectedEducationAndSkills)}
                      />
                    }
                    label={check}
                    key={check}
                  />
                ))}
              </FormGroup>
            </FormControl>


            {/* Employment Information */}
            <FormControl fullWidth>
              <Typography variant="h6">Employment Information</Typography>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedEmploymentInformation.length === employmentInformation.length}
                      onChange={(e) => handleSelectAll(e, employmentInformation, setSelectedEmploymentInformation)}
                    />
                  }
                  label="Select All"
                />
                {employmentInformation.map((check) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={check}
                        checked={selectedEmploymentInformation.includes(check)}
                        onChange={(e) => handleChange(e, setSelectedEmploymentInformation)}
                      />
                    }
                    label={check}
                    key={check}
                  />
                ))}
              </FormGroup>
            </FormControl>


            {/* Family Information */}
            <FormControl fullWidth>
              <Typography variant="h6">Family Information</Typography>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedFamilyInformation.length === familyInformation.length}
                      onChange={(e) => handleSelectAll(e, familyInformation, setSelectedFamilyInformation)}
                    />
                  }
                  label="Select All"
                />
                {familyInformation.map((check) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={check}
                        checked={selectedFamilyInformation.includes(check)}
                        onChange={(e) => handleChange(e, setSelectedFamilyInformation)}
                      />
                    }
                    label={check}
                    key={check}
                  />
                ))}
              </FormGroup>
            </FormControl>


            {/* Financial */}
            <FormControl fullWidth>
              <Typography variant="h6">Financial</Typography>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedFinancialInformation.length === financialInformation.length}
                      onChange={(e) => handleSelectAll(e, financialInformation, setSelectedFinancialInformation)}
                    />
                  }
                  label="Select All"
                />
                {financialInformation.map((check) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={check}
                        checked={selectedFinancialInformation.includes(check)}
                        onChange={(e) => handleChange(e, setSelectedFinancialInformation)}
                      />
                    }
                    label={check}
                    key={check}
                  />
                ))}
              </FormGroup>
            </FormControl>


            {/* Genetic Information */}
            <FormControl fullWidth>
              <Typography variant="h6">Genetic Information</Typography>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedGeneticInformation.length === geneticInformation.length}
                      onChange={(e) => handleSelectAll(e, geneticInformation, setSelectedGeneticInformation)}
                    />
                  }
                  label="Select All"
                />
                {geneticInformation.map((check) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={check}
                        checked={selectedGeneticInformation.includes(check)}
                        onChange={(e) => handleChange(e, setSelectedGeneticInformation)}
                      />
                    }
                    label={check}
                    key={check}
                  />
                ))}
              </FormGroup>
            </FormControl>


            {/* Government Identifiers */}
            <FormControl fullWidth>
              <Typography variant="h6">Government Identifiers</Typography>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedGovernmentIdentifiers.length === governmentIdentifiers.length}
                      onChange={(e) => handleSelectAll(e, governmentIdentifiers, setSelectedGovernmentIdentifiers)}
                    />
                  }
                  label="Select All"
                />
                {governmentIdentifiers.map((check) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={check}
                        checked={selectedGovernmentIdentifiers.includes(check)}
                        onChange={(e) => handleChange(e, setSelectedGovernmentIdentifiers)}
                      />
                    }
                    label={check}
                    key={check}
                  />
                ))}
              </FormGroup>
            </FormControl>


            {/* Personal Identification */}
            <FormControl fullWidth>
              <Typography variant="h6">Personal Identification</Typography>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedPersonalIdentification.length === personalIdentification.length}
                      onChange={(e) => handleSelectAll(e, personalIdentification, setSelectedPersonalIdentification)}
                    />
                  }
                  label="Select All"
                />
                {personalIdentification.map((check) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={check}
                        checked={selectedPersonalIdentification.includes(check)}
                        onChange={(e) => handleChange(e, setSelectedPersonalIdentification)}
                      />
                    }
                    label={check}
                    key={check}
                  />
                ))}
              </FormGroup>
            </FormControl>


            {/* Professional Experience */}
            <FormControl fullWidth>
              <Typography variant="h6">Professional Experience</Typography>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedProfessionalExperience.length === professionalExperience.length}
                      onChange={(e) => handleSelectAll(e, professionalExperience, setSelectedProfessionalExperience)}
                    />
                  }
                  label="Select All"
                />
                {professionalExperience.map((check) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={check}
                        checked={selectedProfessionalExperience.includes(check)}
                        onChange={(e) => handleChange(e, setSelectedProfessionalExperience)}
                      />
                    }
                    label={check}
                    key={check}
                  />
                ))}
              </FormGroup>
            </FormControl>


            {/* Social Information */}
            <FormControl fullWidth>
              <Typography variant="h6">Social Information</Typography>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedSocialInformation.length === socialInformation.length}
                      onChange={(e) => handleSelectAll(e, socialInformation, setSelectedSocialInformation)}
                    />
                  }
                  label="Select All"
                />
                {socialInformation.map((check) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={check}
                        checked={selectedSocialInformation.includes(check)}
                        onChange={(e) => handleChange(e, setSelectedSocialInformation)}
                      />
                    }
                    label={check}
                    key={check}
                  />
                ))}
              </FormGroup>
            </FormControl>


            {/* Travel And Expense */}
            <FormControl fullWidth>
              <Typography variant="h6">Travel And Expense</Typography>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedTravelAndExpense.length === travelAndExpense.length}
                      onChange={(e) => handleSelectAll(e, travelAndExpense, setSelectedTravelAndExpense)}
                    />
                  }
                  label="Select All"
                />
                {travelAndExpense.map((check) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={check}
                        checked={selectedTravelAndExpense.includes(check)}
                        onChange={(e) => handleChange(e, setSelectedTravelAndExpense)}
                      />
                    }
                    label={check}
                    key={check}
                  />
                ))}
              </FormGroup>
            </FormControl>


            {/* User Account Information */}
            <FormControl fullWidth>
              <Typography variant="h6">User Account Information</Typography>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedUserAccountInformation.length === userAccountInformation.length}
                      onChange={(e) => handleSelectAll(e, userAccountInformation, setSelectedUserAccountInformation)}
                    />
                  }
                  label="Select All"
                />
                {userAccountInformation.map((check) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={check}
                        checked={selectedUserAccountInformation.includes(check)}
                        onChange={(e) => handleChange(e, setSelectedUserAccountInformation)}
                      />
                    }
                    label={check}
                    key={check}
                  />
                ))}
              </FormGroup>
            </FormControl>


            {/* Workplace Welfare */}
            <FormControl fullWidth>
              <Typography variant="h6">Workplace Welfare</Typography>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedWorkplaceWelfare.length === workplaceWelfare.length}
                      onChange={(e) => handleSelectAll(e, workplaceWelfare, setSelectedWorkplaceWelfare)}
                    />
                  }
                  label="Select All"
                />
                {workplaceWelfare.map((check) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={check}
                        checked={selectedWorkplaceWelfare.includes(check)}
                        onChange={(e) => handleChange(e, setSelectedWorkplaceWelfare)}
                      />
                    }
                    label={check}
                    key={check}
                  />
                ))}
              </FormGroup>
            </FormControl>


            {/* Purposes of Processing */}
            <FormControl fullWidth>
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Q10. What are the Purposes of Processing? <br /> Select all that apply:
              </Typography>
              <FormGroup>
                {/* Select All Checkbox */}
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedPurposes.length === processingPurposes.length} // Check if all items are selected
                      onChange={(e) => handleSelectAll(e, processingPurposes, setSelectedPurposes)} // Pass correct setSelected
                    />
                  }
                  label="Select All"
                />

                {/* Individual Purpose Checkboxes */}
                {processingPurposes.map((purpose) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={purpose}
                        checked={selectedPurposes.includes(purpose)} // Check if this purpose is selected
                        onChange={(e) => handleChange(e, setSelectedPurposes)} // Handle individual change
                      />
                    }
                    label={purpose}
                    key={purpose}
                  />
                ))}
              </FormGroup>
            </FormControl>


            {/* Justification Text Area */}
            <TextField
              fullWidth
              label="Justify Your Answer below:"
              value={justification}
              onChange={(e) => setJustification(e.target.value)}
              variant="outlined"
              multiline
              rows={4}
            />


            <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
              Submit
            </Button>

        </FormControl>
      </Box>
    </Container>
  );
};

export default PreliminaryQuestions;
