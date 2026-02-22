import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/token.js";

export const signup = async (req, res) => {
  try {
    const { fullname, email, password, mobile, role } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exist" });
    }

    if (mobile.length !== 10) {
      return res.status(400).json({ message: "mobile must be 10 digit long" });
    }
    console.log(mobile);
    console.log(mobile.length);
    if (!mobile.length === 10) {
      return res.status(400).json({ message: "mobile must be 10 digit long " });
    }

    const hashed_password = await bcrypt.hash(password, 10);

    user = await User.create({
      fullname,
      email,
      password: hashed_password,
      mobile,
      role,
    });
    const token = await generateToken(user._id);
    // to store data in cookie
    res.cookie("token", token, {
      secure: false, // to run in http site also
      sameSite: "strict",
      maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days in milisecond
      httpOnly: true,
    });
    return res.status(201).json(user);
  } catch (error) {
  console.log("Signup Error:", error); // see full error in terminal
  return res.status(500).json({
    message: error.message || "Internal Server Error",
  });
}
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(404).json({ message: "Wrong password" });
    }

    const token = await generateToken(user._id);
    // to store data in cookie
    res.cookie("token", token, {
      secure: false, // to run in http site also
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milisecond
      httpOnly: true,
    });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(`sign in error ${error}`);
  }
};

// creating LOG OUT logic
export const signout = async (req, res) => {
  try {
    res.clearCookie("token"); // just deletes the cookie store as token
    return res.status(200).json({ message: "Sign out done " });
  } catch (error) {
    return res.status(404).json({ message: "Sign out not possible" });
  }
};
