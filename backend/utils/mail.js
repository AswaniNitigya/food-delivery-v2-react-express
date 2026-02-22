import nodemailer from "nodemailer";

 const sendOtpMail = async (clientEmail, otp) => {
  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Mail options
    const mailOptions = {
      from: `"Food App V2" <${process.env.EMAIL_USER}>`,
      to: clientEmail,
      subject: "OTP Verification",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>OTP Verification</h2>
          <p>Your OTP for verification is:</p>
          <h1 style="color: #e53900;">${otp}</h1>
          <p>This OTP is valid for 5 minutes.</p>
        </div>
      `,
    };

    // Send mail
    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent:", info.messageId);
    return true;

  } catch (error) {
    console.error("Email sending error:", error);
    return false;
  }
};
export default sendOtpMail