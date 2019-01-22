/*CODE VIKING
// Iteration 2
class Character {
  constructor(initialCol,initalRow,imgPaths) {
    this.col = initialCol
    this.row = initalRow
    this.orientation = 'down'
    this.score = 0

    // Save all the images in the character 
    this.imgs = {}
    // Loop keys of object
    for (var orientation in imgPaths) {
      this.imgs[orientation] = new Image()
      this.imgs[orientation].src = imgPaths[orientation]
    }
  }
  moveUp(){
    this.row--
    this.orientation = 'up'
  }
  moveDown(){
    this.row++
    this.orientation = 'down'
  }
  moveLeft(){
    this.col--
    this.orientation = 'left'
  }
  moveRight(){
    this.col++
    this.orientation = 'right'
  }

  moveDiagonalLeft(){
    this.col--
    this.row--
    this.orientation = 'diagonalLeft'
  }

  moveDiagonalRight(){
    this.col++
    this.row--
    this.orientation = 'diagonalRight'
  }
}
*/
