const { consultation } = require('../helpers/fetch')


const getAllArticles = async (req, res) => {

    try {

        const url = `${process.env.URL_BASE}?page=${req.query.page}`; 
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

        const url = `${process.env.URL_BASE}`; 
        const respuesta = await consultation(url);
   
        res.render('../views/userView.ejs', {
          article: respuesta.data
        });
        
    } catch (error) {

        return res.status(500).json({
            ok: false,
            msg: "Error al acceder a los artículos",
        });
        
    };

};

module.exports= {

    getAllArticles,
    getOneArticle
    
}