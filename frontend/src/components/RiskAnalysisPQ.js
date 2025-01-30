import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import {
  Container,
  Typography,
  Paper,
  Box,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Button,
} from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { CheckCircle, Warning, Error } from '@mui/icons-material'; // Icons for risk levels
import PDFTemplate from './pdfPages/PDFTemplatePage';

import Page1 from './pdfPages/Page1';
import Page2 from './pdfPages/Page2';
import Page3 from './pdfPages/Page3';
import Page4 from './pdfPages/Page4';
import Page5 from './pdfPages/Page5';

const RiskAnalysisPQ = () => {
  const [riskLevel, setRiskLevel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hiddenTemplateRef = useRef(); // Reference for the component to be captured

  // Fetch risk analysis data from backend
  useEffect(() => {
    const fetchRiskAnalysis = async () => {
      try {
        const response = await axios.get('http://localhost:8021/api/v1/preliminary-questions/risk-analysis'); // Adjust with the correct endpoint
        setRiskLevel(response.data.riskLevel); // Assuming backend returns the riskLevel field
      } catch (err) {
        setError('Error fetching risk level');
      } finally {
        setLoading(false);
      }
    };

    fetchRiskAnalysis();
  }, []);

  const riskData = [
    { name: 'Low Risk', value: riskLevel === 'Low' ? 100 : 0 },
    { name: 'Medium Risk', value: riskLevel === 'Medium' ? 100 : 0 },
    { name: 'High Risk', value: riskLevel === 'High' ? 100 : 0 },
    { name: 'Critical Risk', value: riskLevel === 'Critical' ? 100 : 0 },
  ];

  const COLORS = ['#008000', '#FFA500', '#FF0000', '#800080']; // Green for Low, Orange for Medium, Red for High


  const handleDownloadPDF = async () => {
    const pdf = new jsPDF('p', 'mm', 'a4');
  
    const capturePage = async (element) => {
      const canvas = await html2canvas(element, { scale: 1.5 }); // Reduce scale
      const imgData = canvas.toDataURL('image/jpeg', 0.7); // Use JPEG with quality 0.7
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
    };
  
    const pages = ['#page1', '#page2', '#page3', '#page4', '#page5'];
  
    for (let i = 0; i < pages.length; i++) {
      if (i > 0) pdf.addPage();
      const element = document.querySelector(pages[i]);
      await capturePage(element);
    }
  
    pdf.save('Preliminary-Risk-Report.pdf');
  };
  



  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Prelimianry Risk Analysis Dashboard
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleDownloadPDF}
        sx={{
          marginBottom: 2,
          padding: '10px 20px',
          fontSize: '1rem',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          borderRadius: '30px',
          boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
          backgroundImage: 'linear-gradient(to right, #ff416c, #ff4b2b)',
          color: '#fff',
          transition: 'all 0.3s ease',
          '&:hover': {
            backgroundImage: 'linear-gradient(to right, #ff4b2b, #ff416c)',
            transform: 'scale(1.05)',
            boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
          },
        }}
      >
        🚀 Download Risk Report
      </Button>

      <Paper sx={{ padding: 2, boxShadow: 3 }}>
        <Box>
          <Grid container spacing={3}>
            {/* Risk Level Summary */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Overall Risk Level</Typography>
              <Box sx={{ marginTop: 2, padding: 2, textAlign: 'center' }}>
                {riskLevel === 'Low' && <CheckCircle color="success" fontSize="large" />}
                {riskLevel === 'Medium' && <Warning color="warning" fontSize="large" />}
                {riskLevel === 'High' && <Error color="error" fontSize="large" />}
                {riskLevel === 'Critical' && <Error color="error" fontSize="large" />}
                <Typography variant="h5" sx={{ marginTop: 2 }}>
                  Risk Level: {riskLevel}
                </Typography>
                {riskLevel === 'Low' && <Typography color="green">✅ Low Risk</Typography>}
                {riskLevel === 'Medium' && <Typography color="orange">⚠️ Medium Risk</Typography>}
                {riskLevel === 'High' && <Typography color="red">❗ High Risk</Typography>}
                {riskLevel === 'Critical' && <Typography color="purple">⚠️ Critical Risk</Typography>}
              </Box>
            </Grid>

            {/* Risk Distribution Pie Chart */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Risk Distribution</Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={riskData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {riskData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                      ))}
                    </Pie>
                    <Legend verticalAlign="top" height={36} />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </Grid>
          </Grid>

          {/* Risk Level Cards */}
          <Grid container spacing={3} sx={{ marginTop: 3 }}>
            <Grid item xs={12} md={4}>
              <Card variant="outlined" sx={{ backgroundColor: '#E8F5E9' }}>
                <CardContent>
                  <Typography variant="h6">Low Risk</Typography>
                  <Typography variant="body1">Minimal risk detected. Everything is in order.</Typography>
                  <LinearProgress variant="determinate" value={riskLevel === 'Low' ? 100 : 0} sx={{ marginTop: 2 }} />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card variant="outlined" sx={{ backgroundColor: '#FFF3E0' }}>
                <CardContent>
                  <Typography variant="h6">Medium Risk</Typography>
                  <Typography variant="body1">Some issues detected. Review further actions.</Typography>
                  <LinearProgress variant="determinate" value={riskLevel === 'Medium' ? 100 : 0} sx={{ marginTop: 2 }} />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card variant="outlined" sx={{ backgroundColor: '#FFEBEE' }}>
                <CardContent>
                  <Typography variant="h6">High Risk</Typography>
                  <Typography variant="body1">Critical risk detected. Immediate attention required.</Typography>
                  <LinearProgress variant="determinate" value={riskLevel === 'High' ? 100 : 0} sx={{ marginTop: 2 }} />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={3}>
              <Card variant="outlined" sx={{ backgroundColor: '#F3E5F5' }}>
                <CardContent>
                  <Typography variant="h6">Critical Risk</Typography>
                  <Typography variant="body1">Severe issues detected. Immediate action is critical!</Typography>
                  <LinearProgress variant="determinate" value={riskLevel === 'Critical' ? 100 : 0} sx={{ marginTop: 2 }} />
                </CardContent>
              </Card>
            </Grid>

          </Grid>
        </Box>
      </Paper>


      <div ref={hiddenTemplateRef}>
        <div id="page1">
          <Page1 />
        </div>
        <div id="page2">
          <Page2 />
        </div>
        <div id="page3">
          <Page3 />
        </div>
        <div id="page4">
          <Page4 />
        </div>
        <div id="page5">
          <Page5 />
        </div>
      </div>


    </Container>
  );
};

export default RiskAnalysisPQ;
