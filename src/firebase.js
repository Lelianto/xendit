import * as firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyDR5Td5ecQKbWmdr-ltuV5zBTLWpjPG2V8",
  authDomain: "xendit-f789a.firebaseapp.com",
  databaseURL: "https://xendit-f789a.firebaseio.com",
  projectId: "xendit-f789a",
  storageBucket: "xendit-f789a.appspot.com",
  messagingSenderId: "492831032248",
  appId: "1:492831032248:web:c1ad8db43f5e9d57f1054d",
  measurementId: "G-V4H32FQD7X"
};
// Initialize Firebase
const fireDb = firebase.initializeApp(firebaseConfig);
export default fireDb.database().ref();