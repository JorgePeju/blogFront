const { admin } = require('../helpers/firebase');

const checkToken = async (req, res, next) => {

    const idToken = req.cookies.token;

    if (!idToken) {

        return res.redirect("/");

    }

    try {

        const decodedToken = await admin.auth().verifyIdToken(idToken);
        req.user = decodedToken;

        next();

    } catch (error) {

        console.log(error);

        res.redirect('/')

    }
};

module.exports = { checkToken };