const { createUserWithEmailAndPassword, signOut , signInWithEmailAndPassword} = require('firebase/auth');
const { authFb } = require('../helpers/firebase')


const formSignIn = async (req, res) => {

    res.render('../views/signInForm.ejs');

};

/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @returns {Promise <Object>}
 * @throws {error}
 */
const signIn = async (req, res) => {

    const { email, password } = req.body

    try {

        const userCredentials = await signInWithEmailAndPassword(authFb, email, password);
       
        const token = userCredentials._tokenResponse.idToken
        res.cookie("token", userCredentials._tokenResponse.idToken , { http: true, secure: true, sameSite: 'strict', expires: new Date('2023-12-20') })
        
        console.log(token)
        res.redirect('/admin')

    } catch (error) {

        res.render('../views/signInForm.ejs', {
            error
        });

    }
};

/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @returns {Promise <Object>}
 * @throws {error}
 */
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

/**
 * 
 * @param {Object} req 
 * @param {Object} res
 * @returns {Promise <Object>}
 * @throws {error} 
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

}