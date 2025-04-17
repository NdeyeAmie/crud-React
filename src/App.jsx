import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css"
import HeaderFireBase from "./components/HeaderFireBase";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function App() {
 

  return (
    <>
   <ToastContainer position="top-right" autoClose={3000}/>
    <Routes>
      <Route path="/" element={<HeaderFireBase/>} />
    </Routes>
     
    </>
  )
}

export default App
