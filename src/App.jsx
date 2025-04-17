import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import Header from './components/Header';
import "./App.css"
import HeaderFireBase from "./components/HeaderFireBase";
import { Route, Routes } from "react-router-dom";
import Detail from "./components/Detail";
import { ToastContainer } from "react-toastify";

function App() {
 

  return (
    <>
   <ToastContainer position="top-right" autoClose={3000}/>
    <Routes>
      <Route path="/" element={<HeaderFireBase/>} />
      <Route path="/detail/:id" element={<Detail/>} />
    </Routes>
     
    </>
  )
}

export default App
