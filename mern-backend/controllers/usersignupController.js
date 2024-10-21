const UserModel = require("../models/User.js");
const nodemailer = require("nodemailer");
const { appconfig } = require("../config/appconfig.js");
const { hashPassword } = require("../utils/hashPassword.js"); // Import the hashing function
const StudentProfileModel = require("../models/StudentProfileModel.js");

// Function to generate a random alphanumeric string of a given length
const generateRandomString = (length) => {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

// Function to create a base username
const createBaseUsername = (userType, fullname) => {
  return `${userType.charAt(0).toUpperCase()}_${fullname
    .replace(/\s+/g, "")
    .toLowerCase()}`;
};

// Function to generate a unique username
const generateUniqueUsername = async (baseUsername) => {
  let username = baseUsername;
  let randomSuffix;

  do {
    randomSuffix = generateRandomString(8); // Generate a random 8-character string
    username = `${baseUsername}_${randomSuffix}`; // Create the full username
  } while (await UserModel.findOne({ username })); // Check if it exists in the database

  return username;
};

const usersignupController = async (req, res) => {
  try {
    // console.log("malik")
    const { fullname, email, userType } = req.body;

    // Create a base username
    const baseUsername = createBaseUsername(userType, fullname);

    // Generate a unique username
    const username = await generateUniqueUsername(baseUsername);

    // Generate a random password
    const password = Math.random().toString(36).slice(-8); // Example random password
    const hashedPassword = await hashPassword(password); // Hash the password

    // CHECKING EXISTING USER
    const existingUser = await UserModel.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(409).json({
        status: "failed",
        message: "Email or username already registered!",
      });
    }

    const createdUser = await UserModel.create({
      fullname,
      email,
      username,
      password: hashedPassword, // Save the hashed password
      userType,
    });
    // Send email with username and password
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: appconfig.EMAILJS_USER_ID,
        pass: appconfig.EMAILJS_USER_SECRET,
      },
      tls: { rejectUnauthorized: false },
    });

    const mailOptions = {
      from: appconfig.EMAILJS_USER_ID,
      to: email,
      subject: "Your Signup Details",
      text: `Here are your login details:\n\nUsername: ${username}\nPassword: ${password}\n\nPlease change your password after logging in.`,
    };

    await transporter.sendMail(mailOptions);

    const newUser = await UserModel.findById(createdUser._id).select(
      "-password -createdAt -updatedAt -__v"
    );

    return res.status(200).json({
      status: "success",
      message: "Registration successful! Login details sent to your email.",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: `Unable to register: ${error}`,
    });
  }
};

module.exports = usersignupController;
