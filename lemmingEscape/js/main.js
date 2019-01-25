//--------------------------------SEA CANVAS AREA-----------------------------
// var seaCanvas = document.getElementById('sea')
// var ctx = seaCanvas.getContext('2d')
// var width = seaCanvas.width
// var height = seaCanvas.height
// document.body.insertBefore(seaCanvas,document.body.childNodes[1])

// var bgSky = new Background("images/background-sky.png", 300*512/294,300, 0, 0, -0.5, 0)
// var bgForest = new Background("images/background-forest.png", 450*512/323,450, 0, 150, -2, 0)
// var bgClouds = new Background("images/background-clouds.png", 105*512/109,105, 0, 10, -1, 0)

// function updateEverything() {
//     bgForest.update()
//     bgClouds.update()
//     bgSky.update()
//   }
//   function drawEverything() {
//     // Clear the canvas
//     ctx.clearRect(0,0,width,height)
  
//     bgSky.draw(ctx)
//     bgForest.draw(ctx)
//     bgClouds.draw(ctx)
//   }

// function animation(){
//   updateEverything()
//   drawEverything()
//   window.requestAnimationFrame(animation)
// }
// animation()
// var lands = document.getElementById('landscape');
// lands.insertBefore(lands,document.document.getElem.childNodes[1])

//---------------------------START GAME --------------------------------
var myObstacles = [];
var imgsWinning = ["/images/winningLemming0.png","/images/winningLemming1.png"]
var mySound = new Audio('/audio/8bit.mp3')
function startGame() {
    myGameArea.start();
    player = new component(40, 40,"/images/winningLemming0.png", 350,100);//---------NEW PLAYER--------"/images/lemmingright.png",
}

//--------------------------------GAME AREA-----------------------------
var myGameArea = {
    canvas : document.querySelector("canvas"),
    hasEnded: false,
    haveWon: false,
    // soundOn: true,

    start : function() {
        this.canvas.width = 766;//480
        this.canvas.height = 660;//270
        this.context = this.canvas.getContext("2d");
        //document.body.insertBefore(this.canvas, document.body.childNodes[0]);
      this.interval = setInterval(updateGameArea, 20);//20


    },
    frames: 0,
    clear : function() {
          this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);//if(!this.hasEnded) this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      },

  timer: function() {
        //TEXT winning
    if(this.haveWon || this.hasEnded) {
        document.getElementById("again").parentElement.style = "initial"
    }

    if (this.haveWon) {
        this.context.fillText('You SURVIVED',250, 250);
        this.frames +=16//CHEATE hier den aussetzer der ObstacleLoops
        return
    } else if (this.hasEnded) {
        this.context.fillText('You DIED',250, 250);
        this.context.font = '60px Comic Sans MS, sans-serif';//"Lucida Console", Monaco, monospace---40px Comic Sans MS, sans-serif
        this.context.shadowColor = "#000";
        this.context.shadowOffsetX = 5;
        this.context.shadowOffsetY = 5;
        this.context.fillStyle = 'red';
        return
      }
    var timer = (Math.floor(this.frames/5))
    this.context.font = '18px serif';
    this.context.fillStyle = 'white';
    this.context.fillText('Timer: '+timer, 350, 50);
    // if(timer === 200){this.frames += 2}
    // else if(timer === 400){this.frames += 2}
    // else 
    if(timer === 600){
        this.haveWon = true
        
        this.context.font = '60px Comic Sans MS, sans-serif';//"Lucida Console", Monaco, monospace---40px Comic Sans MS, sans-serif
        this.context.shadowColor = "#000";
        this.context.shadowOffsetX = 5;
        this.context.shadowOffsetY = 5;
        this.context.fillStyle = 'yellow';
        

        this.clear()
        this.stop()
    }

  },

  stop : function() {
        this.hasEnded = true
    }, 

}

//----------------------------COMPONENTS CLASS-----------------------------
function component(width, height, imgPath, x, y) {//color,
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y; 
    this.speedX = 0;
    this.speedY = 0;
    this.image = new Image()
    this.image.src = imgPath
    
    this.imgWinLoop = function(){
        for(var i = 0;i < imgsWinning.length;i++){this.image.src = imgsWinning[i]}
    }

    this.update = function(){
        var ctx = myGameArea.context;
       
        for (let i = this.x; i < this.x + this.width; i+=40) {
            ctx.drawImage(this.image, i, this.y, 40, 40);
        }
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
                 (this.right() -10  < obstacle.left())   ||
                 (this.left() +10  > obstacle.right())) 
      }
}




//-------------------------UPDATING THE CANVAS---------------------------------
function updateGameArea() {
    

    var losing = false
    

    //-------------------PLAYER CANT MOVE FORWARD WHEN CRASHING---------------------
    for (i = 0; i < myObstacles.length; i += 1) {
        if (player.crashWith(myObstacles[i]) && !myGameArea.haveWon) {
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
        losing = true
        // document.getElementById('die').innerHTML = 'You DIED';
      }

      
    myGameArea.clear();
    myGameArea.frames +=4;
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


        if (!losing) {
            
                    myObstacles.push(new component(xGap, 30,"/images/lemmingleft.png", 0, 0));//
                    myObstacles.push(new component(canvasWidth-xGap-gap, 30,"/images/lemmingright.png", xGap+gap, 0));//
                }

         
    }
    for (var i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].y += 2;//-1 macht es schneller
        myObstacles[i].update();
    }
    player.newPos();
    player.update();
    myGameArea.timer();
    mySound.play()
    // if(myGameArea.soundOn){mySound.play()}else{mySound.pause()}
    if(myGameArea.haveWon){player.imgWinLoop()}
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
// function muteSound(){
//     myGameArea.soundOn = false
// }
// function soundBack(){
//     myGameArea.soundOn = true
// }


document.onkeydown = function(e) {


    if (myGameArea.hasEnded) return;
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
    // case 77:
    // muteSound()
    // break;
    // case 79:
    // soundBack()
    // break;
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


document.getElementById("again").onClick = function() {
    this.parentElement.style.display = "none"
}
// function levelOne(){
//     myGameArea.levelOne = true
// }
