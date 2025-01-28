import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PhoneNumberForm = ({ onNext }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate phone number
    if (!/^\d{10}$/.test(phoneNumber)) {
      alert("Invalid phone number format");
      return;
    }

    // Move to next step
    onNext(phoneNumber, otp);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-md space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800 text-center">
        Enter Phone Number
      </h2>
      <div className="space-y-3">
        <label htmlFor="phoneNumber" className="block text-gray-700 font-medium">
          Phone Number:
        </label>
        <input
          type="text"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Enter your phone number"
          required
        />
      </div>
      <div className="space-y-3">
        <label htmlFor="otp" className="block text-gray-700 font-medium">
          OTP:
        </label>
        <input
          type="text"
          id="otp"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Enter OTP"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Next
      </button>
    </form>
  );
};

export default PhoneNumberForm;
