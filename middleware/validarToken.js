const jwt = require('jsonwebtoken');





const verifyJWT = async (req, res, next) => {

    const token = req.cookies.token;
    console.log(token)
    try {
        
        const user = jwt.verify(token, process.env.JWT_SECRET_KEY);

        req.user = user;

        next();

    } catch (error) {
                
        return res.clearCookie('token').redirect('/');

    };

};


module.exports = {verifyJWT};