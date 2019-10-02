var t;

var radiiX = [];
var radiiY = [];

var rotationRateX = [];
var rotationRateY = [];

var phasesX = [];
var phasesY = [];

var centersX = [];
var centersY = [];
centersX[0] = [];
centersX[1] = [];
centersY[0] = [];
centersY[1] = [];

var drawing = [];
drawing[0] = [];
drawing[1] = [];

var colors = [];
var colorsX = [];
var colorsY = [];

var stringPara;
var para = [];
var offsetX;
var offsetY;

function preload() {
  	stringPara = loadStrings('assets/elephant.txt', pickString);
  	//stringPara = loadStrings('assets/flower.txt', pickString);
  	//stringPara = loadStrings('assets/figtest.txt', pickString);
}

function pickString(result) {
	for (i=0; i<result.length-1; i++) {
		para.push(stringPara[i].split(' '));
	}

	para = transpose(para);

	for (i=0; i<para.length; i++) {
		for (j=0; j<para[0].length; j++) {
			para[i][j] = float(para[i][j]);
		}
	}

	offsetX = para[0][0];
	offsetY = para[2][0];
	//print(offsetX)
	//print(offsetY)
	//x = offsetX + radiiX[1]*cos(1*t + phaseX[1] + ... + radiiX[n]*cos(n*t + phaseX[n]))
	//y = offsetY + radiiY[1]*sin(1*t + phaseY[1] + ... + radiiY[n]*sin(n*t + phaseY[n]))

}

//TODO put this function ouside sketch.js
function transpose(matrix) {
  return matrix[0].map((col, i) => matrix.map(row => row[i]));
}

function setup() {
	//General setup
	createCanvas(1000, 700);
	t= 0;
	frameRate(40);
	background(0);

	//Graphics
	colorsX["circle"] = 255;
	colorsX["segment"] = [255, 255, 0];
	colorsY["circle"] = 255;
	colorsY["segment"] = [255, 255, 0];
	colors["drawing"] = [255, 0, 0];

	//Epicycloid parameters
	//radiiX = [50, 40, 10, 0];
	//radiiY = [100, 40, 30, 0];
	radiiX = para[0];
	radiiY = para[2];

	//scale radii
	s = 100;
	offsetX = width/2;
	offsetY = height/2;
	for (i=0; i<radiiX.length; i++) {
		radiiX[i] = radiiX[i]*s;
		radiiY[i] = radiiY[i]*s;
	}

	//rotationRateX = [1, 1, 16, 1];
	//TODO clean the part below
	rotationRateX = [...Array(radiiX.length).keys()];
	rotationRateY = [...Array(radiiY.length).keys()];

	phasesX = para[1]; 
	phasesY = para[3]; 


	//centersX[0][0] = radiiX[0];
	//centersX[1][0] = 0; 
	//centersY[0][0] = radiiX[0];
	//centersY[1][0] = 0;

	//Initialisation
	initCircleCentersX(offsetX, centersX, radiiX, rotationRateX, phasesX);
	initCircleCentersY(offsetY, centersY, radiiY, rotationRateY, phasesY);
}

function draw() {
	background(0);

	//Draw bunch X 
	drawBunchX(centersX, radiiX, rotationRateX, phasesX, colorsX);

	//Draw bunch Y
	drawBunchY(centersY, radiiY, rotationRateY, phasesY, colorsY);
	
	//Draw drawing
	drawCurve(drawing, colors.drawing);

	//Increment 
	t += deltaTime/1000;

	//Update
	//TODO replace those two lines by the new function updateBunch
	updateCircleCenters(centersX, radiiX, rotationRateX, phasesX, t);
	updateCircleCenters(centersY, radiiY, rotationRateY, phasesY, t);
	updateCurve(drawing, offsetX+radiiX[0], offsetY, radiiX, radiiY, phasesX, phasesY, t);
	//print(drawing)
}

function mousePressed() {
	noLoop();
}
