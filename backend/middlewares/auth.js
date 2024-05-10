const jwt = require('jsonwebtoken');
const ENV = require('../config.js');

/**auth middleware*/
const Auth = async function (req, res, next){
    try {
        // Access authorize header to validate request
        const token = req.headers.authorization.split(" ")[1];

        // Retrieve the user details of the logged-in user
        const decodedToken = await jwt.verify(token, ENV.JWT_SECRET);

        req.user = decodedToken;

        next();
    } catch (error) {
        res.status(401).send({ error : "Authentication Failed!"});
    }
};

const localVariables = function(req, res, next){
    req.app.locals = {
        OTP : null,
        resetSession : false
    };

    next();
};

module.exports = {Auth, localVariables}
