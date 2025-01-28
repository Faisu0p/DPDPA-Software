import React, { useState, useEffect } from 'react';
import { createCompanyForm } from '../api/companyFormApi';
import { useNavigate } from 'react-router-dom';
import { fetchCurrentUser } from '../api/userApi';

const CompanyDetailsForm = ({ phoneNumber, otp }) => {
  const [organizationName, setOrganizationName] = useState('');
  const [industryType, setIndustryType] = useState('');
  const [customIndustryType, setCustomIndustryType] = useState('');
  const [numberOfEmployees, setNumberOfEmployees] = useState('');
  const [userId, setUserId] = useState('');
  const [stakeholdersName, setStakeholdersName] = useState('');

  useEffect(() => {
    (async () => {
      const { data } = await fetchCurrentUser(window.localStorage.getItem('token'));
      setUserId(data._id);
    })();
  }, []);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      userId,
      phoneNumber,
      companyDetails: {
        organizationName,
        industryType,
        customIndustryType: industryType === 'Others' ? customIndustryType : undefined,
        numberOfEmployees,
        stakeholdersName,
      },
      otp,
    };

    try {
      const createdForm = await createCompanyForm(formData, userId);
      console.log('Company form created successfully:', createdForm);
      alert('Company form submitted successfully');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error during form submission process:', error);
      alert('Failed to submit the form');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center mb-6">Company Details</h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="organizationName" className="block text-sm font-medium text-gray-700">
            Organization Name:
          </label>
          <input
            type="text"
            id="organizationName"
            value={organizationName}
            onChange={(e) => setOrganizationName(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="stakeholdersName" className="block text-sm font-medium text-gray-700">
            Stakeholders Name:
          </label>
          <input
            type="text"
            id="stakeholdersName"
            value={stakeholdersName}
            onChange={(e) => setStakeholdersName(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="industryType" className="block text-sm font-medium text-gray-700">
            Industry Type:
          </label>
          <select
            id="industryType"
            value={industryType}
            onChange={(e) => setIndustryType(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select...</option>
            <option value="Consulting">Consulting</option>
            <option value="Finance">Finance</option>
            <option value="Banking">Banking</option>
            <option value="Ecommerce">Ecommerce</option>
            <option value="Cloud Service Provider">Cloud Service Provider</option>
            <option value="Gaming">Gaming</option>
            <option value="IT/ITeS">IT/ITeS</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Insurance">Insurance</option>
            <option value="Education">Education</option>
            <option value="Analytics">Analytics</option>
            <option value="OEMs">OEMs</option>
            <option value="Defense">Defense</option>
            <option value="Health Service Provider">Health Service Provider</option>
            <option value="AI">AI</option>
            <option value="Tech">Tech</option>
            <option value="Others">Others</option>
          </select>
        </div>

        {industryType === 'Others' && (
          <div>
            <label htmlFor="customIndustryType" className="block text-sm font-medium text-gray-700">
              Custom Industry Type:
            </label>
            <input
              type="text"
              id="customIndustryType"
              value={customIndustryType}
              onChange={(e) => setCustomIndustryType(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        )}

        <div>
          <label htmlFor="numberOfEmployees" className="block text-sm font-medium text-gray-700">
            Number of Employees:
          </label>
          <select
            id="numberOfEmployees"
            value={numberOfEmployees}
            onChange={(e) => setNumberOfEmployees(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select...</option>
            <option value="10-50">10-50</option>
            <option value="50-100">50-100</option>
            <option value="100-500">100-500</option>
            <option value="1000-5000">1000-5000</option>
            <option value="5000+">5000+</option>
          </select>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full py-3 px-6 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompanyDetailsForm;
