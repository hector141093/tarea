//main
var inicio = function(){

	var miurl='http://gateway.marvel.com/v1/public/characters?ts=1&apikey=917a152f0e410214e0bec334a3bf6128&hash=64c0db5c2d22a1c31bf436e4ecc37edd&nameStartsWith=';
		
		
	var clicBoton = function(){
		$("#tablaHeroes").html("");
		var nom=$("#txtVariable").val();
		//console.log(nom);
		var nvaurl=miurl+nom;
		 
		$.ajax({
				  beforeSend:function(){
				  	console.log("Espere un momento por favor...");
				  },
				  url:nvaurl,  //falta space -%20
				  dataType: 'json',
				  success: function(obj){ //codigo 200 = OK ¨http¨ manda el data con json y lo entiende literal js
				  console.log(obj);
				  console.log(obj.data.results);
				  console.log(nvaurl);
				var renglon = "<tr><th>name</th><th>description</th><th>Image</th><th>Comics</th>";
		       		 $('#tablaHeroes').append(renglon);
		        		renglon='';		      
		        		//obj.data.results=heroes		        	
		        $.each(obj.data.results, function (heroes, heroe ) {
		            renglon += '<tr><td>' + heroe.name 
		            		+ '</td><td>' + heroe.description 
		            		+ '</td><td class="imgSuper">' + "<img class='imgSuper' src='"+heroe.thumbnail.path+'.'+heroe.thumbnail.extension +"' width=150px>"		            				    
			    			+ '</td>'+'<td>';
			    			$.each(heroe.comics.items,function(comics,comic){	
			    				renglon+= comic.name +', ';		    		
				    			console.log(comic.name);			    					    			
			    			});
			    			renglon+='</td></tr>';
			    			
		    	});

		        $('#tablaHeroes').append(renglon);
				  },
				    error:function(xhr,error,throws){ //xhr es el id del proceso
				  	console.log("Ocurrió un error");
				  },
		});		
	}

	$("#btnGenera").on("click",clicBoton);
	$("#btnGenera").attr('title', 'Busca superhéroe...');
}
$(document).on("ready",inicio);


