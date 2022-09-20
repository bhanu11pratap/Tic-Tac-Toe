
const cells = document.querySelectorAll(".cell");
const display = document.querySelector("#display");
const resetbtn = document.querySelector("#resetbtn");
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameon = false;

startgame();

function startgame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    resetbtn.addEventListener("click", resetgame);
    display.textContent = `${currentPlayer}'s turn`;
    gameon = true;
}
function cellClicked(){
    const cellIndex = this.getAttribute("id");

    if(options[cellIndex] != "" || !gameon){
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}
function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}
function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    display.textContent = `${currentPlayer}'s turn`;
}
function checkWinner(){
    let winner = false;

    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            winner = true;
            break;
        }
    }

    if(winner){
        display.textContent = `${currentPlayer} wins!`;
        gameon = false;
    }
    else if(!options.includes("")){
        display.textContent = `Draw!`;
        gameon = false;
    }
    else{
        changePlayer();
    }
}
function resetgame(){
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    display.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    gameon = true;
}