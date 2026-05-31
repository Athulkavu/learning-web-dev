import jwt from 'jsonwebtoken';
export default function authenticateUser(req, res, next) {
    // Middleware logic here
    // const token = req.headers.authorization; THIS OR BELOW VERSION WE CAN USE
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ errors: 'Token is required' })
    }
    try {
        const tokenData = jwt.verify(token, process.env.JWT_SECRET)
        // Token is valid - extract user info
        req.userId = tokenData.userId
        next();
    } catch (error) {
        return res.status(401).json({ errors: error.message })
    }
}