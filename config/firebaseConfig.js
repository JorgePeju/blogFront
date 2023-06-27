
const firebaseConfig = {
    apiKey: "AIzaSyDp8hIVwDGpovnTMu1Ag5wuMFoeqqvjyxQ",
    authDomain: "proyecto-blog-9520e.firebaseapp.com",
    projectId: "proyecto-blog-9520e",
    storageBucket: "proyecto-blog-9520e.appspot.com",
    messagingSenderId: "129435450828",
    appId: "1:129435450828:web:c05e0797bd61a30185f169",
  };


  const serviceAccount = {
    "type": "service_account",
    "project_id": process.env.PROJECT_ID,
    "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID ,
    "private_key": process.env.FIREBASE_PRIVATE_KEY,
    "client_email": process.env.CLIENT_EMAIL,
    "client_id": process.env.CLIENT_ID,
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-qkiva%40proyecto-blog-9520e.iam.gserviceaccount.com"
  }
  module.exports={
    firebaseConfig,
   serviceAccount}