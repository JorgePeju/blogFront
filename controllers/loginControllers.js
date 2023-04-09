const { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, } = require('firebase/auth');
const { authFb } = require('../helpers/firebase')




const formSignIn = async (req, res) => {

    res.render('../views/signInForm.ejs');

};

const signIn = async (req, res) => {

    const { email, password } = req.body

    try {

        const userCredentials = await signInWithEmailAndPassword(authFb, email, password)

        res.redirect('/admin')

    } catch (error) {

        if (error.code === 'auth/wrong-password') {

            res.render('../views/signInForm.ejs', {
                error
            });

        } else if (error.code === 'auth/user-not-found') {

            res.render('../views/signInForm.ejs', {
                error
            });

        } else {

            res.render('../views/signInForm.ejs', {
                error
            });

        }
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

    const email = req.body.email
    const password = req.body.password
    try {

        const userCredential = await createUserWithEmailAndPassword(authFb, email, password)

        res.redirect('/admin')

    } catch (error) {
        if (error.code === 'auth/email-already-in-use') {

            res.render('../views/admin/signUpForm.ejs', {
                error
            });

        } else if (error.code === 'auth/invalid-email') {

            res.render('../views/admin/signUpForm.ejs', {
                error
            });

        } else if (error.code === 'auth/weak-password') {

            res.render('../views/admin/signUpForm.ejs', {
                error
            });

        } else if (error.code) {

           res.render('../views/admin/signUpForm.ejs', {
                error
            });

        }
    }
};

module.exports = {

    formSignIn,
    formSignUp,
    signIn,
    signUp,
    signOut,
    logOut

}