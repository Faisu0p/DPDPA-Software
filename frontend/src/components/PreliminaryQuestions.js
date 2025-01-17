import React, { useState } from 'react';
import { Container, Typography, Box, FormControl, InputLabel, Select, MenuItem, TextField, FormControlLabel, Checkbox, Button } from '@mui/material';

const PreliminaryQuestions = () => {
  const [processPreservedData, setProcessPreservedData] = useState('');
  const [serviceBoundaries, setServiceBoundaries] = useState('');
  const [supportFunctionalities, setSupportFunctionalities] = useState('');
  const [processingApplications, setProcessingApplications] = useState('');
  const [pii, setPii] = useState('');
  const [internalAudits, setInternalAudits] = useState(false);
  const [dpiA, setDpiA] = useState(false);
  const [isoStatus, setIsoStatus] = useState(false);

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

        <FormControl fullWidth>
          <InputLabel>In which boundaries do you provide services?</InputLabel>
          <Select
            value={serviceBoundaries}
            onChange={(e) => setServiceBoundaries(e.target.value)}
            label="In which boundaries do you provide services?"
          >
            <MenuItem value="Global">Global</MenuItem>
            <MenuItem value="Local">Local</MenuItem>
            <MenuItem value="Regional">Regional</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Business and Support Functionalities</InputLabel>
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

        <FormControl fullWidth>
          <InputLabel>Application(s) which process personal data</InputLabel>
          <Select
            value={processingApplications}
            onChange={(e) => setProcessingApplications(e.target.value)}
            label="Application(s) which process personal data"
          >
            <MenuItem value="App1">App1</MenuItem>
            <MenuItem value="App2">App2</MenuItem>
            <MenuItem value="App3">App3</MenuItem>
          </Select>
        </FormControl>

        {processPreservedData === "Yes" && (
          <TextField
            fullWidth
            label="What kind of PII?"
            value={pii}
            onChange={(e) => setPii(e.target.value)}
            variant="outlined"
          />
        )}

        <FormControlLabel
          control={
            <Checkbox
              checked={internalAudits}
              onChange={(e) => setInternalAudits(e.target.checked)}
              color="primary"
            />
          }
          label="Do you perform Internal audits?"
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={dpiA}
              onChange={(e) => setDpiA(e.target.checked)}
              color="primary"
            />
          }
          label="Do you perform DPIA?"
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={isoStatus}
              onChange={(e) => setIsoStatus(e.target.checked)}
              color="primary"
            />
          }
          label="Is your Ongoing ISO A or B?"
        />

        <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default PreliminaryQuestions;
