import React, { useState, Fragment } from 'react'
import { useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
//Sidebar 
// import Usuarios  from './Usuarios';
import Navbar  from './Navbar';
export const Home = () => {
  // States
  const { currentUser, logout } = useAuth();

  const history = useHistory();
  const [error, setError] = useState('');

  const handleLogout = async () => {
    try {
      await logout();
      history.push('/login');
    } catch (error) {
      setError('Server Error')
    }
  }

  return (
    <Fragment>
                 <div className="w-100">

<Navbar/> 
    <div id="content" className="bg-grey w-100">
        <section className="bg-light py-3">
            <div className="container">
                <div className="row">
                    <div className="col-lg-9 col-md-8">
                        <h1 className="font-weight-bold mb-0">Sistema gestor de usuarios  </h1>
                        <p className="lead text-muted">Administra tus usuarios</p>
                    </div>
                </div>
            </div>
        </section>
        <section className="bg-mix py-3">
            <div className="container">
                <div className="card rounded-0">
                    <div className="card-body">
                    <div class="jumbotron">
<h1 class="display-4">Hola, Bienvenido!</h1>
<p class="lead">Sistema creado para administrar  usuarios</p>
<p class="lead"><b>Las funcionalidades son:</b></p>
<hr class="my-4"/>
<ul>
<li>Listar usaurios</li>
<li>Crear usaurio</li>
<li>Editar usuario</li>
<li>Borrar usuarios</li>
<li>Detalle usuarios</li>
</ul>
<p class="lead">

</p>
</div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</div>
    </Fragment>
  )
}
