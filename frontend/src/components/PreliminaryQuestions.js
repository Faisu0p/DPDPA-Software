import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const PreliminaryQuestions = () => {
  return (
    <Container maxWidth="sm">
      <Box 
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Typography variant="h4" component="h1" color="primary">
          This is the Preliminary Questions Page
        </Typography>
      </Box>
    </Container>
  );
};

export default PreliminaryQuestions;




