import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js"; // Ensure file name is correct

export const createUser = async (req, res) => {
  const { fullName, Email, Password } = req.body;

  // Validate required fields
  if (!fullName || !Email || !Password) {
    return res.status(400).json({
      error: true,
      message: "Full name, Email, and Password are required",
    });
  }

  // Check if user already exists
  const isUser = await User.findOne({ Email });
  if (isUser) {
    return res.status(409).json({
      error: true,
      message: "User already exists",
    });
  }

  // Hash the Password
  const hashedPassword = await bcrypt.hash(Password, 10);

  // Create and save new user
  const user = new User({
    fullName,
    Email,
    Password: hashedPassword,
  });

  await user.save();

  // ✅ Only include necessary info in JWT payload (avoid full user object)
  const payload = {
    id: user._id,
    Email: user.Email,
    fullName: user.fullName,
  };

  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "3600s", // 1 hour; change as needed
  });

  return res.status(201).json({
    error: false,
    message: "User created successfully",
    accessToken,
    user: payload,
  });
};





export const userLogin = async (req, res) => {
  const { Email, Password } = req.body;

  if (!Email) {
    return res.status(400).json({ message: "Email is required" });
  }

  if (!Password) {
    return res.status(400).json({ message: "Password is required" });
  }

  const userInfo = await User.findOne({ Email });

  if (!userInfo) {
    return res.status(400).json({ message: "User not found" });
  }

  // ✅ Compare hashed Password
  const isPasswordValid = await bcrypt.compare(Password, userInfo.Password);

  if (!isPasswordValid) {
    return res.status(400).json({
      error: true,
      message: "Invalid credentials",
    });
  }

  const payload = {
    id: userInfo._id,
    Email: userInfo.Email,
    fullName: userInfo.fullName,
  };

  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "36000m",
  });

  return res.json({
    error: false,
    message: "Login successful",
    accessToken,
    user: payload,
  });
};


export const getUserDetails = async (req, res) => {
  const userId = req.user.id;

  try {
    const isUser = await User.findById(userId); 

    if (!isUser) {
      return res.sendStatus(401); 
    }

    return res.json({
      user: isUser,
      message: "",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};





export default createUser;
