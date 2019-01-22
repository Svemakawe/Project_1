//---------------------------START GAME --------------------------------
var myObstacles = [];

function startGame() {
    myGameArea.start();
    player = new component(30, 30, "red", 0, 110);
}



//--------------------------------GAME AREA-----------------------------
var myGameArea = {
  canvas: document.createElement("canvas"),
  start: function(){
    this.canvas.width = 480;
    this.canvas.height = 270;
    this.context = this.canvas.getContext('2d');
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = setInterval(updateGameArea, 20);
  },
  frames: 0,
  clear: function(){ this.context.clearRect(0,0,this.canvas.width, this.canvas.height)
  },
  
}

//----------------------------COMPONENTS CLASS-----------------------------
// class Component {
//   constructor(width, height, color, x, y){
//     this.width = width
//     this.height = height
//     this.x = x
//     this.y = y
//     this.speedX = 0
//     this.speedY = 0
//   }

//     update(){
//       ctx = myGameArea.context
//       ctx.fillStyle = color
//       ctx.fillRect(this.x, this.y,this.width,this.height)
//     }

//     newPos(){
//       this.x += this.speedX
//       this.y += this.speedY
//     }   

//     moveUp() { this.y -= 50 }
//     moveDown() { this.y += 50 }
//     moveLeft() { this.x -= 50 }
//     moveRight() { this.x += 50 }
  
// }


function component(width, height, color, x, y) {
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y; 
  this.speedX = 0;
  this.speedY = 0;
  this.update = function(){
      ctx = myGameArea.context;
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  this.newPos = function() {
      this.x += this.speedX;
      this.y += this.speedY; 
  }
  this.left   = function() { return this.x                 }
  this.right  = function() { return (this.x + this.width)  }
  this.top    = function() { return this.y                 }
  this.bottom = function() { return this.y + (this.height) }
}

//--------------------------------PLAYER 1 ---------------------------------
// var player = new Component(30, 30, "red", 0, 110)

//-------------------------UPDATING THE CANVAS------------------------------
function updateGameArea(){
  myGameArea.clear();
  myGameArea.frames +=1;

  if (myGameArea.frames % 100 === 0) {
    x = myGameArea.canvas.width;
    minHeight = 20;
    maxHeight = 200;
    height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
    minGap = 50;
    maxGap = 200;
    gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
    myObstacles.push(new component(10, height, "green", x, 0));
    myObstacles.push(new component(10, x - height - gap, "green", x, height + gap));
  }

  for (i = 0; i < myObstacles.length; i += 1) {// i++?
        myObstacles[i].x += -1;//macht es schneller
        myObstacles[i].update();
    }
  player.newPos();
  player.update();

}

//---------------------------MOVE THE PLAYER --------------------------------
// document.onkeydown = function(e) {
//   e.preventDefault()
//   switch (e.keyCode) {
//     case 38: player.moveUp();    console.log('up',    player); break;
//     case 40: player.moveDown();  console.log('down',  player); break;
//     case 37: player.moveLeft();  console.log('left',  player); break;
//     case 39: player.moveRight(); console.log('right', ghost); break;
//   }
//   //  updateCanvas();
// }

function moveUp() {
  player.speedY -= 1; 
}

function moveDown() {
  player.speedY += 1; 
}

function moveLeft() {
  player.speedX -= 1;
}

function moveRight() {
  player.speedX += 1;
}

document.onkeydown = function(e) {
switch (e.keyCode) {
  case 38:
    moveUp();
    break;
  case 40:
    moveDown();
    break;
  case 37:
    moveLeft();
    break;
  case 39:
    moveRight();
    break;
}
}

//---------------------------STOP THE PLAYER --------------------------------
document.onkeyup = function(e) {
  stopMove();
}

function stopMove() {
    player.speedX = 0;
    player.speedY = 0;
}

//---------------------------START THE GAME --------------------------------
startGame();


//---------------------------CREATE OBSTACLES --------------------------------
// var myObstacles = [];
// myGameArea.frames +=1;
// if (myGameArea.frames % 120 === 0) {
//   x = myGameArea.canvas.width;
//   minHeight = 20;
//   maxHeight = 200;
//   height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
//   minGap = 50;
//   maxGap = 200;
//   gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
//   myObstacles.push(new component(10, height, "green", x, 0));
//   myObstacles.push(new component(10, x - height - gap, "green", x, height + gap));
// }


//---------------------------MOVE THE OBSTACLES --------------------------------
// for (i = 0; i < myObstacles.length; i += 1) {//i++ ?
//   myObstacles[i].x += -1;//macht es schneller
//   myObstacles[i].update();
// }