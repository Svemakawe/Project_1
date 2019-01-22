var canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.setAttribute("width", "1200");
canvas.setAttribute("height", "800");
var canvasWidth = canvas.width;//var width geändert
var canvasHeight = canvas.height;
var Myobstacles = [];//var obstacles geändert

var p1 = new Player(ctx);