const { initializeApp } = require('firebase/app')
const { getAuth } = require('firebase/auth');
const { firebaseConfig } = require('../config/firebaseConfig')

/**
 * @type {Object} 
 */
const firebaseApp = initializeApp(firebaseConfig);
/**
 * @type {Object} 
 */
const authFb = getAuth(firebaseApp)

module.exports= {
    authFb
}

