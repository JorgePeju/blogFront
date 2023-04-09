const express = require('express');
const router = express.Router();

const { createArticle, deleteArticle, editArticle, formCreateArticle, formEditArticle, getArticles, signUp, formSignUp, logOut }=require('../controllers/apiControllers');
const { uploadImage } =require('../middleware/multer')

router.get('/',getArticles );

router.post('/create-article', [
  uploadImage
], createArticle );

router.get('/create-form', formCreateArticle);

router.post('/edit-article/:id', [
  uploadImage
], editArticle);

router.get('/edit-form/:id', formEditArticle);

router.get('/remove-article/:id', deleteArticle);

router.get('/signup-form', formSignUp );
router.post('/signup', signUp )

router.get('/logout', logOut );



module.exports = router;