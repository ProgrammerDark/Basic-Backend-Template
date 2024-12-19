const jwt = require('jsonwebtoken')

const isAuthenticated = async (req, res, next)=> {
    try {
        const token = await req.headers.authorization.split(' ')[1];
        if (!token){
            return res.status(401).json({error: 'No token provided, User not authoriezed'})
        }
        const data = jwt.verify(token, process.env.JWT_SECRET);
        if (!data){
            return res.status(403).json({error: 'Invalid token, User not authoriezed'})
        }
        req.user = data;
        next();
    } catch (error) {
        return res.status(500).json({error: 'Server error, User not authoriezed'})
    }
        
}

module.exports = isAuthenticated;