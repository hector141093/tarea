//main
var inicio = function(){
	var clicBoton = function(){
		console.log("Clickeaste");
		// $(".anuncioWeb").html("clic del Boton");
		$(".anuncioWeb").append("clic del Boton");
	}
	var clicBoton2 = function(){
		$.ajax({
		  beforeSend:function(){
		  	console.log("Espere un momento por favor...");
		  },

		  url: 'https://randomuser.me/api/',
		  dataType: 'json',
		  success: function(data){ //codigo 200 = OK ¨http¨ manda el data con json y lo entiende literal js
		  console.log(data);
		  // alert(data.results[0].name.first+" "+
		  // data.results[0].name.last);
		//MOSTRAMOS LA INFORMACION EN EL HTML
			$("#fotoPersona").attr("src",data.results[0].picture.large);	
			$("#txtNombreUser").html(data.results[0].name.first);
			$("#txtApellidoUser").html(data.results[0].name.last);	
		  },
		  error:function(xhr,error,throws){ //xhr es el id del proceso
		  	console.log("Ocurrió un error");
		  }
		});
	}
	var teclaUnInput=function(tecla)
	{
			if(tecla.which == 13){
				//QUE SE POSICIONE EN OTRO INPUT
				// $("#unInput").blur();
				$("#otroInput").focus();
			}
			// if($("#otroInput").is(":focus")){
			// 	$("#otroInput").blur();
			// 	$("#unInput").focus();
			// }
	}
	//Preparar los eventos de todos los objetos
	$("#miBoton").off("click",clicBoton);
	$("#miBoton").on("click",clicBoton2);
	$("#unInput").on("keypress",teclaUnInput); 
	//EL EVENTO KEYPRESS SE LLEVA EL ATRIBUTO KEY
}
$(document).on("ready",inicio);