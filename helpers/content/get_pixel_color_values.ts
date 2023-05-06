//! this is not complete

var canvas = document.createElement("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// get the context of the canvas
var context = canvas.getContext("2d");

// draw the contents of the screen onto the canvas
context?.drawImage(window, 0, 0, window.innerWidth, window.innerHeight);

// get the color of a pixel at (x, y)
var x = 100;
var y = 100;
var pixel = context?.getImageData(x, y, 1, 1).data;

// pixel is an array of 4 values (red, green, blue, alpha)
var red = pixel ? pixel[0] : 0;
var green = pixel[1];
var blue = pixel[2];
var alpha = pixel[3];

// output the color values
console.log("Red: " + red);
console.log("Green: " + green);
console.log("Blue: " + blue);
console.log("Alpha: " + alpha);
