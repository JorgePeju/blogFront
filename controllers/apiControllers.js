
const {consultation} = require('../helpers/fetch')

/**
 * Obtiene los artículos de la API y los muestra en la vista del administrador.
 * @async
 * @function
 * @param {Object} req - 
 * @param {Object} res - 
 * @returns {json} Objeto con los datos del artículo.
 * @throws {error} Error al obtener los artículos.
 */
const getArticles = async (req, res) => {
    
    try {

        const page = parseInt(req.query.page);
        const limit = 5;
        const url = `${process.env.URL_BASE}?page=${page > 0 ? page : 1}&limit=${limit}`;
        const respuesta = await consultation(url);
        console.log(respuesta)
   
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
 * Obtiene un artículo de la API y los muestra en la vista detalle del administrador.
 * @async
 * @function
 * @param {Object} req - 
 * @param {Object} res - 
 * @returns {json} Objeto con los datos del artículo.
 * @throws {error} Error al obtener los artículos.
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
 * Crea un nuevo artículo.
 * @param {Object} req
 * @param {Object} res
 * @throws {Error} Si hay algún error al crear el artículo.
 * @returns {json} Una respuesta JSON que indica si la operación fue exitosa.
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

/**
Renderiza la vista de edición de un artículo.
*@param {Object} req 
*@param {Object} res 
*@returns Envía como respuesta la renderización de la vista.
*@throws {Error} Si ocurre algún error al obtener el artículo.
*/
const formEditArticle  = async (req, res) => {

    const id = req.params.id
    const url = `${process.env.URL_BASE}${id}`;

    const respuesta = await consultation(url)

    res.render('../views/admin/adminEdit.ejs', {
        article: respuesta.data
    });

};

/**
 * Edita un nuevo artículo.
 * @param {Object} req
 * @param {Object} res
 * @throws {Error} Si hay algún error al crear el artículo.
 * @returns {json} Una respuesta JSON que indica si la operación fue exitosa.
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
 * @returns {json} Una respuesta JSON que indica si la operación fue exitosa.
 * @throws {Error} Si ocurre algún error al borrar el artículo.
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