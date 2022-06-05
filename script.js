	var palabras = ["ARQUITECTURA", "MONASTERIO", "CANTIMPLORA", "MOTOCICLETA", "COMPUTADORA", "INGREDIENTE", "BALONCESTO", "CIRCUNFERENCIA", "ZAPATILLAS", "CENICERO", "ESTRATEGIA", "CONOCIMIENTO", "VACACIONES", "CONFERENCIA", "ESCOBA", "ESPUMA", "PALMERA", "PANTERA", "CASCADA", "CANDADO", "TORNILLO", "CHAQUETA", "CHALECO", "JARABE", "TERRENO", "BARRIGA", "CEREZA", "LLAMADA", "PAYASO", "CUCHILLO", "MEDALLA", "LECHUGA"];

	var palabra;

	var palabraSecreta;

	var errores;

	var letrasIncorrectas = [];

	//selecciona palabra aleatoria de palabras
	function seleccionPalabra() {
		palabra = palabras[Math.floor(Math.random()*palabras.length)];
	}

	//todo lo que sucede al presionar Iniciar juego
	function iniciarJuego() {
		seleccionPalabra();

		//establece la cantidad de errores permitidos
		errores = 8;

		//habilita el botón Intentar por si se reinició el juego
		chequear.disabled = false;

		//crea la palabra secreta reemplazando cada carácter por _ separado por un espacio
		palabraSecreta = palabra.replace(/./g, "_ ");

		//muestra la palabra con _ en pantalla
		document.querySelector("#output").innerHTML = palabraSecreta;

		//muestra el juego del ahorcado 
		document.getElementById("zonaJuego").style.display = "block";

		//establece en pantalla 8 errores disponibles 
		document.querySelector("#erroresRest").innerHTML = "Errores Restantes: " + errores;

		//muestra la imagen del ahorcado en la posición cero
		document.querySelector("#ahorcado").style.backgroundPosition = 0;

		//cambia el valor del boton Iniciar juego a Reiniciar Juego
		document.querySelector("#iniciar").innerHTML = "Reiniciar juego";

		//inhabilita botón de agregar palabras mientras se juega
		agregar.disabled = true;

		//ubica en el input listo para ingresar letra
		document.querySelector("#letra").focus();

		//establece en cero el array de letras incorrectas
		letrasIncorrectas = [];

		//de esta forma limpiamos las letras incorrectas en pantalla, por si se reinicia el juego
		document.querySelector("#errorLetras").innerHTML = letrasIncorrectas;

	}


	//función no nativa de js para reemplazar carácteres en un índice específico
	String.prototype.replaceAt=function(index, character) { return this.substr(0, index) + character + this.substr(index+character.length); }


	//no permite ingresar números ni carácteres especiales (reemplaza por "")
	document.getElementById("letra").addEventListener("input", (e) => {
  		let value = e.target.value;
  		e.target.value = value.replace(/[\d\W_]/g, "");
		});
		


	//evento al presionar el botón Intentar
	document.querySelector("#chequear").addEventListener("click", () => {

		//toma el valor ingresado y lo vuelve a mayúscula
		const letra = document.querySelector("#letra").value.toUpperCase();

		//variable para evaluar si es correcto o falló
		var fallo = true;
		
		
		//un for que recorre cada carácter de la palabra y reemplaza si es correcta la letra ingresada
		for (const i in palabra) {
			if (letra == palabra[i]) {
				palabraSecreta = palabraSecreta.replaceAt(i*2, letra);
				fallo = false;
			}
		}
		if (fallo == true) {
			errores = errores - 1;
			document.querySelector("#erroresRest").innerHTML = "Errores Restantes: " + errores;
			if (errores == 0) {
				alert("Perdiste ! Fin del juego. La palabra secreta era: " + palabra);
				chequear.disabled = true;
			}
			document.querySelector("#ahorcado").style.backgroundPosition = (350*(errores+1)) + "px 0";
			letrasIncorrectas.push(letra);
			document.querySelector("#errorLetras").innerHTML = letrasIncorrectas;
		}
		else {
			if(/_/.test(palabraSecreta) == false) {
				alert("Ganaste ! Fin del juego.")
				chequear.disabled = true;
			}
		}
		document.querySelector("#output").innerHTML = palabraSecreta;
		document.querySelector("#letra").value = "";
		document.querySelector("#letra").focus();
	});