var jwt = require('jsonwebtoken');
const JWT_SECRET = 'mynotebookjwtsecret';

const fetchUser = (req, res, next)=>{
    // Get the user from the JWt token and add id to request object
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({errors: 'Please Authenticate using valid token'});
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();    
    } catch (error) {
        res.status(401).send({errors: 'Please Authenticate using valid token'});
    }
}

module.exports = fetchUser;