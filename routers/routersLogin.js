const express = require('express');
const router = express.Router();

const {formSignIn, formSignUp, signIn, signUp, logOut} =require('../controllers/loginControllers')

router.get('/signin-form', formSignIn );
router.post('/signup', signUp )

router.get('/signup-form', formSignUp );
router.post('/signin', signIn );

router.get('/logout', logOut );


module.exports = router;