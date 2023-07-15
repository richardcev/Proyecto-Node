import { useState } from "react";
import "./Login.css"
import { message } from 'antd';


const Register = () =>{
    const [user, setUser]= useState({
        name:"",
        email:"",
        password:""
    })

    const handleSubmit= (e) =>{
        e.preventDefault();
        fetch('http://localhost:3001/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
          })
            .then(response => response.json())
            .then(data => {
                if (data.code === 'OK') {
                    message.success('Registro exitoso');
                  }
              
                console.log(data)
            })
            .catch(err => {
              console.log(err)
            });
    }

    return(
        <div className="login-container">
            <h2 className="titulo">Registrar usuario</h2>
            <form onSubmit={handleSubmit}>
                <div className="field">
                    <label htmlFor="text" >Nombre</label>
                    <input  onChange={(e) =>{
                        setUser({
                            ...user,
                            name: e.target.value
                        })
                    }}
                     required type="text"/>
                </div>
                <div className="field">
                    <label htmlFor="email" >Correo eléctronico</label>
                    <input  onChange={(e) =>{
                        setUser({
                            ...user,
                            email: e.target.value
                        })
                    }}
                     required type="email"/>
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
                    <input type="submit" className="boton" value="Registrar" />
                </div>
            </form>
        </div>
    )
}

export default Register;