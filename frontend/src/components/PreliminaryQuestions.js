import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, Box, TextField, FormControl, 
  InputLabel, Select, MenuItem, FormControlLabel, Checkbox, 
  Button, Autocomplete, Chip, FormGroup, Grid } from '@mui/material';
import { indigo } from '@mui/material/colors';

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
];

const applications = [
  'OneDrive',
  'Sharepoint',
  'Oracle',
  'HR Databases',
  'Others',
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
  'First Name',
  'Hobbies and Interests',
  'Marital Status',
  'Sexual Orientation',
  'Demographic Information',
  'Email Address',
  'Full Name',
  'Last Name',
  'Nationality',
  'Religion/Religious Beliefs',
  'Signature'
];


const healthcare = [
  'Age',
  'Date of Birth',
  'Dietary Restrictions or Allergies',
  'Gender',
  'Weight',
  'Blood Type',
  'Height',
  'Racial or Ethnic Origin'
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

  {/* Q1 */}
  const [processPersonalData, setprocessPersonalData] = useState('');

  {/* Q1.1 */}
  const [individualData, setindividualData] = useState([]);

  {/* Q2 */}
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
  const [selectedhealthcare, setSelectedHealthcare] = useState([]);
  const [selectedProfessionalExperience, setSelectedProfessionalExperience] = useState([]);
  const [selectedSocialInformation, setSelectedSocialInformation] = useState([]);
  const [selectedTravelAndExpense, setSelectedTravelAndExpense] = useState([]);
  const [selectedUserAccountInformation, setSelectedUserAccountInformation] = useState([]);
  const [selectedWorkplaceWelfare, setSelectedWorkplaceWelfare] = useState([]);

  
  {/* Q3 */}  
  const [serviceCountries, setServiceCountries] = useState([]); 

  {/* Q4 */}
  const [supportFunctionalities, setSupportFunctionalities] = useState([]);
  const [otherSupportFunctionality, setOtherSupportFunctionality] = useState('');

  {/* Q5 */}
  const [processingApplications, setProcessingApplications] = useState([]);
  const [otherApplications, setOtherApplications] = useState('');

  {/* Q6 */}
  const [internalAudits, setInternalAudits] = useState('');

  {/* Q7 */}  
  const [dpiA, setDpiA] = useState('');

  {/* Q8 */}
  const [isoStatus, setIsoStatus] = useState('');

  {/* Q9 */}
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

  
  // Q4
  const handleSupportFunctionalitiesChange = (event) => {
    setSupportFunctionalities(event.target.value);
  };
  const handleOtherSupportFunctionalityChange = (e) => {
    setOtherSupportFunctionality(e.target.value);
  };

  // Q5
  const handleApplicationsChange = (event, newValue) => {
    setProcessingApplications(newValue);
  };

  const handleOtherApplicationsChange = (e) => {
    setOtherApplications(e.target.value);
  };
  


  const handleSubmit = async (event) => {
    event.preventDefault();

    const dataToSubmit = {
      processPersonalData,
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

      serviceCountries,

      supportFunctionalities: {
        functionalities: supportFunctionalities,
        otherFunctionality: otherSupportFunctionality.split(',').map(item => item.trim())  // Split "Others" into an array
      },

      processingApplications: {
        applications: processingApplications,
        otherApplications: otherApplications.split(',').map(item => item.trim()),
      },

      internalAudits,

      dpiA,

      isoStatus,

      processingPurposes:{
        purposes: selectedPurposes,
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



            {/* Q1 and Q1.1*/}

            <FormControl fullWidth>
              <InputLabel>Q1. Do you process personal data as part of your processing activity?</InputLabel>
              <Select
                value={processPersonalData}
                onChange={(e) => setprocessPersonalData(e.target.value)}
                label="Do you Process Preserved Data?"
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </FormControl>

            
            {processPersonalData === 'Yes' && (
              <FormControl fullWidth sx={{ maxWidth: '100%' }}>
                <Typography>Q 1.1 Please select the types of individuals for whom you are processing personal data?</Typography>
                <InputLabel sx={{ whiteSpace: 'normal', maxWidth: '100%' }}>
                  
                </InputLabel>
                <Select
                  multiple
                  value={individualData}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.includes("Not Applicable")) {
                      setindividualData(["Not Applicable"]);
                    } else {
                      setindividualData(value.filter((item) => item !== "Not Applicable")); 
                    }
                  }}
                  
                  label="Please select the types of individuals for whom you are processing personal data?"
                  sx={{ width: '100%' }} 
                >
                  <MenuItem value="Board Members">Board Members</MenuItem>
                  <MenuItem value="Former Employees/Retirees">Former Employees/Retirees</MenuItem>
                  <MenuItem value="Contractor Employees">Contractor Employees</MenuItem>
                  <MenuItem value="Customers">Customers</MenuItem>
                  <MenuItem value="Prospective Employees">Prospective Employees</MenuItem>
                  <MenuItem value="Employees">Employees</MenuItem>
                  <MenuItem value="Suppliers/Third Parties">Suppliers/Third Parties</MenuItem>
                  <MenuItem value="Not Applicable">Not Applicable</MenuItem>
                </Select>
              </FormControl>
            )}




            {/* Q2 */}

            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Q2. Please select the data elements that are associated with this Business Process.
            </Typography>



            <Grid container spacing={2}>
              {/* Background Checks Section */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Typography variant="h6">Background Checks</Typography>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedBackgroundChecks.length === backgroundChecks.length}
                          onChange={(e) => handleSelectAll(e, backgroundChecks, setSelectedBackgroundChecks)}
                        />
                      }
                      label="Select All"
                    />
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
              </Grid>

              {/* Biometrics Section */}
              <Grid item xs={12} sm={6}>
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
              </Grid>
            </Grid>



            <Grid container spacing={2}>
              {/* Browsing Information Section */}
              <Grid item xs={12} sm={6}>
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
              </Grid>

              {/* Contact Information Section */}
              <Grid item xs={12} sm={6}>
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
              </Grid>
            </Grid>



              
              {/* Employment Information Section */}
              <FormControl fullWidth>
                <Typography variant="h6">Employment Information</Typography>
                <FormGroup sx={{ marginTop: 2, marginBottom: 2 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedEmploymentInformation.length === employmentInformation.length}
                        onChange={(e) => handleSelectAll(e, employmentInformation, setSelectedEmploymentInformation)}
                      />
                    }
                    label="Select All"
                  />
                  <Grid container spacing={2}>
                    {employmentInformation.map((check) => (
                      <Grid item xs={6} key={check}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              value={check}
                              checked={selectedEmploymentInformation.includes(check)}
                              onChange={(e) => handleChange(e, setSelectedEmploymentInformation)}
                            />
                          }
                          label={check}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </FormGroup>
              </FormControl>



               
              


              <Grid container spacing={2}>
                {/* Education & Skills Section */}
                <Grid item xs={12} sm={6}>
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
                </Grid>

                {/* Government Identifiers Section */}
                <Grid item xs={12} sm={6}>
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
                </Grid>
              </Grid>



            <Grid container spacing={2}>
              {/* Family Information Section */}
              <Grid item xs={12} sm={6}>
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
              </Grid>

              {/* Genetic Information Section */}
              <Grid item xs={12} sm={6}>
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
              </Grid>
            </Grid>





          <Grid container spacing={2}>
            {/* Professional Experience Section */}
            <Grid item xs={12} sm={6}>
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
            </Grid>

            {/* Social Information Section */}
            <Grid item xs={12} sm={6}>
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
            </Grid>
          </Grid>



          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
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

              </Grid>


              <Grid item xs={12} sm={6}>
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
              </Grid>
            </Grid>


          {/* Travel and Func */}
            
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
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

              </Grid>


              <Grid item xs={12} sm={6}>
              {/* User Account Information  */}
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
              </Grid>
            </Grid>

          <Grid container spacing={2}> 
            {/* Financial Section */}
              <Grid item xs={12} sm={6}>
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
              </Grid>

            {/* Healthcare */}
            <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Typography variant="h6">Healthcare</Typography>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedhealthcare.length === healthcare.length}
                      onChange={(e) => handleSelectAll(e, healthcare, setSelectedHealthcare)}
                    />
                  }
                  label="Select All"
                />
                {healthcare.map((check) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={check}
                        checked={selectedhealthcare.includes(check)}
                        onChange={(e) => handleChange(e, setSelectedHealthcare)}
                      />
                    }
                    label={check}
                    key={check}
                  />
                ))}
              </FormGroup>
            </FormControl>
            </Grid>
          </Grid>




            {/* Q3 */}


            <Autocomplete
              multiple
              options={countries}
              getOptionLabel={(option) => option}
              value={serviceCountries}
              onChange={(event, newValue) => setServiceCountries(newValue)}
              renderInput={(params) => <TextField {...params} label="Q3. In which countries do you provide services?" variant="outlined" />}
              fullWidth
            />


            {/* Q4 */}

            <FormControl fullWidth>
              <InputLabel>Q4. Business and Support Functionality</InputLabel>
              <Select
                multiple
                value={supportFunctionalities}
                onChange={handleSupportFunctionalitiesChange}
                label="Business and Support Functionalities"
                renderValue={(selected) => selected.join(', ')} // Display selected items as a comma-separated string
              >
                <MenuItem value="Design">Design</MenuItem>
                <MenuItem value="Marketing">Marketing</MenuItem>
                <MenuItem value="Product">Product</MenuItem>
                <MenuItem value="Product Communications">Product Communications</MenuItem>
                <MenuItem value="Product Marketing">Product Marketing</MenuItem>
                <MenuItem value="Product Operations">Product Operations</MenuItem>
                <MenuItem value="SportsOps">SportsOps</MenuItem>
                <MenuItem value="Technology">Technology</MenuItem>
                <MenuItem value="Sales">Sales</MenuItem>
                <MenuItem value="Ad Sales">Ad Sales</MenuItem>
                <MenuItem value="Alliances and Partnerships">Alliances and Partnerships</MenuItem>
                <MenuItem value="Data">Data</MenuItem>
                <MenuItem value="HR">HR</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Others">Others</MenuItem>
              </Select>

              {supportFunctionalities.includes("Others") && (
                <TextField
                  label="Specify Other Functionalities"
                  variant="outlined"
                  fullWidth
                  value={otherSupportFunctionality}
                  onChange={handleOtherSupportFunctionalityChange}
                  placeholder="Item1, Item2, ..."
                  margin="normal"
                />
              )}
            </FormControl>




