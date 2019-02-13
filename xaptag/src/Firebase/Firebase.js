import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAKTgzJgYr1-wcGhmD6FXzmjvFqxw9k_YI",
    authDomain: "medical-folder-3745c.firebaseapp.com",
    databaseURL: "https://medical-folder-3745c.firebaseio.com",
    projectId: "medical-folder-3745c",
    storageBucket: "medical-folder-3745c.appspot.com",
    messagingSenderId: "796828906108"
};
const Firebase = !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

export default Firebase