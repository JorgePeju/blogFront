const { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail,  } = require('firebase/auth');
const { authFb } = require('../helpers/firebase')




const formSignIn = async (req, res) => {

    res.render('../views/signInForm.ejs');

};

const signInCreate = async (req, res) => {

    const { email, password } = req.body
    
    console.log(email, password)
    
    try {

        const userCredentials = await signInWithEmailAndPassword(authFb, email, password)
       
          
       
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
}

const logOut = async (req, res) => {

    try {

        await signOut(authFb)
        console.log("signup out of ");

    } catch (error) {

        console.log(error)
    }
}



module.exports= {

    formSignIn
    
}