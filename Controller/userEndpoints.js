const asyncWrapper = require("../Middleware/asyncWrapper");
const STATUS = require("../utils/httpStatusText");
const User = require("../Models/users");
const AppError = require("../utils/AppError");
const becrypt = require("bcryptjs");



const getAllUsers = asyncWrapper(async (req, res, next) => {
    const query = req.query;
    const limit = parseInt(query.limit) || 0;
    const page = parseInt(query.page) || 1;
    const skip = (page - 1) * limit;

    const users = await User.find({}, { __v: 0, password: 0 }).limit(limit).skip(skip);

    res.status(200).json({ status: STATUS.SUCCESS, data: users });
});

const registerUser = asyncWrapper(async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;
    const oldUser = await User.findOne({ email: email });
    if (oldUser) {
        const error = new AppError("User already exists", 400);
        return next(error);
    }
    const hashedPassword = await becrypt.hash(password, 10);
    const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
    });
    await newUser.save();
    const userResponse = newUser.toObject();
    delete userResponse.password;

    res.status(201).json({ status: STATUS.SUCCESS, data: { user: userResponse } });
})

const LoginUser = asyncWrapper(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        const error = new AppError("Email and password are required", 400);
        return next(error);
    }
    const user = await User.findOne({ email: email });
    if (!user) {
        const error = new AppError("User not found", 404);
        return next(error);
    }
    const isPasswordMatched = await becrypt.compare(password, user.password);
    if (!isPasswordMatched) {
        const error = new AppError("Invalid credentials", 401);
        return next(error);
    }
    const userResponse = user.toObject();
    delete userResponse.password;
    res.status(200).json({ status: STATUS.SUCCESS, data: { user: userResponse } });
})

module.exports = {
    getAllUsers,
    registerUser,
    LoginUser
}