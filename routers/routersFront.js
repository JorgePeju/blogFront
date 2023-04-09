const express = require('express');
const router = express.Router();

const {getAllArticles, getOneArticle, searchArticles}=require('../controllers/frontControllers')

router.get('/', getAllArticles );

router.get('/detail-view/:id', getOneArticle );


router.get('/search', searchArticles);

module.exports = router;