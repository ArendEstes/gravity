let canvas = document.querySelector("canvas");
let c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
};


var colors = [
	'#2185C5',
	'#7ECEFD',
	'#FFF6E5',
	'#FF7F66'
];

let friction = 0.92;
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

function Ball(x, y, dy, radius, color){
    this.x = x;
    this.y = y;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
    this.update = function(){
        if ( this.y + radius > canvas.height ){
            this.dy = -this.dy * friction;
        } else {
            this.dy += gravity;
        }
        this.y += this.dy;
        this.draw();
    }
    this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, radius, 0, Math.PI * 2, false);
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
    c.clearRect(0, 0, canvas.width, canvas.height);
    for( let i = 0; i < 20; i++ ){
        ballArr.push(new Ball(randomIntFromRange(0, canvas.width), randomIntFromRange(20,canvas.height - 120), 5, randomIntFromRange(2,30), randomColor(colors)));
    }
    ball = new Ball(canvas.width / 2, canvas.height / 2, 5, 20, "red");

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



