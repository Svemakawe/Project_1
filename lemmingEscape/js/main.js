//---------------------------START GAME --------------------------------
var myObstacles = [];

function startGame() {
    myGameArea.start();
    player = new component(50, 50, "#472b06", 0,700);//---------NEW PLAYER--------
}

//--------------------------------GAME AREA-----------------------------
var myGameArea = {
    canvas : document.createElement("canvas"),
    hasEnded: false,
    start : function() {
        this.canvas.width = 780;//480
        this.canvas.height = 770;//270
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
      this.interval = setInterval(updateGameArea, 20);
    },
    frames: 0,//0
    
    clear : function() {
          if(!this.hasEnded) this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      },
  timer: function() {
    var timer = (Math.floor(this.frames/5))
    this.context.font = '18px serif';
    this.context.fillStyle = 'black';
    this.context.fillText('Timer: '+timer, 350, 50);
    if(timer === 200){
        this.clear()
        this.context.fillText('You SURVIVED',350, 50); 
        this.stop()
    }

  },
 
  stop : function() {
        clearInterval(this.interval);
        this.hasEnded = true
    },
    
    // titel: function(){if(this.hasEnded = true){this.clear();this.context.fillText('You DIED',350, 100)}}
  
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

    // this.moveUp=    function() { this.y -= 50 },
    // this.moveDown=  function() { this.y += 50 },
    // this.moveLeft=  function() { this.x -= 50 },
    // this.moveRight= function() { this.x += 50 },

    //Werte meines players und der obstacles für oben,unten,links,rechts
    this.left   = function() { return this.x                 }
    this.right  = function() { return (this.x + this.width)  }
    this.top    = function() { return this.y                 }
    this.bottom = function() { return (this.y + this.height) }
    

//---------------------------CRASH IN OBSTACLE--------------------------------
    this.crashWith = function(obstacle) {
        return !((this.bottom() < obstacle.top())    ||
                 (this.top()    > obstacle.bottom()) ||
                 (this.right()  < obstacle.left())   ||
                 (this.left()   > obstacle.right())) 
      }
}




//-------------------------UPDATING THE CANVAS---------------------------------
function updateGameArea() {

    //-------------------PLAYER CANT MOVE FORWARD WHEN CRASHING---------------------
    for (i = 0; i < myObstacles.length; i += 1) {
        if (player.crashWith(myObstacles[i])) {
             player.y = myObstacles[i].y + myObstacles[i].height
        } 
    } 

    //----------PLAYER BOUNCE BACK WHEN CRASHING THE BORDERS OF CANVAS---------
    if (player.x > (myGameArea.canvas.width - player.width)){
        player.speedX *= -1;}
    if (player.x < 0){
        player.speedX *= -1;}
    if (player.y < 0){
        player.speedY *= -1;}
    
    //------------------GAME STOPS WHEN LOOSING---------------------
    if (player.y > (myGameArea.canvas.height - player.height)) {
        myGameArea.stop();
        // myGameArea.titel()
        myGameArea.context.fillText('You DIED',350, 100);
        // document.getElementById('die').innerHTML = 'You DIED';
      }


      
    myGameArea.clear();
    myGameArea.frames +=4;//1-4 mehr obstacles

    //---------------------CREATING OBSTACLES-----------------------
    if (myGameArea.frames % 200 === 0) {
        var canvasWidth = myGameArea.canvas.width;
        var minWidth = 20;//20
        var maxWidth = 200;//200
        var width = Math.floor(Math.random()*(maxWidth-minWidth+1)+minWidth);
        var minGap = 70;//50
        var maxGap = 260;//200

        var gap = Math.floor(Math.random()*(maxGap-minGap)+minGap);
        var xGap = Math.floor(Math.random()*(canvasWidth-gap)) 
        myObstacles.push(new component(xGap, 30,"#a76106", 0, 0));//
        myObstacles.push(new component(canvasWidth-xGap-gap, 30,"#a76106", xGap+gap, 0));//
         
    }
    for (var i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].y += 2;//-1 macht es schneller
        myObstacles[i].update();
    }
    player.newPos();
    player.update();
    myGameArea.timer();
}

//---------------------------MOVE THE PLAYER --------------------------------
function moveUp() {
    player.speedY = -9;//1 
}

function moveDown() {
    player.speedY = 9;//1 

}

function moveLeft() {
    player.speedX = -9;//1 

}

function moveRight() {
    player.speedX = 9;//1 

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

//--------------------------DONT MOVE THE PLAYER -----------------------------
document.onkeyup = function(e) {
  stopMove();
}

function stopMove() {
    player.speedX = 0;
    player.speedY = 0; 
}

//---------------------------START THE GAME --------------------------------
startGame();
