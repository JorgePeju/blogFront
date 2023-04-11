const { createUserWithEmailAndPassword, signOut , signInWithEmailAndPassword} = require('firebase/auth');
const { authFb } = require('../helpers/firebase')


const formSignIn = async (req, res) => {

    res.render('../views/signInForm.ejs');

};

const signIn = async (req, res) => {

    const { email, password } = req.body

    try {

        const userCredentials = await signInWithEmailAndPassword(authFb, email, password);
        
        //* res.cookie()
        res.redirect('/admin')

    } catch (error) {

        res.render('../views/signInForm.ejs', {
            error
        });

    }
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


module.exports= {
    
    formSignIn,
    signIn,
    logOut,
    formSignUp,
    signUp

}