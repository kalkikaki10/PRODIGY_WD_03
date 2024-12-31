// Game State Variables
const board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

// Winning Combinations
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Select DOM Elements
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");

// Event Listeners
cells.forEach((cell, index) => {
    cell.addEventListener("click", () => makeMove(index));
});
resetButton.addEventListener("click", resetGame);

// Make a Move
function makeMove(index) {
    if (board[index] !== "" || !gameActive) return;

    board[index] = currentPlayer;
    cells[index].innerText = currentPlayer;

    if (checkWinner()) {
        statusText.innerText = `Player ${currentPlayer} Wins!`;
        gameActive = false;
        return;
    }

    if (board.every(cell => cell !== "")) {
        statusText.innerText = "It's a Draw!";
        gameActive = false;
        return;
    }

    switchPlayer();
}

// Switch Players
function switchPlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.innerText = `Player ${currentPlayer}'s Turn`;
}

// Check for a Winner
function checkWinner() {
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

// Reset the Game
function resetGame() {
    board.fill("");
    gameActive = true;
    currentPlayer = "X";
    statusText.innerText = "Player X's Turn";

    cells.forEach(cell => {
        cell.innerText = "";
        cell.style.backgroundColor = "#ecf0f1";
    });
}
