import { useState,  useContext } from "react"
import { useNavigate, Link } from "react-router-dom";
import "./Login.css"
import { AuthContext } from "../../Context/AuthContext";
import { useEffect } from "react";
import { message } from 'antd';

const Login= () =>{

    const navigate = useNavigate();
    const { login, isAuthenticated } = useContext(AuthContext);
    const [user, setUser]= useState({
        email:"",
        password:""
    })



    const handleSubmit= (e) =>{
        e.preventDefault();
        fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(user),
            withCredentials: true
          })
            .then(response => response.json())
            .then(data => {
              console.log(data)
              if(data.success){
                login()
                navigate('/inicio')
              } else {
                throw new Error('Error de inicio de sesión');
              }
            })
            .catch(err => {
              console.log(err)
              message.error('Ocurrió un error al iniciar sesión. Por favor, inténtalo de nuevo.');
            });
    }

    return(
        <div className="login-container">
            <h2 className="titulo">Iniciar sesión</h2>
            <form onSubmit={handleSubmit}>
                <div className="field">
                    <label htmlFor="text" >Correo eléctronico</label>
                    <input  onChange={(e) =>{
                        setUser({
                            ...user,
                            email: e.target.value
                        })
                    }}
                     required type="text"/>
                </div>
                <div className="field">
                    <label htmlFor="password" className="campo">Contraseña</label>
                    <input  onChange={(e) =>{
                        setUser({
                            ...user,
                            password: e.target.value
                        })
                    }}
                    type="password" required/>
                </div>
                <div className="submit">
                    <input type="submit" className="boton" value="Ingresar" />
                </div>
                <div>
                <p>¿No tienes una cuenta?<Link to="/register"> Regístrate aquí</Link></p>
                </div>
            </form>
        </div>
    )
}

export default Login