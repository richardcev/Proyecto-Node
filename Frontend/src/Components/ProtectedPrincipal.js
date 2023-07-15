import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Principal from './Principal';
import { AuthContext } from '../Context/AuthContext';

const ProtectedPrincipal = () => {
    const { login, logout, isAuthenticated } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [email, setEmail] = useState('')
  
    useEffect(() => {
      checkAuthentication();
    }, []);
  
    const checkAuthentication = () => {
      fetch('http://localhost:3001/api/user/email', {
        method: 'GET',
        credentials: 'include'
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.email) {
            login()
            setEmail(data.email)
          } else {
            logout()
          }
          setIsLoading(false); 
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false); 
        });
    };
  
    if (isLoading) {
      return <p>Cargando...</p>; 
    }
  
    return isAuthenticated ? <Principal name= {email} /> : <Navigate to="/login" replace />;
  };
  

export default ProtectedPrincipal;