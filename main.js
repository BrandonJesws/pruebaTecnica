const papel = document.querySelector('#papel');
const piedra = document.querySelector('#piedra');
const tijeras = document.querySelector('#tijeras');
const userPuntaje_span = document.querySelector('#userPuntaje');
const compPuntaje_span = document.querySelector('#compPuntaje');
const labelUsuario = document.querySelector('#userLabel');
const linea_div = document.querySelector('#div_conlinea');
const result = document.querySelector('#result');
const userJugada_div = document.querySelector('#userJugada');
const compJugada_div = document.querySelector('#compJugada');

let userPuntaje = 0;
let compPuntaje = 0;

(()=>{
	papel.addEventListener('click', () => jugar('p'));
	piedra.addEventListener('click', () => jugar('r'));
	tijeras.addEventListener('click', () => jugar('s'));
})();

function getCompJugada(){
	const jugadas = ['r', 'p', 's'];
	const numeroRandom = Math.floor(Math.random()*3);
	return jugadas[numeroRandom];
}

function mostrarJugadas(userJugada, compJugada){
	const [userImg, userText] = getImgText(userJugada);
	const [compImg, compText] = getImgText(compJugada);

	userJugada_div.innerHTML =`<img src="${userImg}" alt="${userText}">
							   <p>${userText}</p>`;
	compJugada_div.innerHTML =`<img src="${compImg}" alt="${compText}">
							   <p>${compText}</p>`;
}

function getImgText(jugada){
	if(jugada === 'r') return ["./img/rock.png", "Piedra"];
	if(jugada === 'p') return ["./img/paper.png", "Papel"];
	if(jugada === 's') return ["./img/scissors.png", "Tijeras"];
}

function ocultar(elemento){
	while (elemento.firstChild) {
  		elemento.removeChild(elemento.firstChild);
	}
}

function ocultarJugadas(){
	ocultar(userJugada_div);
	ocultar(compJugada_div);
	linea_div.classList.remove('linea');
}

function textoResultado(textResultado){
	result.innerHTML = `<span>${textResultado}</span>`;
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
			ocultar(result);
			labelUsuario.classList.remove('ocultar');
			linea_div.classList.add('linea');
		}, 900);
	}, 900);
}