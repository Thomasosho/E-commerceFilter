import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./screens/Index";
import Error from "./screens/Error";
import { initFlowbite } from 'flowbite'
import { useEffect } from 'react';
import Product from './screens/Product';
import firebase from "firebase/compat/app";

const firebaseConfig = {
  apiKey: "AIzaSyBqWS59GfOurkD5qc9QuR-ODCkl48Giff8",
  authDomain: "ninajojer-a3d9c.firebaseapp.com",
  databaseURL: "https://ninajojer-a3d9c-default-rtdb.firebaseio.com",
  projectId: "ninajojer-a3d9c",
  storageBucket: "ninajojer-a3d9c.appspot.com",
  messagingSenderId: "175583973559",
  appId: "1:175583973559:web:02652b2cf99f6c9dcebd32",
  measurementId: "G-KZJ1JRZ39S",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export { firebaseApp };

function App() {

  useEffect(() => {
    initFlowbite();
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addProduct" element={<Product />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
