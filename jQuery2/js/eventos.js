var iniciaApp = function()
{
	var banderaAlta=true;
	var validarEntrada = function()
	{			
		//Invalida los eventos que 
		//no corresponden a esta función.	
		event.preventDefault();
		var usuario = $("#txtUsuario").val();
		var clave   = $("#txtClave").val();
		//******** Validaciones **********
		//1.- Que no sean vacíos
		if(usuario == "")
		{
			alert("El usuario no debe ser vacío");
			$("#txtUsuario").focus();
		}
		if(clave == "")
		{
			alert("La clave no debe ser vacía");
			$("#txtClave").focus();
		}
		//2.- Verificar usuario y contraseña
		var parametros="accion=validaEntrada"+
					   "&usuario="+usuario+
					   "&clave="+clave+
					   "&id="+Math.random(); 
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
					$("#alertNoEntra").hide();
					$("nav").show("slow");
					$("#alertEntra").html("<strong> ¡Bienvenido "+usuario+"!</strong>");
					$("#alertEntra").show("slow");
				}
				else
				{					
					$("#alertNoEntra").show("fast");
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
		banderaAlta=true;
		//Ocultamos los alertas en caso que exista alguno
		$(".alert").hide("fast");
		$(".elemBaja").show("fast");
		$("table").hide("fast");
		
		//Mostramos el formulario
		$("#altaUsuarios").show("slow");
		$("#altaUsuarios h2").html("Alta Usuarios");
		//enciendo la funcion de alta usuario
		$("#frmAltaUsuarios").on("submit",AltaUsuario);
		//Apago la función de BajaUsuariao para el 
		//mismo botón
		$("#frmAltaUsuarios").off("submit",BajaUsuario);
	}

	var AltaUsuario = function()
	{
		event.preventDefault();
		//alert($("#frmAltaUsuarios").serialize());
		var datos = $("#frmAltaUsuarios").serialize();

		console.log(datos);
		var parametros = "accion=guardaUsuario&"+datos+
		                 "&id="+Math.random();
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
					$("#alertAltaExito").show("slow");
				}
				else
				{
					$("#alertAltaSinExito").show("slow");
				}
			},
			error: function(xhr,ajax,thrownError){

			}
		});
	}
	var Bajas= function()
	{
		banderaAlta=false;
		$(".alert").hide("fast");
		$(".elemBaja").hide("fast");
		$("table").hide("fast");

		$("#altaUsuarios").show("slow");		
		$("#altaUsuarios h2").html("Baja Usuarios");
		//apago la funcion de alta usuario
		$("#frmAltaUsuarios").off("submit",AltaUsuario);
		//Enciendo la función de BajaUsuariao para el 
		//mismo botón
		$("#frmAltaUsuarios").on("submit",BajaUsuario);
	}
	var BajaUsuario = function(){
		event.preventDefault();
		//alert($("#frmAltaUsuarios").serialize());
		var datos = $("#txtNombreUsuario").val();
		console.log(datos);
		var parametros = "accion=bajaUsuario&"+"usuario="+datos+
		                 "&id="+Math.random();	 

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
					$("#alertBajaSinExito").hide("fast");
					$("#alertBajaExito").show("slow");
				}
				else
				{	
					$("#alertBajaExito").hide("fast");
					$("#alertBajaSinExito").show("slow");
				}
			},
			error: function(xhr,ajax,thrownError){

			}
		});
	}
//AGREGUE
	var LlenarCampos = function(){
		event.preventDefault();
		var datos=$("#frmAltaUsuarios").serialize();
//		var datos = $("#txtNombreUsuario").val();
		
		var parametros = "accion=LlenarCampos&"+datos+
		                 "&id="+Math.random();		              
		$.ajax({
			beforeSend:function(){
				console.log("Trayendo Datos");
			},
			cache: false,
			type: "POST",
			dataType: "json",
			url:"php/funciones.php",
			data:parametros,
			success: function(response){
				if(response.respuesta && !banderaAlta )//¬¬
				{
				
					$("#txtNombreUsuario").val(response.nom);		
					$("#txtClaveUsuario").val(response.cla);
					$("#txtTipoUsuario").val(response.tipo);
					$("#txtDepartamento").val(response.depto);
					$(".elemBaja").slideDown("slow");
				}
				else
				{	
				
				}
			},
			error: function(xhr,ajax,thrownError){

			}
		});
		 console.log(datos);
	}
	var Consultas = function()
	{
		$(".alert").hide("fast");
		$(".elemBaja").hide("fast");
		$("table").show("fast");
		$("#altaUsuarios").hide("fast");

		var parametros = "accion=consultas"+
						 "&id="+Math.random();
		$.ajax({
			beforeSend:function(){
				console.log("Consultas usuarios");
			},
			cache: false,
			type: "POST",
			dataType: "json",
			url:"php/funciones.php",
			data:parametros,
			success:function(response){
				if(response.respuesta){
					$("#tablaConsultas").html(response.tabla);
					$("#consultasUsuarios").show("slow");
				}else{
					alert("Mal");
				}
			},
			error:function(xhr,ajaxOptions,thrownError){
				console.log("Algo salió mal en consultas");
			}
		});
	}

	var Salir= function(){
		location.reload();		
	}
	$("#frmValidaEntrada").on("submit",validarEntrada);
	$("#btnAltas").on("click",Altas);
	$("#frmAltaUsuarios").on("submit",AltaUsuario);
	$("#btnBajas").on("click",Bajas);
	$("#btnSalir").on("click",Salir);
	$("#txtNombreUsuario").on( "focusout", LlenarCampos );
	$("#btnConsultas").on("click",Consultas);
}
$(document).on("ready",iniciaApp);