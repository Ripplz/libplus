import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

var config = {
  apiKey: "AIzaSyAOpYj1Ifo3Lh6TpYtyYISqiH4Wv6rCu0I",
  authDomain: "libplus-9dfbf.firebaseapp.com",
  databaseURL: "https://libplus-9dfbf.firebaseio.com",
  projectId: "libplus-9dfbf",
  storageBucket: "",
  messagingSenderId: "608794139030"
};
firebase.initializeApp(config);

const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth };