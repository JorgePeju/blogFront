const { initializeApp } = require('firebase/app')
const { getAuth } = require('firebase/auth');
const { firebaseConfig } = require('../config/firebaseConfig')

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

module.exports= {
    authFb
}

