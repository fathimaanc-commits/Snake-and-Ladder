const gameBoard = document.getElementById('game-board');
const rollDiceBtn = document.getElementById('roll-dice-btn');
const diceResult = document.getElementById('dice-result');
const turnIndicator = document.getElementById('turn-indicator');
const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');

const boardSize = 100;
const snakes = { 16: 6, 47: 26, 49: 11, 56: 53, 62: 19, 64: 60, 87: 24, 93: 73, 95: 75, 98: 78 };
const ladders = { 1: 38, 4: 14, 9: 31, 21: 42, 28: 84, 36: 44, 51: 67, 71: 91, 80: 100 };

let player1Position = 0;
let player2Position = 0;
let currentPlayer = 1;

function createBoard() {
    for (let i = 1; i <= boardSize; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.textContent = i;
        if (snakes[i]) {
            cell.classList.add('snake');
        }
        if (ladders[i]) {
            cell.classList.add('ladder');
        }
        gameBoard.appendChild(cell);
    }
}

function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

function movePlayer(player, position) {
    const row = Math.floor((position - 1) / 10);
    const col = (position - 1) % 10;
    const x = col * 60 + 15;
    const y = 540 - row * 60 + 15;
    player.style.left = `${x}px`;
    player.style.top = `${y}px`;
}

function switchTurn() {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    turnIndicator.textContent = `Player ${currentPlayer}'s Turn`;
}

rollDiceBtn.addEventListener('click', () => {
    const dice = rollDice();
    diceResult.textContent = `Dice: ${dice}`;

    if (currentPlayer === 1) {
        player1Position += dice;
        if (player1Position > 100) player1Position = 100;
        if (snakes[player1Position]) player1Position = snakes[player1Position];
        if (ladders[player1Position]) player1Position = ladders[player1Position];
        movePlayer(player1, player1Position);
        if (player1Position === 100) {
            alert('Player 1 Wins!');
            rollDiceBtn.disabled = true;
        }
    } else {
        player2Position += dice;
        if (player2Position > 100) player2Position = 100;
        if (snakes[player2Position]) player2Position = snakes[player2Position];
        if (ladders[player2Position]) player2Position = ladders[player2Position];
        movePlayer(player2, player2Position);
        if (player2Position === 100) {
            alert('Player 2 Wins!');
            rollDiceBtn.disabled = true;
        }
    }

    switchTurn();
});

createBoard();
