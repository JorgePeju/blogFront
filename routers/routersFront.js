const express = require('express');
const router = express.Router();

const { getAllArticles, getOneArticle, searchArticles, formSignIn, signIn }=require('../controllers/frontControllers')


router.get('/', getAllArticles );

router.get('/detail-view/:id', getOneArticle );

router.get('/search', searchArticles);

router.get('/signin-form', formSignIn );
router.post('/signin', signIn );

module.exports = router;