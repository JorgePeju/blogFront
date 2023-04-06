const {consultation} = require('../helpers/fetch')

const getArticles = async (req, res) => {

    const url = ``;

    try {

        const respuesta = await consultation(url);
        
        res.render('../views/admin/dashboard-admin.ejs', {
        respuesta
        });
        
    } catch (error) {

        console.log(error);
        
    };

};

const formCreateArticle = async (req, res) => {

    res.render('../views/admin/adminCreate.ejs');


};

const createArticle = async (req, res) => {

    try {

        if (!res.errors) {

            const url = ``;
            const method = 'POST';
            const body = req.body;

            await consultation(url, method, body)
            return res.redirect('/admin/articles');

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

    const url = ``;

    const respuesta = await consultation(url)

    res.render('../views/admin/adminEdit.ejs', {
        respuesta
    });
  
        
};


const editArticle = async (req, res) => {

    try {

        if (!res.errors) {

            const url = ``; //* METER ID
            const method = 'PUT';
            const body = req.body;

            await consultation(url, method, body)
            return res.redirect('/admin/articles');

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

        const url = ``; //* METER ID
        const method = 'DELETE';

        await consultation(url, method); //* Crear constante previamente??
        res.redirect('/dashboard-admin')
       
    } catch (error) {
        
        console.log(error);

    };

    

};

module.exports = {
    
    getArticles,
    createArticle,
    editArticle,
    formCreateArticle,
    formEditArticle,
    deleteArticle

}