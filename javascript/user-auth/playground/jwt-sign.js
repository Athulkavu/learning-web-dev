import jwt from 'jsonwebtoken';

// After user verification
const user = {
    _id: 123,
    email: 'user4@gmail.com',
    password: '$2b$10$...' // hashed password
};

const tokenData = {
    userId: user._id
};

const token = jwt.sign(tokenData, 'dct@123', { expiresIn: '7d' });
console.log(token);