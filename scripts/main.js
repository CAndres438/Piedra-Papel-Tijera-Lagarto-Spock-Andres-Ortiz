
// Se declaran las variables y Constantes que permiten el funcionamiento general del aplicativo
const elements = ['rock', 'paper', 'scissors', 'lizard', 'spock']; //elementos de selección
const gambitWins = ['scissorspaper', 'paperrock', 'rocklizard', 'lizardspock', 
'spockscissors','rockscissors','scissorslizard', 'lizardpaper', 'paperspock', 'spockrock'];//Victorias posibles
const playerChoice = document.querySelector('.object-choice');//Selector de selección
const pickedObject = document.querySelector('.div-picked');//Selector resultados de selección
const userPickObject = document.querySelector('.user-object-pick');//Selector selección del usuario
const cpuPickObject = document.querySelector('.pc-object-pick');//Selector selección pc
const resultElement = document.querySelector('.result');//Selector Resultado
const resultTitleElement = resultElement.querySelector('.title');//Selector Título
const scoreCountElement = document.querySelector('.score-counter');//Selector de contador de puntaje
let player = "";                //Variable para agergar el elemento seleccionado por el jugador
let computer = "";              //Variable para agregar el elemento seleccionado por la pc a través del random
let gameScore = null;           //Puntaje

//Escucha la ventana para el funcionamiento de la app mediante el click en los selectores
window.addEventListener("load", () => {
    retrieveScoreFromLocalStorage();
    document.querySelectorAll(".object-choice .card").forEach((card) => {
        card.addEventListener("click", (ev) => {
            player = getplayer(ev.target);    //*ev* Valor del elemento seleccionado para que ejecute con el parámetro getPlayer
            computer = getComputerChoice();   //Ejecución de la función de la selección del cpu 
            startGame();                      //Se ejecuta la Función que empieza el juego.
        });
    });
    resultElement.querySelector("button").addEventListener("click", tryAgain);
});
function startGame() {
    calculateWinner(player, computer);      //Se pasan los parametros recibidos al escuchar la selección
    playerChoice.classList.add("hidden");    //Adhiere
    pickedObject.classList.remove("hidden"); //o Remueve la clase hidden para mostrar la selección
    clearResultBeforeAppend();                 //Ejecuta función de vaciado de selecciones
    buildChoiceElement(true, player);          // Ejecuta función de creación de elemento-nueva división con imagen
    buildChoiceElement(false, computer);
}

//Función que retorna mediante un operador ternario la opción si el resultado es un nodo img o si es la división y
//coloca un elemento en indice 1 que pertenece al valor seleccionado elemento ej: scissors
function getplayer(target) {
    return target.nodeName === "IMG" ? target.parentElement.classList[1] :target.classList[1];
}
//Función de generación aleatoria de posición en arreglo elementos para selección pc
function getComputerChoice() {return elements[Math.floor(Math.random() * 5)];}
//Función acciones para ganador, perdedor o empate con condiciones que comparan al pasar parámetros a otra función la aparición
//y actuliza pasando parámetros a otra función que usa el LocalStorage
function calculateWinner(user, comp) {
    if (user === comp) {resultTitleElement.innerText = "Empate";} 
    else if (getUserWinsStatus(user + comp)) {resultTitleElement.innerText = "Tu Ganas";calculateScore(1);} 
    else if (!getUserWinsStatus(user + comp)) {
        if(gameScore!=0){resultTitleElement.innerText = "Tu Pierdes";calculateScore(-1);}
        else{resultTitleElement.innerText = "Tu Pierdes";}
    }
}
//Función que recibe los parámetros de la anterior y compara con las opciones de victoria mediante some la aparición.
// al resultado dado.
function getUserWinsStatus(result) {return gambitWins.some((winStr) => winStr === result);}
function buildChoiceElement(isItUserElement, className) {
    const newE = document.createElement("div");
    newE.classList = [`card ${className}`];
    newE.innerHTML = `<img src="./images/${className}.svg" alt="${className}">`;
    isItUserElement?userPickObject.append(newE) : cpuPickObject.append(newE);
}
//Función que adhiere o remueve clase hidden, funcionando para volver al juego.
function tryAgain() {playerChoice.classList.remove("hidden");pickedObject.classList.add("hidden");}
function clearResultBeforeAppend() {userPickObject.innerHTML = "";cpuPickObject.innerHTML = "";}
//Recibe los parámetros de la función calcular ganador o de borrar para actualizar estado.
function calculateScore(roundResult) {gameScore += roundResult;updateScoreBoard();}
//Local Storage
function retrieveScoreFromLocalStorage() {
    const score = +window.localStorage.getItem("gameScore") || 0;
    gameScore = score;
    updateScoreBoard();
}
function updateScoreBoard() {scoreCountElement.innerText = gameScore;
    window.localStorage.setItem("gameScore", gameScore);
}

//Manipulación modal y botón de reset.
const rulesBtn = document.querySelector(".rules");
const resetBtn = document.querySelector(".reset");
const modalBg = document.querySelector(".modal-bg");
const modal = document.querySelector(".modal");

rulesBtn.addEventListener("click", () => {modal.classList.add("active");modalBg.classList.add("active");});
resetBtn.addEventListener("click", ()=>{calculateScore(-gameScore);})
modalBg.addEventListener("click", (event) => {
    if (event.target === modalBg) {hideModal();}});
document.querySelector(".close").addEventListener("click", hideModal);
function hideModal() {modal.classList.remove("active");modalBg.classList.remove("active");}
