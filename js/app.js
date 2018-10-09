// The Enemy Class for instatiating the enemies with their initial locations and speeds.
class Enemy {
    constructor(n) {
        this.sprite = 'images/enemy-bug.png';
        this.x = 0;
        this.y = n * 95 + 40;
        this.n = n;
        this.width = 80;
        this.height = 80;
    }
    // Upadte method to change the position of enemies on the board
    update(dt) {
        this.x += dt * ((4 - this.n));
        ctx.drawImage(Resources.get(this.sprite), (this.x), this.y);
        if (this.x > 101 * 5) {
            this.x = 0;
        }
    }
    // Method to render the postions
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}
// Player Class to instatiate the Players in the game and set their initial Values. 
class Player {
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.x = 101 * 2;
        this.y = 83 * 5;
        this.width = 80;
        this.height = 80;
        this.winCount = document.querySelector('#winCount').nodeValue || 0;
        this.movCount = document.querySelector('#movCount').nodeValue || 0;
    }
    // Method to take the User Input and accordingly move the Player.
    handleInput(code) {
        if (code === 'left') {
            this.x -= 100;
            ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
            document.querySelector('#movCount').textContent = ++this.movCount;
        }
        if (code === 'right') {
            ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
            this.x += 100;
            document.querySelector('#movCount').textContent = ++this.movCount;
        }
        if (code === 'up') {
            this.y -= 90;
            ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
            document.querySelector('#movCount').textContent = ++this.movCount;
        }
        if (code === 'down') {
            this.y += 90;
            ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
            document.querySelector('#movCount').textContent = ++this.movCount;
        }
    }
    // Method to render the Player Postions
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    // Method to check for errors in Player postions and to correct them.
    update() {
        if (this.x < 0) {
            this.x = 101 * 4 - 1;
        }
        if (this.x > 101 * 4) {
            this.x = 0;
        }
        if (this.y > 83 * 5) {
            this.y = 83 * 5;
        }
        if (this.y < 0) {
            this.y = 83 * 5;
            swal({
                type: 'success',
                title: 'You Win!!',
                text: 'You have good timings',
            })
            document.querySelector('#winCount').textContent = ++this.winCount;
        }
    }
}
let enemy1 = new Enemy(0);
let enemy2 = new Enemy(1);
let enemy3 = new Enemy(2);
let enemy4 = new Enemy(3);
let allEnemies = [enemy1, enemy2, enemy3, enemy4];
let player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});