<?php
//Funciones
//USUARIO CLAVE TIPO DEPTO
function GetSQLValueString($theValue, $theType, $theDefinedValue = "", $theNotDefinedValue = "") 
{
  $theValue = get_magic_quotes_gpc() ? stripslashes($theValue) : $theValue;

  $theValue = function_exists("mysql_real_escape_string") ? mysql_real_escape_string($theValue) : mysql_escape_string($theValue);

  switch ($theType) {
    case "text":
      $theValue = ($theValue != "") ? "'" . $theValue . "'" : "NULL";
      break;    
    case "long":
    case "int":
      $theValue = ($theValue != "") ? intval($theValue) : "NULL";
      break;
    case "double":
      $theValue = ($theValue != "") ? "'" . doubleval($theValue) . "'" : "NULL";
      break;
    case "date":
      $theValue = ($theValue != "") ? "'" . $theValue . "'" : "NULL";
      break;
    case "defined":
      $theValue = ($theValue != "") ? $theDefinedValue : $theNotDefinedValue;
      break;
  }
  return $theValue;
}

function validaEntrada()
{
	$usuario = GetSQLValueString($_POST["usuario"],"text");
	$clave   = GetSQLValueString(md5($_POST["clave"]),"text");
	$respuesta = false;
	//Conecto al servidor de BD
	//Servidor, usuario, clave
	$conexion = mysql_connect("localhost","root","");
	//Seleccionar la BD
	mysql_select_db("cursopw");
	$validar = sprintf("select usuario,clave from usuarios where usuario=%s and clave=%s limit 1",$usuario,$clave);
	$resultado = mysql_query($validar);
	//Preguntamos si se trajo un registro
	if(mysql_num_rows($resultado) > 0)
		$respuesta = true;
	$salidaJSON = array('respuesta' => $respuesta );
	//Devolvemos el resultado al JS
	print json_encode($salidaJSON);
}

function guardaUsuario()
{
	$usuario = GetSQLValueString($_POST["txtNombreUsuario"],"text");
	$clave   = GetSQLValueString(md5($_POST["txtClaveUsuario"]),"text");
	$tipo    = GetSQLValueString($_POST["txtTipoUsuario"],"text");   
	$depto   = GetSQLValueString($_POST["txtDepartamento"],"long");
	$respuesta = false;
	//Conecto al servidor de BD
	//Servidor, usuario, clave
	$conexion = mysql_connect("localhost","root","");
	//Seleccionar la BD
	mysql_select_db("cursopw");
	$guarda = sprintf("insert into usuarios values(%s,%s,%s,%d)",$usuario,$clave,$tipo,$depto);
	// Ejecutamos la consulta
	mysql_query($guarda);
	//Cuantos registros fueron afectados
	if(mysql_affected_rows() > 0)
	{
		$respuesta = true;
	}
	$salidaJSON = array('respuesta' => $respuesta);
	print json_encode($salidaJSON);
}
//Agregue
function LlenarCampos(){
	$respuesta=false;
	$usuario = GetSQLValueString($_POST["txtNombreUsuario"],"text");
	$conexion = mysql_connect("localhost","root","");
	mysql_select_db("cursopw");
	mysql_query("SET NAMES utf8"); //caracteres latinos
	$consulta = sprintf("select * from usuarios where usuario=%s limit 1",$usuario);
	$resconsulta= mysql_query($consulta);
	if(mysql_num_rows($resconsulta)>0){ //para saber si hay datos
		$respuesta= true;

		//rescatar valores
		$fila=mysql_fetch_array($resconsulta);
		//$nom= $fila[1];
		$nom=$fila[0];
		$cla= $fila[1];
		$tipo=$fila[2];
		$depto=$fila[3];
	}

	$salidaJSON = array ('respuesta'=> $respuesta,'nom'=>$nom,'cla'=>$cla,'tipo'=>$tipo,
						 'depto'=>$depto);
	print json_encode ($salidaJSON);
}

function bajaUsuario(){
	$usuario=GetSQLValueString($_POST["usuario"],"text");
	$respuesta=false;
	$conexion=mysql_connect("localhost","root","");
	mysql_select_db("cursopw");
	$baja=sprintf("delete from usuarios where usuario=%s limit 1",$usuario);
	// $update=sprintf("update usuarios set tipousuario=baja where usuario=%s",$usuario);
	mysql_query($baja);
	//el delete update cuantos se afectan
	if(mysql_affected_rows()>0){
		$respuesta=true;
	}
	$salidaJSON=array('respuesta'=>$respuesta);
	print json_encode($salidaJSON);
}
function consultas(){
	$respuesta=false;
	mysql_connect("localhost","root","");
	mysql_select_db("cursopw");
	$consulta="select * from usuarios";
	$resultado=mysql_query($consulta);
	if(mysql_num_rows($resultado)>0)
	{
		$respuesta=true;
		$tabla="<tr><th>Usuario</th><th>Tipo Usuario</th><th>Departamento</th></tr>";
		while($registro=mysql_fetch_array($resultado))
		{
			$tabla.="<tr>";
			$tabla.="<td>".$registro["usuario"]."</td>";
			$tabla.="<td>".$registro["tipo"]."</td>";
			$tabla.="<td>".$registro["depto"]."</td>";
			$tabla.="</tr>";
		}
	}
	$salidaJSON= array('respuesta' => $respuesta, 'tabla' => $tabla);
	print json_encode($salidaJSON);
}

$accion = $_POST["accion"];
//Menú principal
switch ($accion) {
	case 'validaEntrada':
		validaEntrada();
		break;
	case 'guardaUsuario':
		guardaUsuario();
		break;
	case 'LlenarCampos':
		LlenarCampos();
		# code...
		break;
	case 'bajaUsuario':
		bajaUsuario();
			# code...
		break;
	case 'consultas';
		consultas();
	default:
		# code...
		break;
		
//CON EL ENTER MUESTRE DATOS DEL USUARIO
}
?>