let canvas = document.querySelector("canvas");
let c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
};


var colors = [
	'#0C0F0A',
	'#FF206E',
	'#FBFF12',
    '#41EAD4',
    '#FFFFFF'
];

let friction = 0.88;
let gravity = 1;


// Event Listeners
addEventListener("mousemove", function(event) {
	mouse.x = event.clientX;
	mouse.y = event.clientY;
});

addEventListener("resize", function() {
	canvas.width = innerWidth;	
	canvas.height = innerHeight;
  init();
});

addEventListener("click", function(event) {
    init();
});



// Utility Functions
function randomIntFromRange(min,max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
	return colors[Math.floor(Math.random() * colors.length)];
}


// create ball

function Ball(x, y, dx, dy, radius, color){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
    this.update = function(){
        if ( this.y + this.radius + this.dy > canvas.height ){
            this.dy = -this.dy * friction;
        } else {
            this.dy += gravity;
        }

        if ( this.x + this.radius + this.dx > canvas.width || this.x - this.radius <= 0){
            this.dx = -this.dx;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
    this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.stroke();
        c.closePath();
    }
}

let ball;
let ballArr = [];
// implementation
function init(){
    ballArr = [];
    for( let i = 0; i < 150; i++ ){
        let radius = randomIntFromRange(2,30);
        let x = randomIntFromRange(radius, canvas.width - radius);
        let y = randomIntFromRange(20,canvas.height - radius);
        let color = randomColor(colors)
        let dy = 5;
        let dx = randomIntFromRange(-2, 2);
        ballArr.push(new Ball(x, y, dx, dy ,radius, color));
    }
    

}

// Animation Loop
function animate(){
    requestAnimationFrame(animate);

    c.clearRect(0, 0, canvas.width, canvas.height);
    for ( let i = 0; i < ballArr.length; i++ ){
        ballArr[i].update();
    }
    ball.update();
}

init();
animate();



