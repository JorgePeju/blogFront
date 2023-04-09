const { createUserWithEmailAndPassword, signOut } = require('firebase/auth');
const { authFb } = require('../helpers/firebase')
const {consultation} = require('../helpers/fetch')

const getArticles = async (req, res) => {
    
    try {

        const page = parseInt(req.query.page);
        const limit = 5;
        const url = `${process.env.URL_BASE}?page=${page > 0 ? page : 1}&limit=${limit}`;
        const respuesta = await consultation(url);
   
        res.render('../views/admin/adminView.ejs', {
          article: respuesta.data
        });
        
    } catch (error) {

        return res.status(500).json({
            ok: false,
            msg: "Error obtener los artículos",
        });
        
    };

};

const formCreateArticle = async (req, res) => {

    res.render('../views/admin/adminCreate.ejs');

};

const createArticle = async (req, res) => {

    try {

        if (!res.errors) {

            req.body.imagen = `http://localhost:3000/imagenes/${ req.file.filename }`
            const url = `${process.env.URL_BASE}`;
            const method = 'POST';
            const body = req.body;

            await consultation(url, method, body)
            return res.redirect('/admin/');

        } else {

            const errors = res.errors;
            res.render('../views/admin/adminCreate.ejs', { errors });

        }

    } catch (error) {

        return res.status(500).json({
            ok: false,
            msg: "Error al crear el artículo",
        });

    }
};

const formEditArticle  = async (req, res) => {

    const id = req.params.id
    const url = `${process.env.URL_BASE}${id}`;

    const respuesta = await consultation(url)

    res.render('../views/admin/adminEdit.ejs', {
        article: respuesta.data
    });
  
        
};

const editArticle = async (req, res) => {

    try {
        
        req.body.imagen = `http://localhost:3000/imagenes/${ req.file.filename }`

        if (!res.errors) {

            const id = req.params.id
            const url = `${process.env.URL_BASE}${id}`;
            const method = 'PUT';
            const body = req.body;

            await consultation(url, method, body)
            return res.redirect('/admin');

        } else {

            await consultation(url, method, body)
            const errors = res.errors;
            res.render('../views/admin/adminEdit.ejs', { article, errors });
            
        }

    } catch (error) {

        return res.status(500).json({
            ok: false,
            msg: "Error al editar el artículo",
        });

    };
};


const deleteArticle = async (req, res) => {

    try {

        const id = req.params.id
        const url = `${process.env.URL_BASE}${id}`;
        const method = 'DELETE';

        await consultation(url, method); //* Crear constante previamente??
        res.redirect('/admin')
       
    } catch (error) {
        
        return res.status(500).json({
            ok: false,
            msg: "Error al borrar el artículo",
        });

    };

};


const logOut = async (req, res) => {

    try {

        await signOut(authFb)
        console.log("signup out of ");
        res.redirect('/')

    } catch (error) {

        console.log(error)
    }
};

const formSignUp = async (req, res) => {

    res.render('../views/admin/signUpForm.ejs');

};

const signUp = async (req, res) => {

    const { email, password } = req.body

    try {

        const userCredential = await createUserWithEmailAndPassword(authFb, email, password)

        res.redirect('/admin')

    } catch (error) {
        
        res.render('../views/admin/signUpForm.ejs', {
            error
        });
       
    }
};

module.exports = {
    
    getArticles,
    createArticle,
    editArticle,
    formCreateArticle,
    formEditArticle,
    deleteArticle,
    logOut,
    formSignUp,
    signUp

}