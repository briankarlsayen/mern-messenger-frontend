import firebase from 'firebase';

const firebaseApp = firebase.initializeApp ({
    apiKey: "AIzaSyDZ0zV1mmJqikma2O0fpmOddd0fq3TCIZ8",
    authDomain: "messenger-mern-fbc9b.firebaseapp.com",
    projectId: "messenger-mern-fbc9b",
    storageBucket: "messenger-mern-fbc9b.appspot.com",
    messagingSenderId: "1085328766536",
    appId: "1:1085328766536:web:b6014d991b94211b158a7d"
})

const db = firebaseApp.firestore();

export default db;