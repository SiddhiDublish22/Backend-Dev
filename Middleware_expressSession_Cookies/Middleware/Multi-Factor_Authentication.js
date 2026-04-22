import jwt from "jsonwebtoken";

const verifyMFA = (req, res, next) => {
  const token = req.headers.authorization;
  const otp = req.headers["x-otp"];

  if (!token || !otp) {
    return res.status(401).json({ message: "Token and OTP required" });
  }

  try {
    const decoded = jwt.verify(token, "secretKey");

    // Example OTP check (normally stored in DB)
    if (otp !== "123456") {
      return res.status(403).json({ message: "Invalid OTP" });
    }

    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid Token" });
  }
};

export default verifyMFA;