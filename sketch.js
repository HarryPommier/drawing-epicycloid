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

function preload() {
  	stringPara = loadStrings('assets/elephant.txt', pickString);
}

function pickString(result) {
	for (i=0; i<result.length; i++) {
		para.push(stringPara[i].split(' '));
	}

	para = transpose(para);

	print(para);

	for (i=0; i<para.length; i++) {
		for (j=0; j<para[0].length; j++) {
			para[i][j] = float(para[i][j])*50;
		}
	}
}

function transpose(matrix) {
  return matrix[0].map((col, i) => matrix.map(row => row[i]));
}

//TODO debug check with simple epicycloid

function setup() {
	//General setup
	createCanvas(1000, 1000);
	t= 0;
	frameRate(40);
	background(0);

	//Graphics
	colorsX["circle"] = 255;
	colorsX["segment"] = [255, 255, 0];
	colorsY["circle"] = 255;
	colorsY["segment"] = [255, 255, 0];
	colors["drawing"] = [255, 0, 0];

 	//np.savetxt("para.txt", np.transpose([axcos, thetax, aysin, thetay]))

	//Epicycloid parameters
	//radiiX = [50, 40, 10, 0];
	//radiiY = [100, 40, 30, 0];
	radiiX = para[0];
	radiiY = para[2];
	//rotationRateX = [1, 1, 16, 1];
	rotationRateX = [...Array(radiiX.length).keys()];
	for (k=0; k<rotationRateX.length; k++) {
		rotationRateX[k] += 1; 
	}
	rotationRateY = [...Array(radiiY.length).keys()];
	for (k=0; k<rotationRateY.length; k++) {
		rotationRateY[k] += 1; 
	}
	print(rotationRateX)
	//rotationRateY = [2, 3, 10, 1];
	//phasesX = [0, PI/4, -PI/8, 0];
	//phasesY = [0, PI, -PI/5, 0];
	phasesX = para[1]; 
	phasesY = para[3]; 
	centersX[0][0] = width/2;
	centersX[1][0] = height/10;
	centersY[0][0] = width/10;
	centersY[1][0] = height/2;

	//Initialisation
	initCircleCenters(centersX, radiiX, rotationRateX, phasesX);
	initCircleCenters(centersY, radiiY, rotationRateY, phasesY);
	initCurve(drawing, centersX);
	initCurve(drawing, centersY);
}

function draw() {
	background(0);

	//Draw bunch X 
	drawBunchX(centersX, radiiX, rotationRateX, phasesX, drawing, colorsX);

	//TODO Draw bunch Y
	drawBunchY(centersY, radiiY, rotationRateY, phasesY, drawing, colorsY);
	
	//TODO Draw X pencil
	//TODO Draw Y pencil
	//TODO Draw drawing, delete drawing in older functions
	drawCurve(drawing, colors.drawing);

	//Increment 
	t += deltaTime/500;

	//Update
	//TODO replace those two lines by the new function updateBunch
	updateCircleCenters(centersX, radiiX, rotationRateX, phasesX, t);
	updateCircleCenters(centersY, radiiY, rotationRateY, phasesY, t);
	updateCurve(drawing, centersY);
	updateCurve(drawing, centersY);
}

function mousePressed() {
	noLoop();
}
