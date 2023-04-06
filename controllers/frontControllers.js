const { consultation } = require('../helpers/fetch')


const getAllArticles = async (req, res) => {

    try {

        const url = ``
        const respuesta = await consultation(url)
        res.render('/')

    } catch (error) {

    }



};

const getOneArticle = async (req, res) => {

    try {

        const url = `` //* ID DE ARTICULO
        const respuesta = await consultation(url)
        res.render('/') //* USER VIEWS?

    } catch (error) {

    }



};


module.exports= {

    getAllArticles,
    getOneArticle
    
}