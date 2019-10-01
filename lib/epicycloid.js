//DRAW FUNCTIONS
function drawCircles(centers, radii, color) {

	stroke(color);
	noFill();

	for (let i = 0; i < radii.length; i++) {
		ellipse(centers[0][i], centers[1][i], 2*radii[i], 2*radii[i]);
	}
}


function drawRadiusSegments(centers, radii, rotationRate, phases, color) {

	stroke(color);

	for (let i = 0; i < radii.length-1; i++) {
		line(centers[0][i], centers[1][i], centers[0][i+1], centers[1][i+1]);
	}
} 


function drawCurve(drawing, color) {

	stroke(color);

	for (let i = 0; i < drawing[0].length; i++) {
		line(drawing[0][i], drawing[1][i], drawing[0][i+1], drawing[1][i+1]);
	}
}

function drawBunchX(centers, radii, rotationRate, phases, drawing, colors) {
	//Draw circles, segments, epicycloid curve
	drawCircles(centers, radii, colors.circle);
	drawRadiusSegments(centers, radii, rotationRate, phases, colors.segment);
	//drawCurve(drawing, colors.drawing);
	stroke(100);
	xloc = centers[0][radii.length-1];
	yloc = centers[1][radii.length-1];
	line(xloc, yloc, xloc, yloc + 900);
}

function drawBunchY(centers, radii, rotationRate, phases, drawing, colors) {
	//Draw circles, segments, epicycloid curve
	drawCircles(centers, radii, colors.circle);
	drawRadiusSegments(centers, radii, rotationRate, phases, colors.segment);
	stroke(100);
	xloc = centers[0][radii.length-1];
	yloc = centers[1][radii.length-1];
	line(xloc, yloc, xloc + 900, yloc);
	//drawCurve(drawing, colors.drawing);
}


//UPDATE FUNCTIONS
function updateCircleCenters(centers, radii, rotationRate, phases, t) {

	for (let i = 1; i < radii.length; i++) {
		centers[0][i] = centers[0][i-1] + radii[i-1]*cos(rotationRate[i]*t + phases[i-1]); 	
		centers[1][i] = centers[1][i-1] + radii[i-1]*sin(rotationRate[i]*t + phases[i-1]); 	
	}
}


function updateCurve(drawing, centers) {

	let N = centers[0].length;

	//append(drawing[0], centers[0][N-1]);
	//append(drawing[1], centers[1][N-1]);
	x0 = 0;
	y0 = 0;
	append(drawing[0], centersX[0][N-1]+x0);
	append(drawing[1], centersY[1][N-1]+y0);
}


function initCircleCenters(centers, radii, rotationRate, phases) {

	for (let i = 1; i < radii.length; i++) {
		centers[0][i] = centers[0][i-1] + radii[i-1]*cos(rotationRate[i]*t + phases[i-1]); 	
		centers[1][i] = centers[1][i-1] - radii[i-1]*sin(rotationRate[i]*t + phases[i-1]); 	
	}

}


function initCurve(drawing, centers) {

	let N = centers[0].length;

	drawing[0][0] = centers[0][N]; 
	drawing[1][0] = centers[1][N]; 
}

//TODO write function to update the whole bunch of circles
function updateBunch() {
}

