// this file will be used to check the token of user 
import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
    try {
        console.log("is auth triggered");
        console.log("Cookies:", req.cookies);

        const token = req.cookies?.token;

        if (!token) {
            return res.status(400).json({ message: "token not found" });
        }

        const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

        if (!decodeToken) {
            return res.status(400).json({ message: "User not found or decode failed" });
        }

        req.userId = decodeToken.userID;
        next();
    } catch (error) {
        console.log("Auth Error:", error.message);
        return res.status(500).json({ message: "is auth error" });
    }
};

export default isAuth;