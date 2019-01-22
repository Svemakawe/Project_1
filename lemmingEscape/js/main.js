//---------------------------START GAME --------------------------------
var myObstacles = [];

function startGame() {
    myGameArea.start();
    player = new component(30, 30, "#472b06", 0, 110);//---------NEW PLAYER--------
}

//--------------------------------GAME AREA-----------------------------
var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 980;//480
        this.canvas.height = 770;//270
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
      this.interval = setInterval(updateGameArea, 20);
    },
    frames: 0,
    clear : function() {
          this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      },
  score: function() {
    points = (Math.floor(this.frames/5))
    this.context.font = '18px serif';
    this.context.fillStyle = 'black';
    this.context.fillText('Score: '+points, 350, 50);
  },
  stop : function() {
        clearInterval(this.interval);
    }
}

//----------------------------COMPONENTS CLASS-----------------------------
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

//---------------------------CRASH IN OBSTACLE--------------------------------
    // this.crashWith = function(obstacle) {
    //   return !((this.bottom() < obstacle.top())    ||
    //            (this.top()    > obstacle.bottom()) ||
    //            (this.right()  < obstacle.left())   ||
    //            (this.left()   > obstacle.right())) 
    // }
}

//-------------------------UPDATING THE CANVAS---------------------------------
function updateGameArea() {
    // for (i = 0; i < myObstacles.length; i += 1) {
    //     if (player.crashWith(myObstacles[i])) {
    //         myGameArea.stop();
    //         return;
    //     } 
    // } //---------------------STOP PLAYER WHEN CRASHING---------------------
    myGameArea.clear();
    myGameArea.frames +=1;//---------------------CREATING OBSTACLES-----------
    if (myGameArea.frames % 100 === 0) {
        x = myGameArea.canvas.width;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 50;
        maxGap = 200;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        myObstacles.push(new component(10, height, "#a76106", x, 0));
        myObstacles.push(new component(10, x - height - gap, "#a76106", x, height + gap));
    }
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -8;//macht es schneller
        myObstacles[i].update();
    }
    player.newPos();
    player.update();
    myGameArea.score();
}

//---------------------------MOVE THE PLAYER --------------------------------
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
