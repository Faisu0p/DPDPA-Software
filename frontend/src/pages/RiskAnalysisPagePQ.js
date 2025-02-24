// src/pages/RiskAnalysis.js

import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';
import RiskAnalysisPQ2 from '../components/RiskAnalysisPQ2';
import RiskAnalysisPQ from '../components/RiskAnalysisPQ';

const RiskAnalysisPagePQ = () => {
  return (
    <Container>
      <Typography variant='h4' gutterBottom>
        
      </Typography>
      <Paper sx={{ padding: 2 }}>
        <Box>
            <RiskAnalysisPQ />
        </Box>
      </Paper>
    </Container>
  );
};

export default RiskAnalysisPagePQ;
