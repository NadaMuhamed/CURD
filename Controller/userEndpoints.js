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
  
    const users = await User.find({}, { __v: 0 , password: 0}).limit(limit).skip(skip);
  
    res.status(200).json({ status: STATUS.SUCCESS, data: users });
});

const registerUser = asyncWrapper(async(req, res, next) => {
    const user = new User(req.body);
    const oldUser = await User.findOne({ email: req.body.email });
    if (oldUser) {
        return next(new AppError("User already exists with this email", 400));
    }
    const salt = await becrypt.genSalt(10);
    user.password = await becrypt.hash(user.password, salt);
    await user.save();
    delete user.password;
    res.status(201).json({ status: STATUS.SUCCESS, data: user });
})

const LoginUser = asyncWrapper(async (req, res, next) => {
        
})

module.exports ={
    getAllUsers,
    registerUser,
    LoginUser
}