
const {consultation} = require('../helpers/fetch')

/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @returns {json} article
 * @throws {error}
 */
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

/**
 *  
 * @param {Object} req 
 * @param {Object} res 
 * @returns {json} article
 * @throws {error}
 */
const getOneArticle = async (req, res) => {

    try {

        const id = req.params.id
        const url = `${process.env.URL_BASE}${id}`;
        const respuesta = await consultation(url)
     
        res.render('../views/admin/detailView.ejs', {
            article: respuesta.data
          });

    } catch (error) {

        return res.status(500).json({
            ok: false,
            msg: "Error al acceder al artículo",
        });

    }
};

const formCreateArticle = async (req, res) => {

    res.render('../views/admin/adminCreate.ejs');

};

/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @returns {json}
 * @throws {error}
 */
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

/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @returns {json}
 * @throws {error}
 */
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

/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @returns {json}
 * @throws {error}
 */
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




module.exports = {
    
    getArticles,
    getOneArticle,
    createArticle,
    editArticle,
    formCreateArticle,
    formEditArticle,
    deleteArticle,

}