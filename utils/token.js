const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const generateToken = async (payload) => {
    const token = await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
    return token;
}

module.exports = generateToken;