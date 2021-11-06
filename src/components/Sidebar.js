import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
// import Dashboard from './Dashboard';
// import ListadoProyectos from '../proyectos/ListadoProyectos';
const Sidebar = () => {
    const { currentUser } = useAuth();
    return (
        <Fragment>
            {currentUser ? 
              <div id="sidebar-container" className="bg-primary">
              <div className="logo">
                  <h4 className="text-light font-weight-bold mb-0 p-2 ">Gestion de usuarios</h4>
              </div>
              <div className="menu">
                  <p   className="d-block text-light pl-5 p-3 border-0"><i className="icon ion-md-apps lead mr-2"></i>
                      <Link to='/dashboard' >Dashboard</Link>  
                  </p>
                  <p  className="d-block text-light pl-5 p-3 border-0"><i className="icon ion-md-people lead mr-2"></i>
                  <Link to='/usuarios'>Usuarios</Link>
                   </p>
              </div>
          </div>
          : null
        }
          
      </Fragment>
      );
}
 
export default Sidebar;