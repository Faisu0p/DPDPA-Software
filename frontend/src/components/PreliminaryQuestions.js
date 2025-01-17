import React, { useState } from 'react';
import { Container, Typography, Box, TextField, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Checkbox, Button, Autocomplete, Chip } from '@mui/material';

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

const PreliminaryQuestions = () => {
  const [processPreservedData, setProcessPreservedData] = useState('');
  const [serviceCountries, setServiceCountries] = useState([]); // Renamed to hold multiple countries
  const [supportFunctionalities, setSupportFunctionalities] = useState('');
  const [processingApplications, setProcessingApplications] = useState([]); // Renamed to hold multiple applications
  const [pii, setPii] = useState('');
  const [internalAudits, setInternalAudits] = useState('');
  const [dpiA, setDpiA] = useState('');
  const [isoStatus, setIsoStatus] = useState('');

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, marginTop: 4 }}>
        <Typography variant="h4" component="h1" color="primary" align="center">
          Preliminary Questions
        </Typography>

        <FormControl fullWidth>
          <InputLabel>Do you Process Preserved Data?</InputLabel>
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
          renderInput={(params) => <TextField {...params} label="In which countries do you provide services?" variant="outlined" />}
          fullWidth
        />

        <FormControl fullWidth>
          <InputLabel>Business and Support Functionality</InputLabel>
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
          renderInput={(params) => <TextField {...params} label="Application(s) which process personal data" variant="outlined" />}
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

        {/* Changed to Select with Yes/No options */}
        <FormControl fullWidth>
          <InputLabel>Do you perform Internal audits?</InputLabel>
          <Select
            value={internalAudits}
            onChange={(e) => setInternalAudits(e.target.value)}
            label="Do you perform Internal audits?"
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Do you perform DPIA?</InputLabel>
          <Select
            value={dpiA}
            onChange={(e) => setDpiA(e.target.value)}
            label="Do you perform DPIA?"
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Is your Ongoing ISO A or B?</InputLabel>
          <Select
            value={isoStatus}
            onChange={(e) => setIsoStatus(e.target.value)}
            label="Is your Ongoing ISO A or B?"
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
        </FormControl>

        <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default PreliminaryQuestions;
