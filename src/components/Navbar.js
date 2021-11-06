import React, {useState, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const Navbar = () => {
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
            <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
                <div className="container">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <form className="form-inline position-relative d-inline-block my-2">
                            {/* <input className="form-control" type="search" placeholder="Buscar" aria-label="Buscar" /> */}
                            {/* <button className="btn position-absolute btn-search" type="submit"><i className="icon ion-md-search"></i></button> */}
                        </form>
                        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                            <li className="nav-item dropdown">
                                <a className="nav-link text-dark dropdown-toggle" id="navbarDropdown" role="button"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <img src="perfil-mike.jpg" className="img-fluid rounded-circle avatar mr-2" />
                                    {currentUser.email}
                                </a>
                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                    <button className="dropdown-item" onClick={handleLogout} >Cerrar sesión</button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </Fragment>
    );
}

export default Navbar;