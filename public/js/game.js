// public/js/game.js

const socket = io();

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Load player image
const playerImage = new Image();
playerImage.src = '/images/player.png';

const players = {};

// Listen for game state updates from the server
socket.on('updateGameState', (serverPlayers) => {
    Object.assign(players, serverPlayers);  // Sync players
    render();
});

function render() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw each player
    for (const id in players) {
        const player = players[id];
        ctx.drawImage(playerImage, player.x, player.y, 50, 50);  // Adjust size as needed
    }
}

// Send movement data to the server
document.addEventListener('keydown', (event) => {
    const movement = { up: false, down: false, left: false, right: false };
    if (event.key === 'ArrowUp') movement.up = true;
    if (event.key === 'ArrowDown') movement.down = true;
    if (event.key === 'ArrowLeft') movement.left = true;
    if (event.key === 'ArrowRight') movement.right = true;
    socket.emit('playerMovement', movement);
});
