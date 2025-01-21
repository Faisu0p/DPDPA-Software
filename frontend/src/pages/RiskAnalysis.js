// src/pages/RiskAnalysis.js

import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';
import RiskDashboard from '../components/RiskDashboard';
import RiskAnalysisPQ from '../components/RiskAnalysisPQ';

const RiskAnalysis = () => {
  return (
    <Container>
      <Typography variant='h4' gutterBottom>
        Risk Analysis
      </Typography>
      <Paper sx={{ padding: 2 }}>
        <Box>
          <RiskDashboard />
          <RiskAnalysisPQ />
        </Box>
      </Paper>
    </Container>
  );
};

export default RiskAnalysis;
