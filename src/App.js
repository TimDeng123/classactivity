import { useState, useEffect } from 'react';
import './App.css';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

import { Routes, Route } from 'react-router-dom';

import { Home } from './pages/Home';
import { Contact } from './pages/Contact';
import { About } from './pages/About'
import { Signup } from './pages/Signup'
import { Signout } from './pages/Singout'
import { Signin} from './pages/Signin'
//import firebase
import { initializeApp } from "firebase/app";
import { firebaseConfig } from './config/FirebaseConfig';
import { getFirestore,collection, getDocs } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

//import firebase auth
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut,signInWithEmailAndPassword } from "firebase/auth";



//initialise Firebase
const FBapp = initializeApp(firebaseConfig)
//initialise Firebase auth
const FBauth = getAuth(FBapp)
//initialise Firebase database
const FBdb = getFirestore(FBapp)
//intialise Firebase storage
const FBstorage = getStorage()


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

const signin = (email,password)=>{
  return new Promise((resolve,reject)=> {
    signInWithEmailAndPassword(FBauth, email,password)
    .then((userCredential)=> resolve(userCredential.user))
    .catch((error) => reject(error) )
  })

}

const signoutUser = () => {
  return new Promise((resolve,reject)=>{
      signOut(FBauth)
      .then(() => resolve(true))
    .catch((error) => reject(error))
  })

}
const NavData = [
  { name: "Home", path: "/", public: true },
  { name: "About", path: "/about", public: true },
  { name: "Contact", path: "/contact", public: true },
  { name: "Sign Up", path: "/signup", public: true },
  { name: "Sign in", path: "/signin", public: true }

]
const NavDataAuth=[
  { name: "Home", path: "/", public: true },
  { name: "About", path: "/about", public: true },
  { name: "Contact", path: "/contact", public: true },
  
  { name: "Sign Out", path: "/signout", public: true }
]
function App() {

  const [auth, setAuth] = useState();
  const [nav,setNav]=useState(NavData)
  const [data,setData]= useState([])

  useEffect(()=>{
    if(data.length==0){
      setData( getDataCollection('Books'))
    }
  },[data] )


    //an observer to determine user's autheniticaiotn status
  onAuthStateChanged(FBauth, (user) => {
    if (user) {
      //visitor exist
      //console.log(user)
      setAuth(user)
      setNav(NavDataAuth)
    } else {
      //if user is null
      //console.log('not signed in')
      setAuth(null)
      setNav(NavData)
    }
  })

const getDataCollection = async (path)=>{
    const collectionData = await getDocs(collection(FBdb, path))
    let dbItems = []
    collectionData.forEach((doc)=>{
      let item = doc.data()
      item.id = doc.id
      dbItems.push(item)
    })
    setData(dbItems)
  }
    const getImageURL = (path)=>{
        //create a regerence to image in the path
        const ImageRef = ref(FBstorage,path)
        return new Promise((resolve, reject)=>{
          getDownloadURL (ImageRef)
          .then((url) => resolve(url) )
          .catch((error) => reject(error))
        })

    }
    




  return (

    <div className="App">

      <Header title="My app" headernav={ nav} />

      <Routes>
        <Route path="/" element={<Home listData={data} imageGetter = {getImageURL}/>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Signup handler={signup} />} />
        <Route path="/signout" element={<Signout handler={signoutUser} auth={auth} />} />
        <Route path="/signin" element={<Signin handler = {signin}/>}/>
      </Routes>




      <Footer year="2022" />
    </div>

  );
}

export default App;
