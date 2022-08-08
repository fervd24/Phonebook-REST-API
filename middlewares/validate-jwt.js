const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) => {
    const token = req.header('x-token');

    if(!token) {
        return res.status(401).json({
            msg: 'No token on the request.'
        })
    }

    try {
        
        const { uid } = jwt.verify(token, process.env.SECRET_KEY);
        
        req.uid = uid;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'Invalid token'
        })
    }

}

module.exports = {
    validateJWT
}