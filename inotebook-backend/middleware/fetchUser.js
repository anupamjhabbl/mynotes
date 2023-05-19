const jwt = require('jsonwebtoken');
const secret_key = "Anupam loves mustang, supra, GTR, camaro";

const fetchUser = (req, res, next) => {
    const token = req.header('authToken'); 
    if (!token){
        return res.status(401).json({"eroor":"Please authenticate with proper token"});
    }

    try{
        const data = jwt.verify(token, secret_key);
        req.user = data.user;
        next();
    }
    catch(error){
        return res.status(401).json({"error":"access denied due to invalid authentication"});
    }
}

module.exports = fetchUser;