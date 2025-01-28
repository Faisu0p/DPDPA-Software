import React, { useState, useEffect } from 'react';
import StepsComponent from '../components/StepsComponent';
import Scoreboard from '../components/Scoreboard';
import { fetchCurrentUser } from '../api/userApi'; // Assume this gets the current logged-in user
import { useNavigate } from 'react-router-dom';
import './dashboard.css';
import RiskDashboard from '../components/RiskDashboard';

const Dashboard = () => {
  const [showSteps, setShowSteps] = useState(true);
  const buttonClass = showSteps ? 'show-steps' : 'hide-steps';
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();

  const toggleSteps = () => {
    setShowSteps(!showSteps);
  };

  const checkFormStatus = async () => {
    try {
      const token = window.localStorage.getItem('token');
      if (!token) {
        console.error('No token found, redirecting to login.');
        navigate('/login');
        return;
      }

      const { data: currentUser } = await fetchCurrentUser(token);

      if (!currentUser.hasCompletedCompanyForm) {
        setModalVisible(true);
      }
    } catch (error) {
      console.error('Error fetching current user:', error);
      navigate('/login'); // Redirect to login if there's an error
    }
  };

  useEffect(() => {
    checkFormStatus();
  }, []);

  const handleFillForm = () => {
    setModalVisible(false);
    navigate('/onboarding');
  };

  return (
    <div>
      {modalVisible && (
        <div className="modern-modal">
          <div className="modern-modal-content">
            <h2 className="modern-modal-title">Please Complete the Company Form</h2>
            <p className="modern-modal-description">You must complete the company form before proceeding.</p>
            <button className="modern-modal-button" onClick={handleFillForm}>
              Fill Form Now
            </button>
          </div>
        </div>


      )}
      {showSteps ? <StepsComponent onClose={toggleSteps} /> : <Scoreboard />}
    </div>
  );
};

export default Dashboard;


