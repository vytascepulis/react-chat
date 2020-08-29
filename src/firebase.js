import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyArok4Ajt_FNgcqU3FVDZrOEeMamDyBADc",
  authDomain: "react-chat2-c1c6d.firebaseapp.com",
  databaseURL: "https://react-chat2-c1c6d.firebaseio.com",
  projectId: "react-chat2-c1c6d",
  storageBucket: "react-chat2-c1c6d.appspot.com",
  messagingSenderId: "29524752587",
  appId: "1:29524752587:web:f258301bfe8b228153034e",
  measurementId: "G-WY3P4VBH3E",
};

export let fire = firebase.initializeApp(firebaseConfig);
