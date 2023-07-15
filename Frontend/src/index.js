import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './Components/header/header';
import Login from './Components/users/Login';
import Register from './Components/users/Register';
import { AuthProvider } from './Context/AuthContext';
import ProtectedPrincipal from './Components/ProtectedPrincipal';


ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
  <BrowserRouter>
      <Header/>
      <Routes>
          <Route path='/' element={ <App />}></Route>
          <Route path='/inicio' element={ <ProtectedPrincipal />}></Route>
          <Route path='/login' element= {<Login />}></Route>
          <Route path='/register' element= {<Register />}></Route>

      </Routes>
  </BrowserRouter>
  </AuthProvider>
  
);