{/* Q5 */}
<FormControl fullWidth>
        <Autocomplete
          multiple
          options={applications}
          getOptionLabel={(option) => option}
          value={processingApplications}
          onChange={handleApplicationsChange}
          renderInput={(params) => <TextField {...params} label="Q5. Application(s) which process personal data" variant="outlined" />}
          fullWidth
        />

        {processingApplications.includes("Others") && (
          <TextField
            label="Specify Other Applications"
            variant="outlined"
            fullWidth
            value={otherApplications}
            onChange={handleOtherApplicationsChange}
            placeholder="Item1, Item2, ..."
            margin="normal"
          />
        )}
      </FormControl>




            {/* Q6 */}

            <FormControl fullWidth>
              <InputLabel>Q6. Do you perform Internal audits?</InputLabel>
              <Select
                value={internalAudits}
                onChange={(e) => setInternalAudits(e.target.value)}
                label="Do you perform Internal audits?"
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </FormControl>


            {/* Q7 */}

            <FormControl fullWidth>
              <InputLabel>Q7. Do you perform DPIA?</InputLabel>
              <Select
                value={dpiA}
                onChange={(e) => setDpiA(e.target.value)}
                label="Do you perform DPIA?"
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </FormControl>


            {/* Q8 */}

            <FormControl fullWidth>
              <InputLabel>Q8. Is your Organisation ISO 27001 or ISO 27701 Certified ?</InputLabel>
              <Select
                value={isoStatus}
                onChange={(e) => setIsoStatus(e.target.value)}
                label="Is your Organisation ISO 27001 or ISO 27701 Certified ?"
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </FormControl>



            {/* Q9 */}

            <FormControl fullWidth>
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Q9. What are the Purposes of Processing? <br /> Select all that apply:
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

                {/* Grid to Split the Items into Two Columns */}
                <Grid container spacing={2}>
                  {processingPurposes.map((purpose, index) => (
                    <Grid item xs={12} sm={6} key={purpose}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            value={purpose}
                            checked={selectedPurposes.includes(purpose)} // Check if this purpose is selected
                            onChange={(e) => handleChange(e, setSelectedPurposes)} // Handle individual change
                          />
                        }
                        label={purpose}
                      />
                    </Grid>
                  ))}
                </Grid>
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
