import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/token.js";
import sendOtpMail from "../utils/mail.js";
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
      return res.status(404).json({ message: "User not found" });
    }
    if (password.length<1){
        return res.status(404).json({ message: "Enter password" });
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

export const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not exist" });
    }
    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log(otp);
    user.resetOTP = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000;
    user.isOTPVerified = false; // waise toh already false hi tha
    await user.save();
    console.log("Before sending mail");
    // using mail.js utils file
    await sendOtpMail(email, otp);
    console.log("After sending mail");
    return res.status(200).json({ message: "Otp send succesfully" });
  } catch (error) {
    console.log("OTP Error:", error);
    return res.status(500).json({ message: "Failed to send OTP" });
  }
};



export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }

    if (user.resetOTP !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "expired or invalid otp" });
    }

    user.isOTPVerified = true;
    user.otpExpires = undefined;
    user.resetOTP = undefined;
    await user.save();
    return res.status(200).json({ message: "OTP verified succesfully" });
  } catch (error) {
    return res.status(400).json({ message: "error in verify otp" });
  }
};


export const googleAuth = async (req,res)=>{
    try {
      const {fullname,email,mobile,role}  = req.body
      let user = await User.findOne({email})
      if (!user) {
          user= await User.create({
            fullname,
            email,
            mobile,
            role
          })
      }
      const token = await generateToken(user._id);
      // to store data in cookie
      res.cookie("token", token, {
      secure: false, // to run in http site also
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milisecond
      httpOnly: true,
    });
    console.log("sign in with google backend hit");
    return res.status(200).json(user)
    } catch (error) {
      return res.status(400).json({ message: "error in google auth" });
    }
}

export const resetPassword = async (req, res) => {
  try {
    const { email, newpassword } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    if (!user.isOTPVerified) {
      return res.status(400).json({ message: "Otp is not valid " });
    }

    const new_hashed_password = await bcrypt.hash(newpassword,10)
    user.password=new_hashed_password
    user.isOTPVerified=false
    await user.save()
    
    return res.status(200).json({ message: "Password reset succesfully " });
  } catch (error) {
      return res.status(400).json({ message: "error in reset password" });
  }
};