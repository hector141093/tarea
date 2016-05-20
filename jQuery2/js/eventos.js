var iniciaApp = function()
{
	var validarEntrada = function()
	{			
		//Invalida los eventos que 
		//no corresponden a esta función.	
		event.preventDefault();
		var datos= $("#frmValidaEntrada").serialize();

		//var usuario = $("#txtUsuario").val();
		//var clave   = $("#txtClave").val();
		//******** Validaciones **********
		//1.- Que no sean vacíos
		
		if(($("#txtUsuario").val()) == "")
		{
			alert("El usuario no debe ser vacío");
			$("#txtUsuario").focus();
		}
		if(($("#txtClave").val()) == "")
		{
			alert("La clave no debe ser vacía");
			$("#txtClave").focus();
		}
		//2.- Verificar usuario y contraseña
		//var parametros="accion=validaEntrada"+
		//			   "&usuario="+usuario+
		//			   "&clave="+clave+
		//			   "&id="+Math.random(); 
		var parametros="accion=validaEntrada&"+datos
						+"&id="+Math.random();
						console.log(datos);
		$.ajax({
			beforeSend:function(){
				console.log("Validar al usuario");
			},
			cache: false,
			type: "POST",
			dataType: "json",
			url:"php/funciones.php",
			data:parametros,
			success: function(response){
				if(response.respuesta == true) //¬¬
				{
					$("#datosUsuario").hide();
					$("nav").show("slow");
				}
				else
				{
					alert("Usuario/contraseña incorrecto(s)");
				}
			},
			error: function(xhr,ajaxOptions,thrownError){
				console.log("Algo salió mal");
			}
		});
		console.log("Se disparó el submit");
	}

	var Altas = function()
	{
		//Mostramos el formulario
		$("#bajaUsuarios").hide("slow");
		$("#altaUsuarios").show("slow");
	}

	var AltaUsuario = function()
	{
		event.preventDefault();
		alert($("#frmAltaUsuarios").serialize());
		var usuario=$("#txtNombreUsuario").val();
		var clave=$("#txtClaveUsuario").val();
		var tipoU=$("#txtTipoUsuario").val();
		var datos = $("#frmAltaUsuarios").serialize();
		
		var parametros = "accion=guardaUsuario&"+datos+
		                 "&id="+Math.random();

		 var parametrosSINSER= "accion=guardaUsuario"+
		 					"&nombrepersona="+usuario+
		 					"&contrasena="+clave+
		 					"&tipodeusuario="+tipoU;
		 console.log(parametros);
		console.log(parametrosSINSER);
		$.ajax({
			beforeSend:function(){
				console.log("Guardar al usuario");
			},
			cache: false,
			type: "POST",
			dataType: "json",
			url:"php/funciones.php",
			data:parametros,
			success: function(response){
				if(response.respuesta == true )//¬¬
				{
					alert("Usuario registrado correctamente");
				}
				else
				{
					alert("No se pudo guardar la información");
				}
			},
			error: function(xhr,ajax,thrownError){

			}
		});
	}
	var Bajas= function(){
		$("#altaUsuarios").hide("slow");
		$("#bajaUsuarios").show("slow");
	}
	var BajaUsuario= function(){
		var usuario=$("#txtUsuario").val();
		var parametros= "accion=bajaUsuario"+
						"&usuario="+usuario+
						"&id="+Math.random();//cuestiones de la caché
		$.ajax({
			beforeSend:function(){
				alert("Hola ajax");
			},
			cache: false,
			type: "POST",
			dataType: "json",
			url:"php/funciones.php",
			data:parametros,
			success: function(response){
				if(response.respuesta == true) //¬¬
				{
					alert("usuario eliminado satisfactoriamente!!");
				}
				else
				{
					alert("Usuario no se pudo eliminar")
				}
			},
			error: function(xhr,ajaxOptions,thrownError){
				console.log("Algo salió mal en las bajas");
			}
		});
	}

	$("#frmValidaEntrada").on("submit",validarEntrada);
	$("#btnAltas").on("click",Altas);
	$("#frmAltaUsuarios").on("submit",AltaUsuario);
	$("#btnBajas").on("click",Bajas);
	$("#frmBajaUsuarios").on("submit",BajaUsuario);
}
$(document).on("ready",iniciaApp);
