import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; //Importo el context

export const SignUp = () => {
  const { signup } = useAuth(); //Importo la funcion login del context auth
  const [error, setError] = useState(null);
  const [email, setEmail] = useState(''); //state para el input email
  const [password, setPassword] = useState(''); //state para el input email
  const [confirmPassword, setConfirmPassword] = useState(''); //state para el input email

  // History para redirigir
  const history = useHistory();

  // Captura valores input
const handleEmail = (e) => setEmail(e.target.value);
const handlePassword = (e) => setPassword(e.target.value);
const handleConfirmPassword = (e) => setConfirmPassword(e.target.value);

// Funcion para submit
const handleSubmit = async (e) =>{
  e.preventDefault();
  if(password !== confirmPassword ){
    setError('Las contraseñas no coinciden ');
    setTimeout( () => setError(''), 1500);
  }else{
    try {
      await signup(email,password );
      history.push('/');
    } catch (error) {
      setError('Error en el servidor ');
      setTimeout( () => setError(''), 1500);
    }
  }
}

  return (
    
    <div id="login2" className="container">
    <h3 class="text-center text-dark pt-5">Iniciar sesion</h3>
        {error && <div className="alert alert-danger pt-2" role="alert">{ error }</div>}
    <div class="container">
        <div id="login-row" class="row justify-content-center align-items-center">
            <div id="login-column" class="col-md-6">
                <div id="login-box2" class="col-md-12">
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
                            <label for="password" class="text-info">Repita su Contraseña:</label><br/>
                            <input type="password" name="password" id="password" class="form-control " onChange={handleConfirmPassword} />
                        </div>
                        <div class="form-group">
                            <input type="submit" name="submit" class="btn btn-info btn-md" value="Crear cuenta" />
                        </div>
                        <div id="register-link" class="text-right pt-1">
                        <p>  <Link to='/login'>Iniciar sesion</Link> </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}
