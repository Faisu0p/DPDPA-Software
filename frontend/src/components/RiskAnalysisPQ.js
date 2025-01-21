import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Paper, Box, CircularProgress, Grid, Card, CardContent, LinearProgress } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { CheckCircle, Warning, Error } from '@mui/icons-material'; // Icons for risk levels

const RiskAnalysisPQ = () => {
  const [riskLevel, setRiskLevel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch risk analysis data from backend
  useEffect(() => {
    const fetchRiskAnalysis = async () => {
      try {
        const response = await axios.get('http://localhost:8021/api/v1/preliminary-questions/risk-analysis'); // Adjust with the correct endpoint
        setRiskLevel(response.data.riskLevel);  // Assuming backend returns the riskLevel field
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
  ];

  const COLORS = ['#008000', '#FFA500', '#FF0000']; // Green for Low, Orange for Medium, Red for High

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Risk Analysis Dashboard
      </Typography>
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
                <Typography variant="h5" sx={{ marginTop: 2 }}>
                  Risk Level: {riskLevel}
                </Typography>
                {riskLevel === 'Low' && <Typography color="green">✅ Low Risk</Typography>}
                {riskLevel === 'Medium' && <Typography color="orange">⚠️ Medium Risk</Typography>}
                {riskLevel === 'High' && <Typography color="red">❗ High Risk</Typography>}
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
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default RiskAnalysisPQ;
