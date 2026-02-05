const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');
require('dotenv').config();

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        const error = new AppError('Unauthorized', 401);
        return next(error);
    }
    
    const token = authHeader.split(' ')[1];
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { 
            id: decoded.id, 
            email: decoded.email, 
            role: decoded.role 
        };
        next();
    } catch (error) {
        const appError = new AppError('Invalid token', 401);
        return next(appError);
    }
};

const adminAuth = (req, res, next) => {
    if (req.user.role !== 'admin') {
        const error = new AppError('Admin access required', 403);
        return next(error);
    }
    next();
};

module.exports = { auth, adminAuth };