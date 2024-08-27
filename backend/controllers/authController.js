// backend/controllers/authController.js
import User from '../models/User.js';
import { generateToken } from '../utils/jwt.js';
import { AsyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

// Login route
const login = AsyncHandler(async (req, res) => {
  const { username, password } = req.body;
  console.log('Attempting login with:', username);

  const user = await User.findOne({ username });
  if (!user) {
    console.log('User not found');
    throw new ApiError(401, 'Invalid username or password');
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    console.log('Password mismatch');
    throw new ApiError(401, 'Invalid username or password');
  }

  const token = generateToken(user);
  res.status(200).json(new ApiResponse(200, { token }, 'Login successful'));
});

// Get current user route
const getCurrentUser = AsyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError(401, 'Unauthorized');
  }

  const user = await User.findById(req.user.id).select('-password');
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  res.status(200).json(new ApiResponse(200, user, 'Current user retrieved successfully.'));
});
// const getCurrentUser = AsyncHandler(async (req, res) => {
//   const user = await User.findById(req.user.id).select('-password');
//   if (!user) {
//     throw new ApiError(404, 'User not found');
//   }
//   res.status(200).json(new ApiResponse(200, user, 'Current user retrieved successfully.'));
// });

export { login, getCurrentUser };
