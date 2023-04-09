const { signInWithEmailAndPassword } = require('firebase/auth');
const { authFb } = require('../helpers/firebase')
const { consultation } = require('../helpers/fetch')


const getAllArticles = async (req, res) => {

    try {

        const page = parseInt(req.query.page);
        const url = `${process.env.URL_BASE}?page=${page > 0 ? page : 1}`; 
        const respuesta = await consultation(url);
       
        res.render('../views/userView.ejs', {
          article: respuesta.data,
          
        });
        
    } catch (error) {

        return res.status(500).json({
            ok: false,
            msg: "Error al acceder a los artículos",
        });
        
    };

};


const getOneArticle = async (req, res) => {

    try {

        const id = req.params.id
        const url = `${process.env.URL_BASE}${id}`;
        const respuesta = await consultation(url)
     
        res.render('../views/detailView.ejs', {
            article: respuesta.data
          });

    } catch (error) {

        return res.status(500).json({
            ok: false,
            msg: "Error al acceder al artículo",
        });

    }
};

const searchArticles = async (req, res) => {
    
    try {

        const url = `${process.env.URL_BASE}/?search=${req.query.search}`;

        if(req.query.search != ''){ 

            const respuesta = await consultation(url);

            res.render('../views/searchView.ejs', {
                article: respuesta.data,
            });

        } else {

            res.redirect('/');

        };
        
    } catch (error) {

        return res.status(500).json({
            ok: false,
            msg: "Error al buscar los artículos",
        });
        
    };

};

const formSignIn = async (req, res) => {

    res.render('../views/signInForm.ejs');

};

const signIn = async (req, res) => {

    const { email, password } = req.body

    try {

        const userCredentials = await signInWithEmailAndPassword(authFb, email, password);
        
        //* res.cookie()
        res.redirect('/admin')

    } catch (error) {

        res.render('../views/signInForm.ejs', {
            error
        });

    }
};

module.exports= {

    getAllArticles,
    getOneArticle,
    searchArticles,
    formSignIn,
    signIn
    
}