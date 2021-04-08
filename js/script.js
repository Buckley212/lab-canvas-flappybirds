const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
let background_image = new Image();
background_image.src = './images/bg.png';
let birdy_image = new Image();
birdy_image.src = './images/flappy.png';
let obstacleBottom = new Image();
obstacleBottom.src = './images/obstacle_bottom.png';
let obstacleTop = new Image();
obstacleTop.src = './images/obstacle_top.png';

const score = {
  points: 0,
  draw: function () {
    c.font = "30px Arial";
    c.fillStyle = "#000000";
    c.fillText("Score: "+this.points, 500, 150);
  }
}

const background = {
  x: 0,
  y: 0,
  w: canvas.width,
  h: canvas.height,

  draw: function(){
    c.drawImage(background_image, this.x, this.y, this.w, this.h);
  }
}

const birdy = {
  x: canvas.width /2 - 100,
  y: canvas.height/2 - 100,
  w: 100,
  h: 100,
  draw: function(){
    c.drawImage(birdy_image, this.x, this.y, this.w, this.h)
  }
}

class Barrier {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  drawTop = () => {
    c.drawImage(obstacleTop, this.x, this.y - 800, this.w, this.h)
  }

  drawBottom = () => {
    c.drawImage(obstacleBottom, this.x, this.y + 600, this.w, this.h)
  }
}

let barriersTop = []
let barriersBottom = []

setInterval(function () {
  barriersTop.push(new Barrier(canvas.width, Math.floor(Math.random()*300), 200, canvas.height))
  barriersBottom.push(new Barrier(canvas.width, Math.floor(Math.random()*300), 200, canvas.height))
  score.points += 10
}, 1500)

setInterval(function () {
  if(birdy.y !== 900){
    birdy.y +=1
  }
  else{
    birdy.y += 0
  }
}, 1)

const hitBottom = () =>{
  if (birdy.y === 900){
    gameOver()
  }
}

function detectCollision(rect1, rect2) {
  if (rect1.x < rect2.x + rect2.w &&
    rect1.x + rect1.w > rect2.x &&
    rect1.y < rect2.y + rect2.h &&
    rect1.y + rect1.h > rect2.y){
      // collision detected!
      gameOver()
  }
}

const gameOver = () =>{
  console.log("COLLISION")
  cancelAnimationFrame(gameInt)
  alert("GAME OVER")
  window.location.reload()
}


let gameInt = null;
function animate() {
  gameInt=requestAnimationFrame(animate)
  c.clearRect(0,0,canvas.width,canvas.height)
  score.draw()
  background.draw()
  birdy.draw()
  hitBottom();
  barriersTop.forEach(eachBadGuy => {
    eachBadGuy.drawTop()
    detectCollision(birdy, eachBadGuy)
    eachBadGuy.x -= 2;
  })
  barriersBottom.forEach(eachBadGuy1 => {
    eachBadGuy1.drawBottom()
    detectCollision(birdy, eachBadGuy1)
    eachBadGuy1.x -= 2;
  })
}



document.getElementById("start-button").onclick = function() {
  animate()
};

window.addEventListener("keydown", moveSomething, false);
function moveSomething(e) {
  switch(e.keyCode) {
      case 32:
        if(birdy.y - birdy.h < 0){
          birdy.y = 0
        }
        else{
          birdy.y -= 100;
          break;
        }
  }
}
