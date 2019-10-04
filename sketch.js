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
var styles =[];

var stringPara;
var para = [];
var offsetX;
var offsetY;

var nSlider;
var n;


function preload() {
  	//stringPara = loadStrings('assets/elephant.txt', pickString);
  	stringPara = loadStrings('assets/zenika.txt', pickString);
  	//stringPara = loadStrings('assets/custom.txt', pickString);
}

function setup() {
	//Increment
	t = 0;
	//Step ~[0.5 ; 5] (1 seems usually good enough)
	step = 2.; 

	//Graphics
	colorsX["circle"] = 100;
	colorsX["segment"] = 255;
	colorsX["axis"] = 100;
	colorsY = colorsX;
	colors["drawing"] = [255, 0, 0];
	colors["background"] = 0;
	colors["text"] = 255;
	colors["point"] = [255, 0, 0];
	styles["strokeWeightDefault"] = 1;
	styles["strokeWeightCurve"] = 3;
	styles["strokeWeightSegment"] = 1.5;
	styles["strokeWeightPoint"] = 5;
	strokeWeight(styles.strokeWeightDefault);
	textSize(20);
	textAlign(CENTER, CENTER);

	//General setup
	rotate(PI);
	createCanvas(windowWidth, windowHeight);
	background(colors.background);
	frameRate(30);


	//Epicycloid parameters
	radiiX = para[0];
	radiiY = para[2];

	//Scale radii
	//TODO implement autoscale
	s = 200;
	offsetX = width/2;
	offsetY = 2*height/3;
	for (i=0; i<radiiX.length; i++) {
		radiiX[i] = radiiX[i]*2.5*s;
		radiiY[i] = radiiY[i]/5*s;
	}

	rotationRateX = [...Array(radiiX.length).keys()];
	rotationRateY = [...Array(radiiY.length).keys()];

	phasesX = para[1]; 
	phasesY = para[3]; 

	//Initialisation
	initCircleCentersX(offsetX, centersX, radiiX, rotationRateX, phasesX);
	initCircleCentersY(offsetY, centersY, radiiY, rotationRateY, phasesY);

	//DOM
	//slide bar (Fourrier series max rank)
	nSlider = createSlider(2, radiiX.length, radiiX.length);
	nSlider.position(width/4, 20);	
	//stop button
	buttonStop = createButton('stop');
  	buttonStop.position(20, 20);
  	buttonStop.mousePressed(() => {noLoop()});
	//play button
	buttonPlay = createButton('play');
  	buttonPlay.position(100, 20);
  	buttonPlay.mousePressed(() => {loop()});
	//play plus 
	buttonPlus = createButton('+');
  	buttonPlus.position(nSlider.x+nSlider.width+10, nSlider.y);
  	buttonPlus.mousePressed(() => {
		if (n < radiiX.length) {
			n+=1;
			nSlider.value(n);
		}
	});
	//play minus 
	buttonPlus = createButton('-');
  	buttonPlus.position(nSlider.x-buttonPlus.width-10, nSlider.y);
  	buttonPlus.mousePressed(() => {
		if (n > 1) {
			n-=1;
			nSlider.value(n);
		}
	});
	//TODO Drawing selector
	//sel = createSelect();
	//sel.position(20, 50);
	//sel.option('elephant');
	//sel.option('zenika');
	//sel.option('custom');
	//sel.changed(mySelectEvent);
	
}

function draw() {
	background(colors.background);

	//Draw bunch X 
	drawBunchX(centersX, radiiX, rotationRateX, phasesX, colorsX, n);

	//Draw bunch Y
	drawBunchY(centersY, radiiY, rotationRateY, phasesY, colorsY, n);
	
	//Draw curve 
	drawCurve(drawing, colors, styles);

	//Text
	fill(colors.text);
	stroke(colors.background);
	text('n = '+(nSlider.value()-1), width/4, 50);

	//Increment 
	t += deltaTime/(2000/step);

	//Update drawing
	updateCircleCenters(centersX, radiiX, rotationRateX, phasesX, t);
	updateCircleCenters(centersY, radiiY, rotationRateY, phasesY, t);
	updateCurve(drawing, offsetX+radiiX[0], offsetY, radiiX, radiiY, phasesX, phasesY, t, n);

	//Update parameters
	n = nSlider.value();
}

function mousePressed() {
	drawing = [];
	drawing[0] = [];
	drawing[1] = [];
}

function mouseReleased() {
	drawing = [];
	drawing[0] = [];
	drawing[1] = [];
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}
