const { initializeApp } = require('firebase/app')
const { getAuth } = require('firebase/auth');
const { firebaseConfig , serviceAccount } = require('../config/firebaseConfig')
const  admin = require("firebase-admin");
/**
 * Instancia de Firebase.
 * @type {Object} 
 */
const firebaseApp = initializeApp(firebaseConfig);
/**
 * Instancia de la autentificación de Firebase
 * @type {Object} 
 */
const authFb = getAuth(firebaseApp)

/**
 * @type {json}
 */


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports= {
    authFb,
    admin
}

