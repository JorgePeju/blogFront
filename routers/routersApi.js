const express = require('express');
const router = express.Router();

const { createArticle, deleteArticle, editArticle, formCreateArticle, formEditArticle, getArticles, getOneArticle}=require('../controllers/apiControllers');
const { signUp, formSignUp, logOut }=require('../controllers/loginControllers')
const {checkToken}=require('../middleware/validarToken')

const { uploadImage } =require('../middleware/multer')

router.get('/',[

  checkToken
], 
getArticles );

router.get('/detail-view/:id',[

  checkToken
], 
getOneArticle );

router.post('/create-article',[

  checkToken, 
  uploadImage
], createArticle );

router.get('/create-form',[

  checkToken
], 
formCreateArticle);

router.post('/edit-article/:id', [

  checkToken, 
  uploadImage
], 
editArticle);

router.get('/edit-form/:id',[

  checkToken
], 
formEditArticle);

router.get('/remove-article/:id', [

  checkToken
], 
deleteArticle);

router.get('/signup-form', [

  checkToken
], 
formSignUp );

router.post('/signup',[
  
  checkToken
], 
signUp )

router.get('/logout', [

  checkToken
], 
logOut );



module.exports = router;