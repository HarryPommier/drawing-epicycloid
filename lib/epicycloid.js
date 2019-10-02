//DRAW FUNCTIONS
function drawCircles(centers, radii, color) {

	stroke(color);
	noFill();

	for (let i = 1; i < radii.length; i++) {
		ellipse(centers[0][i], centers[1][i], 2*radii[i], 2*radii[i]);
	}
}


function drawRadiusSegments(centers, radii, rotationRate, phases, color) {

	stroke(color);

	//print("centers", centers)

	for (let i = 1; i < radii.length; i++) {
		line(centers[0][i], centers[1][i], centers[0][i+1], centers[1][i+1]);
	}
} 


function drawCurve(drawing, color) {

	stroke(color);

	for (let i = 0; i < drawing[0].length; i++) {
		line(drawing[0][i], drawing[1][i], drawing[0][i+1], drawing[1][i+1]);
	}
}

function drawBunchX(centers, radii, rotationRate, phases, colors) {
	//Draw circles, segments, epicycloid curve
	drawCircles(centers, radii, colors.circle);
	drawRadiusSegments(centers, radii, rotationRate, phases, colors.segment);
	stroke(100);
	xloc = centers[0][radii.length];
	yloc = centers[1][radii.length];
	line(xloc, yloc, xloc, yloc + 2000);
}

function drawBunchY(centers, radii, rotationRate, phases, colors) {
	//Draw circles, segments, epicycloid curve
	drawCircles(centers, radii, colors.circle);
	drawRadiusSegments(centers, radii, rotationRate, phases, colors.segment);
	stroke(100);
	xloc = centers[0][radii.length];
	yloc = centers[1][radii.length];
	line(xloc, yloc, xloc + 2000, yloc);
	//drawCurve(drawing, colors.drawing);
}


//UPDATE FUNCTIONS
function updateCircleCenters(centers, radii, rotationRate, phases, t) {

	for (let i = 1; i < radii.length+1; i++) {
		//print(i)
		centers[0][i] = centers[0][i-1] + radii[i-1]*cos(rotationRate[i-1]*t + phases[i-1]); 	
		centers[1][i] = centers[1][i-1] + radii[i-1]*sin(rotationRate[i-1]*t + phases[i-1]); 	
	}
}


function updateCurve(drawing, offsetX, offsetY, radiiX, radiiY, phasesX, phasesY, t) {

	//let N = centersX[0].length;
	//append(drawing[0], centersX[0][N-1]);
	//append(drawing[1], centersY[1][N-1]);
	
	x = cosFourier(offsetX, radiiX, phasesX, t);
	y = sinFourier(offsetY, radiiY, phasesY, t);
	append(drawing[0], x);
	append(drawing[1], y);
	

}

function cosFourier(offset, radii, phase, t) {
	s = offset;
	for (i=1; i<radii.length; i++) {
		s += radii[i]*cos(i*t + phase[i]);
	}
	return s;
}
function sinFourier(offset, radii, phase, t) {
	s = offset;
	for (i=1; i<radii.length; i++) {
		s += 2*radii[i]*sin(i*t + phase[i]);
	}
	return s;
}


function initCircleCentersX(offset, centers, radii, rotationRate, phases) {

	//centers[0][0] = width/2 + offset; 
	//centers[1][0] = height/8;
	centers[0][0] = offset; 
	centers[1][0] = 0;

	for (let i = 1; i <= radii.length; i++) {
		//X
		centers[0][i] = centers[0][i-1] + radii[i-1]*cos(rotationRate[i-1]*t + phases[i-1]); 	
		//Y
		centers[1][i] = centers[1][i-1] - radii[i-1]*sin(rotationRate[i-1]*t + phases[i-1]); 	
	}
}

function initCircleCentersY(offset, centers, radii, rotationRate, phases) {

	//centers[0][0] = width/8; 
	//centers[1][0] = height/2 + offset;
	centers[0][0] = 0; 
	centers[1][0] = offset;

	for (let i = 1; i < radii.length+1; i++) {
		//X
		centers[0][i] = centers[0][i-1] + radii[i-1]*cos(rotationRate[i-1]*t + phases[i-1]); 	
		//Y
		centers[1][i] = centers[1][i-1] - radii[i-1]*sin(rotationRate[i-1]*t + phases[i-1]); 	
	}
}
