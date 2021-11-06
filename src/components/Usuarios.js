import React, { Fragment, useState , useEffect} from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import axios from 'axios';
import Navbar  from './Navbar';
import { db } from '../firebase';

const Usuarios = () => {
    const baseUrl = "http://localhost/gestionusuarios/";

  //estados
  const [data, setData] = useState([]);
  // Estado para la ventana modal
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  // Estados usuarios
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState({
    id:'',
    nombre: '',
    apellido: '',
    edad: '',
    direccion : '',
    usuario : '',
    pass : ''
  });
const handleChange= (e) =>{
  const {name, value} = e.target;
  setUsuarioSeleccionado((prevState)=>({
      ...prevState,
      [name]: value
  }));
  // console.log(usuarioSeleccionado);
}
  // Metodo para controlar el modal
  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar)
  }
  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar)
  }

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar)
  }
  // PETICIONES
  const peticionGet = async () => {
    await axios.get(baseUrl)
      .then(response => {
        // console.log(response.data)
        setData(response.data);
      }).catch(error =>{
        console.log(error)
      })
  }
  // Firebase
  // const obtenerUsuarioFirebase = async () =>{
  //     const queryDatos = await db.collection('usuarios').get();
  //     queryDatos.forEach(doc => {

  //       console.log(doc.data().id);
  //     })
  // }

