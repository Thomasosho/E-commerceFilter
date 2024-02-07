import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./screens/Index";
import Error from "./screens/Error";
import { initFlowbite } from 'flowbite'
import { useEffect } from 'react';
import Product from './screens/Product';

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
