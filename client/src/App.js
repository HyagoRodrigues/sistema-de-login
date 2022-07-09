import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//pages
import Login from "./componentes/Login";
import Cadastro from "./componentes/Cadastro";
import HomePage from './Pages/HomePage';

import './App.css';

function App(){
  return(
    <Router>
    <Routes>
       <Route path="/" element={<Login />} />
       <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/homepage" element={<HomePage />} />
    </Routes>
  </Router>
  )
}


export default App;
