import React, { useState, Fragment } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; //Importo el context

export const Login = () => {

  // State
  const [error, setError] = useState(null);
  const { login } = useAuth(); //Importo la funcion login del context auth
  const [email, setEmail] = useState(''); //state para el input email
  const [password, setPassword] = useState(''); //state para el input email

  // Defino los historiales
  const history = useHistory();


  // Captura valores input
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  // funcion al hacer submit(asincrono)
  const handleSubmit = async (e) => {
    e.preventDefault('/');//redirecciono a home
    try {
      await login(email, password); //ejecuto la funcion login
      // Rediru¿igir
      history.push('/')
    } catch (error) {
      //Seteo el error
      setError('Credenciales incorrectas');
      //Quito el mensaje de eror
      setTimeout(() => setError(''), 1500);

    }
  }
  return (
    <Fragment>
      <div id="login" className="container">
        <h3 class="text-center text-dark pt-5">Iniciar sesion</h3>
                        {error && <div className="alert alert-danger" role="alert">{ error }</div>}
        <div class="container">
            <div id="login-row" class="row justify-content-center align-items-center">
                <div id="login-column" class="col-md-6">
                    <div id="login-box" class="col-md-12">
                        <form id="login-form" class="form"  onSubmit={handleSubmit} >
                            <h3 class="text-center text-info">Acceder</h3>
                            <div class="form-group">
                                <label for="username" class="text-info">Correo:</label><br/>
                                <input type="text" name="email" id="email" class="form-control"  onChange={handleEmail} />
                            </div>
                            <div class="form-group">
                                <label for="password" class="text-info">Contraseña:</label><br/>
                                <input type="password" name="password" id="password" class="form-control " onChange={handlePassword} />
                            </div>
                            <div class="form-group">
                                <input type="submit" name="submit" class="btn btn-info btn-md" value="Iniciar Sesion" />
                            </div>
                            <div id="register-link" class="text-right pt-5">
                            <p>¿No tienes una cuenta? <Link to='/signup'>Crear</Link> </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </Fragment>
  )
}

