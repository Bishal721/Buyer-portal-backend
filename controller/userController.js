const User = require("../model/userModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill all the required fields");
  }

  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be at least 6 characters");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("Email has already been registered");
  }

  const user = await User.create({ name, email, password });

  const token = generateToken(user._id);

  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "none",
    expires: new Date(Date.now() + 1000 * 86400),
  });

  const { _id, role } = user;

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: {
      _id,
      name,
      email,
      role,
      token,
    },
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please fill all the required fields");
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("User not found. Please register first");
  }

  const correct = await bcrypt.compare(password, user.password);
  if (!correct) {
    res.status(400);
    throw new Error("Invalid email or password");
  }

  const token = generateToken(user._id);

  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "none",
    expires: new Date(Date.now() + 1000 * 86400),
  });

  const { _id, name, role } = user;

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: {
      _id,
      name,
      email,
      role,
      token,
    },
  });
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "none",
    expires: new Date(0),
  });

  return res.status(200).json({
    success: true,
    message: "Successfully logged out",
  });
});

const loginStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json({
      success: true,
      authenticated: false,
    });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);

    return res.json({
      success: true,
      authenticated: true,
    });
  } catch (error) {
    return res.json({
      success: true,
      authenticated: false,
    });
  }
});

const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const { _id, name, email, role } = user;

  res.status(200).json({
    success: true,
    message: "User fetched successfully",
    data: {
      _id,
      name,
      email,
      role,
    },
  });
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  loginStatus,
  getUser,
};
