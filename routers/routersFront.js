const express = require('express');
const router = express.Router();

const {getAllArticles, getOneArticle, }=require('../controllers/frontControllers')

router.get('/', getAllArticles );

router.get('/detail-view/:id', getOneArticle );


router.get('/search',  );

module.exports = router;