// Usuario seleccionado
const seleccionarUsuario=(usuario, caso)=>{
  setUsuarioSeleccionado(usuario);
  (caso==="editar") ?
   abrirCerrarModalEditar()
  :
  abrirCerrarModalEliminar() ;
}
  //Peticion Post
  const peticionPost = async () => {
    var form = new FormData();
    form.append('nombre', usuarioSeleccionado.nombre);
    form.append('apellido', usuarioSeleccionado.apellido);
    form.append('edad', usuarioSeleccionado.edad);
    form.append('direccion', usuarioSeleccionado.direccion);
    form.append('usuario', usuarioSeleccionado.usuario);
    form.append('pass', usuarioSeleccionado.pass);
    form.append('METHOD', 'POST');
    await axios.post(baseUrl, form)
      .then(response => {
        // Inserta en mysql
        setData(data.concat(response.data));
        // Inserta en firebase
        insertFirestore(response.data);
        // Cierro el modal
        abrirCerrarModalInsertar();
      }).catch(error =>{
        console.log(error)
      })
  }
  // Inserta en firebase(base de datos espejo)
  const insertFirestore = async (datos) =>{
    await db.collection('usuarios').doc().set(datos);
  };

  // Peticion PUT
    const peticionPut = async () => {
      var form = new FormData();
      form.append('nombre', usuarioSeleccionado.nombre);
      form.append('apellido', usuarioSeleccionado.apellido);
      form.append('edad', usuarioSeleccionado.edad);
      form.append('direccion', usuarioSeleccionado.direccion);
      form.append('usuario', usuarioSeleccionado.usuario);
      form.append('pass', usuarioSeleccionado.pass);
      form.append('METHOD', 'PUT');
      await axios.post(baseUrl, form, {params: {id :usuarioSeleccionado.id }} )
        .then(response => {
          //Gestiono el cambio de estado
          var dataNueva = data;
          dataNueva.map(usuario => {
            if(usuario.id===usuarioSeleccionado.id){
              usuario.nombre = usuarioSeleccionado.nombre;
              usuario.apellido = usuarioSeleccionado.apellido;
              usuario.edad = usuarioSeleccionado.edad;
              usuario.direccion = usuarioSeleccionado.direccion;
              usuario.usuario = usuarioSeleccionado.usuario;
              usuario.pass = usuarioSeleccionado.pass;
            }
          });
          setData(dataNueva);
          actualizarFirebase(usuarioSeleccionado.id, response.data );
       
          //Abro el modal
          abrirCerrarModalEditar();
        }).catch(error =>{
          console.log(error)
        })
    }
    // Actualizar firestore
    const actualizarFirebase = async (indice, datos) => {
      const queryDatos = await db.collection('usuarios').get();
      queryDatos.forEach(doc => {
        if(doc.data().id  == indice ){
          var codigo = doc.id;
          // console.log(doc.id);
          db.collection('usuarios').doc(codigo).update(datos);
        }
      })
    }

    // Peticion delete
    const peticionDelete = async () => {
      var formulario = new FormData();
      formulario.append('METHOD', 'DELETE');
      await axios.post(baseUrl, formulario, {params: {id :usuarioSeleccionado.id } })
        .then(response => {
          // console.log(formulario);
          setData(data.filter(usuario => usuario.id !== usuarioSeleccionado.id ));
          // Elimino de firestore(base de datos espejo)
          deleteFirestore(usuarioSeleccionado.id)
          // console.log(usuarioSeleccionado.id);
          abrirCerrarModalEliminar();
        }).catch(error =>{
          console.log(error)
        })
    }
    // Elimina el registro en firebase
    const deleteFirestore = async (identificador) => {
          const queryDatos = await db.collection('usuarios').get();
      queryDatos.forEach(doc => {
        if(doc.data().id  == identificador ){
          var codigo = doc.id;
          // console.log(doc.id);
          db.collection('usuarios').doc(codigo).delete();
        }
      })
    }

  // USe effect funciona como el docReady
  useEffect(() => {
    peticionGet();
  }, [])


    return (
        <Fragment>
            <div className="w-100">
            <Navbar/> 
                <div id="content" className="bg-grey w-100">
                    <section className="bg-light py-3">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-9 col-md-8">
                                    <h1 className="font-weight-bold mb-0">Sistema gestor de usuarios </h1>
                                    <p className="lead text-muted">Administra los usuarios </p>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="bg-mix py-3">
                        <div className="container">
                            <div className="card rounded-0">
                                <div className="card-body">
                                <div className="App">
      <div className="container">
        <div className="row" >
          <div className="col-12">
            <button type="button " className="btn btn-primary my-4" onClick={() => abrirCerrarModalInsertar()} >Nuevo</button>
          </div>
        </div>
        <table className="table table-striped" >
          <thead>
            <tr>
              <th>ID</th>
              <th>Usuario</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Edad</th>
              <th>Direccion</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map(usuario => (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.usuario}</td>
                <td>{usuario.nombre}</td>
                <td>{usuario.apellido}</td>
                <td>{usuario.edad}</td>
                <td>{usuario.direccion}</td>
                <td>
                  <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-success" onClick={()=>seleccionarUsuario(usuario, 'editar')}>Editar</button>
                    <button type="button" className="btn btn-danger" onClick={()=>seleccionarUsuario(usuario, 'eliminar')} >Eliminar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* MODAL NUEVO USUARIO */}
      <Modal isOpen={modalInsertar}>
        <ModalHeader>Insertar un usuario</ModalHeader>
        <ModalBody>
          <form>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="nom">Nombre</label>
                <input name="nombre" type="text" class="form-control" id="nom" onChange={handleChange} />
              </div>
              <div class="form-group col-md-6">
                <label for="ape">Apellido</label>
                <input name="apellido" type="text" class="form-control" id="ape" onChange={handleChange} />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="ed">Edad</label>
                <input name="edad" type="number" class="form-control" id="ed" onChange={handleChange} />
              </div>
              <div class="form-group col-md-6">
                <label  for="dir">Direccion</label>
                <input name="direccion" type="text" class="form-control" id="direccion" onChange={handleChange} />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="usu">Usuario</label>
                <input name="usuario"  type="text" class="form-control" id="usu" onChange={handleChange} />
              </div>
              <div class="form-group col-md-6">
                <label for="con">Contraseña</label>
                <input name="pass" type="password" class="form-control" id="con" onChange={handleChange} />
              </div>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <button type="button" className="btn btn-primary" onClick={() => peticionPost()}>Guardar</button>
          <button type="button" className="btn btn-secondary" onClick={() => abrirCerrarModalInsertar()} >Cerrar</button>
        </ModalFooter>
      </Modal>

      {/* MODAL EDITAR USUARIO */}
      <Modal isOpen={modalEditar}>
        <ModalHeader>Editar un usuario</ModalHeader>
        <ModalBody>
          <form>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="nom">Nombre</label>
                <input name="nombre" type="text" class="form-control" id="nom" onChange={handleChange} value={usuarioSeleccionado.nombre} />
              </div>
              <div class="form-group col-md-6">
                <label for="ape">Apellido</label>
                <input name="apellido" type="text" class="form-control" id="ape" onChange={handleChange} value={usuarioSeleccionado.apellido} />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="ed">Edad</label>
                <input name="edad" type="number" class="form-control" id="ed" onChange={handleChange} value={usuarioSeleccionado && usuarioSeleccionado.edad} />
              </div>
              <div class="form-group col-md-6">
                <label  for="dir">Direccion</label>
                <input name="direccion" type="text" class="form-control" id="direccion" onChange={handleChange} value={usuarioSeleccionado && usuarioSeleccionado.direccion} />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="usu">Usuario</label>
                <input name="usuario"  type="text" class="form-control" id="usu" onChange={handleChange} value={usuarioSeleccionado && usuarioSeleccionado.usuario} />
              </div>
              <div class="form-group col-md-6">
                <label for="con">Contraseña</label>
                <input name="pass" type="password" class="form-control" id="con" onChange={handleChange} value={usuarioSeleccionado && usuarioSeleccionado.pass} />
              </div>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <button type="button" className="btn btn-primary" onClick={() => peticionPut()}>Guardar</button>
          <button type="button" className="btn btn-secondary" onClick={() => abrirCerrarModalEditar()} >Cerrar</button>
        </ModalFooter>
      </Modal>

      {/* MODAL ELIMINAR */}
      <Modal isOpen={modalEliminar}> 
        <ModalBody>
        ¿Estas seguro que deseas eliminar el usuario { usuarioSeleccionado && usuarioSeleccionado.nombre }  ?
        </ModalBody>
        <ModalFooter>
          <button type="button" className="btn btn-danger" onClick={() => peticionDelete()}>Si</button>
          <button type="button" className="btn btn-secondary" onClick={() => abrirCerrarModalEliminar()} >Cerrar</button>
        </ModalFooter>
      </Modal>
    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </Fragment>
    );
}

export default Usuarios;