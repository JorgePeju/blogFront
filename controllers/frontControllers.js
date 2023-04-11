const { consultation } = require('../helpers/fetch')

/**
 * Obtiene todos los artículos de la API y los muestra en la vista del admin.
 * @param {Object} req 
 * @param {Object} res 
 * @returns {json} - Una respuesta JSON con los datos de los artículos obtenidos.
 * @throws {error} - Si hay un error al acceder a los artículos.
 */
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

/**
 * Obtiene un artículo de la API y los muestra en la vista detalle del admin.
 * @param {Object} req 
 * @param {Object} res 
 * @returns {json} - Una respuesta JSON con los datos de los artículos obtenidos.
 * @throws {error} - Si hay un error al acceder a los artículos.
 */
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

/**
 * Busca artículos en el enviados formulario "search" para que la API los devuelva.
 * @param {Object} req 
 * @param {Object} res 
 * @returns {json} Una respuesta JSON con los datos de los artículos obtenidos.
 * @throws {error}
 */
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



module.exports= {

    getAllArticles,
    getOneArticle,
    searchArticles,
    
}