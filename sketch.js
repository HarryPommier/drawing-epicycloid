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

var nSlider;
var n;


function preload() {
  	stringPara = loadStrings('assets/elephant.txt', pickString);
  	//stringPara = loadStrings('assets/zenika.txt', pickString);
  	//stringPara = loadStrings('assets/flower.txt', pickString);
}

function setup() {
	//Increment
	t= 0;
	//Step ~[0.5 ; 5] (1 seems usually good enough)
	step = 2.; 

	//Graphics
	colorsX["circle"] = 150;
	colorsX["segment"] = 255;
	colorsX["axis"] = 255;
	colorsY = colorsX;
	colors["drawing"] = [255, 0, 0];
	colors["background"] = 0;
	strokeWeight(3);
	textSize(100);

	//General setup
	createCanvas(windowWidth, windowHeight);
	background(colors.background);
	frameRate(30);


	//Epicycloid parameters
	radiiX = para[0];
	radiiY = para[2];

	//Scale radii
	//TODO implement autoscale
	s = 500;
	offsetX = width/2;
	offsetY = 2*height/3;
	for (i=0; i<radiiX.length; i++) {
		radiiX[i] = radiiX[i]*s;
		radiiY[i] = radiiY[i]*s;
	}

	rotationRateX = [...Array(radiiX.length).keys()];
	rotationRateY = [...Array(radiiY.length).keys()];

	phasesX = para[1]; 
	phasesY = para[3]; 

	//Initialisation
	initCircleCentersX(offsetX, centersX, radiiX, rotationRateX, phasesX);
	initCircleCentersY(offsetY, centersY, radiiY, rotationRateY, phasesY);

	//Buttons
	//slide bar (Fourrier series max rank)
	nSlider = createSlider(0, 255, 100);
	nSlider.position(width/2, 20);	

	//stop 
	button = createButton('stop');
  	button.position(20, 20);
  	button.mousePressed(() => {noLoop()});
}

function draw() {
	background(colors.background);


	//Draw bunch X 
	drawBunchX(centersX, radiiX, rotationRateX, phasesX, colorsX);

	//Draw bunch Y
	drawBunchY(centersY, radiiY, rotationRateY, phasesY, colorsY);
	
	//Draw curve 
	drawCurve(drawing, colors);

	//Increment 
	t += deltaTime/(2000/step);

	//Update drawing
	updateCircleCenters(centersX, radiiX, rotationRateX, phasesX, t);
	updateCircleCenters(centersY, radiiY, rotationRateY, phasesY, t);
	updateCurve(drawing, offsetX+radiiX[0], offsetY, radiiX, radiiY, phasesX, phasesY, t, n);

	//Update parameters
	slideVal = nSlider.value();
	N = radiiX.length;
	n = max(round(slideVal/255*N),2)
}

function keyPressed() {
	noLoop();
}

function mousePressed() {
	drawing = [];
	drawing[0] = [];
	drawing[1] = [];
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}
