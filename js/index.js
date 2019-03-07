//----------------------------------------DESIGN OF WEBSITE--------------------------------------

// function displayPage(selectedPage) {
//   // Save all the tags with the attribute `data-page` in $pages
//   var $pages = document.querySelectorAll('[data-page]')
//   for (var i = 0; i < $pages.length; i++) {
//     // If the current page as the attribute data-page equals to the selectedPage
//     if ($pages[i].getAttribute('data-page') === selectedPage) {
//       $pages[i].style.display = "" // display the current page
//     }
//     else {
//       $pages[i].style.display = "none" // hide the current page
//     }
//   }
// }

// function initRouting() {
//   // First, display only the page "home", the default page
//   displayPage("home")
  
//   // Listen for click events on buttons (or any other elements) to change the page
//   var $buttons = document.querySelectorAll('[data-target]')
//   for (var i = 0; i < $buttons.length; i++) {
//     $buttons[i].onclick = function(e) {
//       e.preventDefault() // stop the default behaviour (usefull for <a>)
//       var target = this.getAttribute('data-target')
//       displayPage(target)
//     }
//   }
// }

// initRouting()
// ----- End of Routing System -----

// ----- Begin of Canvas Example
// The main concept here is the fact that we execute `canvas.requestFullscreen()` on click, to display the canvas fullscreen

//   var canvas = document.querySelector('canvas')
//   var ctx = canvas.getContext('2d')
//   var intervalId 

//   ctx.fillStyle = "red"
//   ctx.fillRect(0,0,canvas.width,canvas.height)
//   ctx.fillStyle = "white"
//   ctx.textAlign = "center"
//   ctx.textBaseline = "middle"
//   ctx.font = "50px Arial" 
//   ctx.fillText('Click to play', canvas.width/2,canvas.height/2)

//   canvas.onclick = function() {
//     if (!intervalId) startGame();
//     else stop()
//   }


//   function start() {
//     canvas.requestFullscreen() // <----- This is putting the canvas in fullscreen mode
  
//     var width = 100
//     var height = 100
//     var x = 0
//     var y = (canvas.height-height)/2

//     intervalId = setInterval(function(){
//       ctx.clearRect(0,0,canvas.width,canvas.height)
//       ctx.fillStyle = "red"
//       ctx.fillRect(0,0,canvas.width,canvas.height)
//       ctx.fillStyle = "white"
//       ctx.fillRect(x,y,width,height)
//       x++
//     }, 1000/60)
//   }

//   function stop() {
//     clearInterval(intervalId)
//     intervalId = undefined
//   }

// ----- End of Canvas Example
