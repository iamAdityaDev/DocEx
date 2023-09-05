const jwt = require('jsonwebtoken');
const JWT_SECRET = "Harryisagoodboy";

const fetchuser = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json({ error: "Please authenticate using a valid token" });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        // console.log('Decoded Token:', decoded); // Log the decoded token
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }
};


module.exports = fetchuser;
