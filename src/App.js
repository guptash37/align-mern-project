import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
import Navbaar from './components/Navbaar';
import Home from './components/Home';
import Register from './components/Register';
import Edit from './components/Edit';
import Details from './components/Details';
import {Routes,Route} from "react-router-dom"
import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

function App() {
   const[search,setSearch] = useState("");
    const handesearch =(e)=>{
      setSearch(e.target.value)
    }
  return (
   <>
   
   <Navbaar handesearch={handesearch} />
    <Routes>
      <Route  path="/" element={<Home search={search}/>}  />
      <Route  path="/register" element={<Register/>} />
      <Route  path="/edit/:id" element={<Edit/>} />
      <Route  path="/view/:id" element={<Details/>} />
    </Routes>
   
  
   
   </>
  );
}

export default App;






