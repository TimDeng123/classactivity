import { useState, useEffect } from 'react';
import './App.css';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

import { Routes, Route } from 'react-router-dom';

import { Home } from './pages/Home';
import { Contact } from './pages/Contact';
import { About } from './pages/About'
import { Signup } from './pages/Signup'
//import firebase
import { initializeApp } from "firebase/app";
import { firebaseConfig } from './config/FirebaseConfig';
//import firebase auth
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";



//initialise Firebase
const FBapp = initializeApp(firebaseConfig)
//initialise Firebase auth
const FBauth = getAuth(FBapp)



//function to create user account
const signup = (email, password) => {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(FBauth, email, password)
      .then((userCredential) => resolve(userCredential.user))
      .catch((error) => reject(error))
  })
  {/*createUserWithEmailAndPassword(FBauth, email, password)
    .then((userCredential) => {
      //do something with the credential
      console.log(userCredential.user)
    })
    .catch((error) => {
      console.log(error)
    }
    )
  */}
}

const NavData = [
  { name: "Home", path: "/", public: true },
  { name: "About", path: "/about", public: true },
  { name: "Contact", path: "/contact", public: true },
  { name: "Sign Up", path: "/signup", public: true }

]
function App() {

  const [auth, setAuth] = useState();
  //an observer to determine user's autheniticaiotn status
  onAuthStateChanged(FBauth, (user) => {
    if (user) {
      //visitor exist
      console.log(user)
      setAuth(user)
    } else {
      //if user is null
      console.log('not signed in')
      setAuth(null)
    }
  })
  return (

    <div className="App">

      <Header title="My app" headernav={NavData} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Signup handler={signup} />} />
      </Routes>




      <Footer year="2022" />
    </div>

  );
}

export default App;
