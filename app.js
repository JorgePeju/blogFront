const express = require('express');
const cors = require("cors");
const cookieParser = require('cookie-parser');

//dotenv
require('dotenv').config();

const app = express();

app.use(cookieParser())

const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.set('views', __dirname + '/views'); //* también es posible hacer `${__dirname}/views`

//* Para parsear - traducir
app.use(express.json());

//* Para parsear req con urlencoded payload
app.use(express.urlencoded({ extended: false }));

//* RUTAS

app.use('/', require('./routers/routersFront'));

app.use('/admin', require('./routers/routersApi'));


//* En caso de error, mandar a la página 404 (Frontend y backend, hay que configurarlo)

app.use((req, res, next) => {
    res.status(404).render("404", {
        titulo: 'error 404',
        parrafo: `Page not found`
    })
});

//* Listener
app.listen(port, () => {
    console.log(`connected from port ${port}`)
})