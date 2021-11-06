<?php
 
include 'bd/BD.php';

header('Access-Control-Allow-Origin: *');

if($_SERVER['REQUEST_METHOD']=='GET'){
    if(isset($_REQUEST['id'])){
        $query="select * from usuarios where id=".$_REQUEST['id'];
        $resultado=metodoGet($query);
        echo json_encode($resultado->fetch(PDO::FETCH_ASSOC));
    }else{
        $query="select * from usuarios ";
        $resultado=metodoGet($query);
        echo json_encode($resultado->fetchAll()); 
    }
    header("HTTP/1.1 200 OK");
    exit();
}

if($_REQUEST['METHOD']=='POST'){
    unset($_REQUEST['METHOD']);
    $nombre=$_REQUEST['nombre'];
    $apellido=$_REQUEST['apellido'];
    $edad=$_REQUEST['edad'];
    $direccion=$_REQUEST['direccion'];
    $usuario=$_REQUEST['usuario'];
    $pass=$_REQUEST['pass'];
    $query="insert into `usuarios`(`nombre`, `apellido`, `edad`, `direccion`, `usuario`, `pass`) values ('$nombre', '$apellido', '$edad', '$direccion', '$usuario', '$pass')";
    $queryAutoIncrement="select MAX(id) as id from usuarios";
    $resultado=metodoPost($query, $queryAutoIncrement);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

if($_REQUEST['METHOD']=='PUT'){
    unset($_REQUEST['METHOD']);
    $id=$_REQUEST['id'];
    $nombre=$_REQUEST['nombre'];
    $apellido=$_REQUEST['apellido'];
    $edad=$_REQUEST['edad'];
    $direccion=$_REQUEST['direccion'];
    $usuario=$_REQUEST['usuario'];
    $pass=$_REQUEST['pass'];
    $query="UPDATE usuarios SET nombre='$nombre', apellido='$apellido', edad='$edad', direccion='$direccion', usuario='$usuario', pass='$pass' WHERE id='$id'";
    $resultado=metodoPut($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

if($_REQUEST['METHOD']=='DELETE'){
    unset($_REQUEST['METHOD']);
    $id=$_REQUEST['id'];
    $query="DELETE FROM usuarios WHERE id='$id'";
    $resultado=metodoDelete($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

header("HTTP/1.1 400 Bad Request");


?>