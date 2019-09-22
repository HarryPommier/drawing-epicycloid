var t;
var color;
var radii = [];
var rotationRate = [];
var phases = [];
var centers = [];
centers[0] = [];
centers[1] = [];
var drawing = [];
drawing[0] = [];
drawing[1] = [];


function setup() {
	//720p
	createCanvas(1080, 720);

	t= 0;
	colorCircle = 100;
	colorSegment = 50;
	colorDrawing = [255, 0, 0];

	frameRate(40);
	background(0);

	radii = [50, 40, 30, 20];
	rotationRate = [1, 4, 1, 4];
	phases = [0, PI/4, -PI/8, 0];
	centers[0][0] = width/2;
	centers[1][0] = height/2;

	initCircleCenters(centers, radii, rotationRate, phases);
	print(drawing);
	initCurve(drawing, centers);

}

function draw() {
	background(0);

	//Draw circles, segments, epicycloid
	drawCircles(centers, radii, colorCircle);
	drawRadiusSegments(centers, radii, rotationRate, phases, colorSegment);
	drawCurve(drawing, colorDrawing);
	
	//Increment 
	t += deltaTime/1000;

	//Update
	updateCircleCenters(centers, radii, rotationRate, phases, t);
	updateCurve(drawing, centers);
}
