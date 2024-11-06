// public/js/game.js

const socket = io();

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Load player images (head, backpack, body, arms)
const headImage = new Image();
headImage.src = '/images/head.png';

const backpackImage = new Image();
backpackImage.src = '/images/backpack.png';

const bodyImage = new Image();
bodyImage.src = '/images/body.png';

const armsImage = new Image();
armsImage.src = '/images/arms.png';

const players = {};

// Listen for game state updates from the server
socket.on('updateGameState', (serverPlayers) => {
    Object.assign(players, serverPlayers);  // Sync players
    render();
});

function render() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw each player (with body parts)
    for (const id in players) {
        const player = players[id];

        // Draw the body first
        ctx.drawImage(bodyImage, player.x, player.y, 50, 100);  // Adjust size as needed

        // Draw the backpack (slightly above the body)
        ctx.drawImage(backpackImage, player.x, player.y - 20, 50, 50);  // Adjust size/position

        // Draw the head (at the top of the body)
        ctx.drawImage(headImage, player.x, player.y - 40, 50, 50);  // Adjust size/position

        // Draw the arms (slightly to the side of the body)
        ctx.drawImage(armsImage, player.x - 20, player.y, 50, 50);  // Adjust size/position
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
