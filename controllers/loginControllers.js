const { createUserWithEmailAndPassword, signOut , signInWithEmailAndPassword} = require('firebase/auth');
const { authFb } = require('../helpers/firebase')


const formSignIn = async (req, res) => {

    res.render('../views/signInForm.ejs');

};

/**
* Maneja la autenticación del usuario mediante correo electrónico y contraseña.
*@async
*@param {Object} req 
*@param {Object} res 
*@param {String} req.body - Correo electrónico del usuario.
*@param {String} req.body - Contraseña del usuario.
*@returns {Promise<Object>} - Promesa que resuelve cuando se completa la operación.
*@throws {Error} - Si ocurre un error al autenticar al usuario.
*/
const signIn = async (req, res) => {

    const { email, password } = req.body

    try {

        const userCredentials = await signInWithEmailAndPassword(authFb, email, password);
       
        const token = userCredentials._tokenResponse.idToken
        res.cookie("token", userCredentials._tokenResponse.idToken, {

            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            expires: new Date('2023-12-20'),

          });
        
        res.redirect('/admin')

    } catch (error) {

        res.render('../views/signInForm.ejs', {
            error
        });

    }
};

/**
 * Cierra la sesión actual del usuario y redirige a la página principal.
 * @param {Object} req
 * @param {Object} res
 */
const logOut = async (req, res) => {

    try {

        await signOut(authFb)
        res.clearCookie("token")
        res.redirect('/')

    } catch (error) {

        console.log(error)
    }
};

const formSignUp = async (req, res) => {

    res.render('../views/admin/signUpForm.ejs');

};

/**
*Registra un usuario y lo redirije a la vista del admin.
*@param {Object} req 
*@param {Object} res
*@param {String} req.body.email - Correo electrónico del usuario.
*@param {String} req.body.password - Contraseña del usuario.
*@returns {Promise<Object>}
*@throws {error}
*/
const signUp = async (req, res) => {

    const { email, password } = req.body

    try {

        const userCredentials = await createUserWithEmailAndPassword(authFb, email, password)

        res.redirect('/admin')

    } catch (error) {
        
        res.render('../views/admin/signUpForm.ejs', {
            error
        });
       
    }
};


module.exports= {
    
    formSignIn,
    signIn,
    logOut,
    formSignUp,
    signUp

};


// const signUp = async (req, res) => {
//     const { email, password } = req.body;

//     try {
    
//         const userCredentials = await createUserWithEmailAndPassword(authFb, email, password);

//         const token = userCredentials._tokenResponse.idToken;
        
//         res.cookie("token", token, {
//             httpOnly: true,
//             secure: true,
//             sameSite: 'strict',
//             expires: new Date('2023-12-20'),
//         });

//         res.redirect('/admin');

//     } catch (error) {
       
//         res.render('../views/admin/signUpForm.ejs', {
//             error
//         });
//     }
// };