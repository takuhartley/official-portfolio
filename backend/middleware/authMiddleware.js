import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
	let token;

	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		try {
			// Declare variable token which is made by
			// spliting at the first part of the token
			// example: "Bearer 1Ab3g31r333ffe3f"
			// into: "1Ab3g31r333ffe3f"
			token = req.headers.authorization.split(' ')[1];

            // Declaring constant "decode." 
            // "decode" is the token decoded and verified
            // Using the parameter "token" and "JWT_SECRET" in .env file
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // req.user is an instane of a user
            // Which parameters matches a decoded token's id 
            // Importing their information other than their password (-password)
			req.user = await User.findById(decoded.id).select('-password');

            // Calling the input parameter function next()
            // Which will take us to the next process
			next();
		} catch (error) {
			console.error(error);
			res.status(401);
			throw new Error('Not Authorized: Failure with token');
		}
	}

	if (!token) {
		res.status(401);
		throw new Error('Not Authorized: Failure with token');
	}
});

const admin = (req, res, next) => {
	if (req.user && req.user.isAdmin) {
		next();
	} else {
		res.status(401);
		throw new Error('Not Authorized: Not an admin');
	}
};

export { protect, admin };
