const express = require('express');
const router = express.Router();

const {formSignIn} =require('../controllers/loginControllers')

router.get('/signin-form', formSignIn );

router.post('/signin', );








module.exports = router;