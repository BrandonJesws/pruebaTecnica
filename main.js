const userPuntaje_span = document.querySelector('#userPuntaje');
const compPuntaje_span = document.querySelector('#compPuntaje');
const labelUsuario = document.querySelector('#userLabel');
const result_span = document.querySelector('#result span');
const result = document.querySelector('#result');
const userJugada_div = document.querySelector('#userJugada');
const compJugada_div = document.querySelector('#compJugada');
const userJugada_img = document.querySelector('#userJugada img');
const userJugada_span = document.querySelector('#userJugada p span');
const compJugada_img = document.querySelector('#compJugada img');
const compJugada_span = document.querySelector('#compJugada p span');
const linea_div = document.querySelector('#div_conlinea');
const papel = document.querySelector('#papel');
const piedra = document.querySelector('#piedra');
const tijeras = document.querySelector('#tijeras');

let userPuntaje = 0;
let compPuntaje = 0;

papel.addEventListener('click', () => jugar('p'));
piedra.addEventListener('click', () => jugar('r'));
tijeras.addEventListener('click', () => jugar('s'));

function getCompJugada(){
	const jugadas = ['r', 'p', 's'];
	const numeroRandom = Math.floor(Math.random()*3);
	return jugadas[numeroRandom];
}

function mostrarJugadas(userJugada, compJugada){
	const img_jugadaUser = getImagenJugada(userJugada);
	const text_jugadaUser = getTextoJugada(userJugada);
	const img_jugadaComp = getImagenJugada(compJugada);
	const text_jugadaComp = getTextoJugada(compJugada);

	userJugada_img.src = img_jugadaUser;
	userJugada_span.innerHTML = text_jugadaUser;
	compJugada_img.src = img_jugadaComp;
	compJugada_span.innerHTML = text_jugadaComp;
	userJugada_div.classList.remove('ocultar');
	compJugada_div.classList.remove('ocultar');
}

function getImagenJugada(jugada){
	if(jugada === 'r') return "./img/rock.png";
	if(jugada === 'p') return "./img/paper.png";
	if(jugada === 's') return "./img/scissors.png";
}

function getTextoJugada(jugada){
	if(jugada === 'r') return "Piedra";
	if(jugada === 'p') return "Papel";
	if(jugada === 's') return "Tijeras";
}

function ocultarJugadas(){
	userJugada_div.classList.add('ocultar');
	compJugada_div.classList.add('ocultar');
	linea_div.classList.remove('linea');
}

function ganar(){
	userPuntaje++;
	userPuntaje_span.innerHTML = userPuntaje;
	textoResultado("Ganaste");
}

function perder(){
	compPuntaje++;
	compPuntaje_span.innerHTML = compPuntaje;
	textoResultado("Perdiste");
}

function textoResultado(textResultado){
	result_span.innerHTML = textResultado;
	result.classList.remove('ocultar');
}

function jugar(userJugada){
	labelUsuario.classList.add('ocultar');
	const compJugada = getCompJugada();
	mostrarJugadas(userJugada, compJugada);
	setTimeout(()=>{
		ocultarJugadas();
		switch (userJugada + compJugada){
		case "rs":
		case "pr":
		case "sp":
			ganar();
			break;
		case "rr":
		case "pp":
		case "ss":
			textoResultado("Empate");
			break;
		case "sr":
		case "ps":
		case "rp":
			perder();
			break;
		default:
			console.log("Error");
			break;
		}
		setTimeout(()=>{
			labelUsuario.classList.remove('ocultar');
			linea_div.classList.add('linea');
			result.classList.add('ocultar');
		}, 900);
	}, 900);
}