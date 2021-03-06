////////////////////////////////////////////////////////////////////////////////////////////////////
//DRAW
////////////////////////////////////////////////////////////////////////////////////////////////////

function drawCircles(centers, radii, color, n) {

	for (let i = 1; i < n; i++) {
		stroke(color);
		noFill();
		ellipse(centers[0][i], centers[1][i], 2*radii[i], 2*radii[i]);

	}
}

function drawRadiusSegments(centers, radii, rotationRate, phases, color, n) {

	stroke(color);
	strokeWeight(styles.strokeWeightCurve);

	for (let i = 1; i < n; i++) {
		line(centers[0][i], centers[1][i], centers[0][i+1], centers[1][i+1]);
	}
	strokeWeight(styles.strokeWeightDefault);
} 

function drawPoints(centers) {
	for (let i = 1; i <= n; i++) {
		strokeWeight(styles.strokeWeightPoint);
		stroke(colors.point);
		point(centers[0][i], centers[1][i]);
		strokeWeight(styles.strokeWeightDefault);
	}
}


function drawCurve(drawing, colors, styles) {

	stroke(colors.drawing);
	strokeWeight(styles.strokeWeightCurve);

	for (let i = 0; i < drawing[0].length; i++) {
		line(drawing[0][i], drawing[1][i], drawing[0][i+1], drawing[1][i+1]);
	}
	strokeWeight(styles.strokeWeightDefault);
}

function drawBunchX(centers, radii, rotationRate, phases, colors, n) {
	//Draw circles, segments
	drawCircles(centers, radii, colors.circle, n);
	drawRadiusSegments(centers, radii, rotationRate, phases, colors.segment, n);
	stroke(colors.axis);
	xloc = centers[0][n];
	yloc = centers[1][n];
	line(xloc, yloc, xloc, height);
	drawPoints(centers);
}

function drawBunchY(centers, radii, rotationRate, phases, colors, n) {
	//Draw circles, segments
	drawCircles(centers, radii, colors.circle, n);
	drawRadiusSegments(centers, radii, rotationRate, phases, colors.segment, n);
	stroke(colors.axis);
	xloc = centers[0][n];
	yloc = centers[1][n];
	line(xloc, yloc, width, yloc);
	drawPoints(centers);
}



////////////////////////////////////////////////////////////////////////////////////////////////////
//INITIALISATION
////////////////////////////////////////////////////////////////////////////////////////////////////

function initCircleCentersX(offset, centers, radii, rotationRate, phases) {

	var reducer = (accumulator, currentValue) => accumulator + currentValue;	

	centers[0][0] = offset;
	centers[1][0] = radii[1]+radii[2]; 

	for (let i = 1; i <= radii.length; i++) {
		//X
		centers[0][i] = centers[0][i-1] + radii[i-1]*cos(rotationRate[i-1]*t + phases[i-1]); 	
		//Y
		centers[1][i] = centers[1][i-1] - radii[i-1]*sin(rotationRate[i-1]*t + phases[i-1]); 	
	}
}

function initCircleCentersY(offset, centers, radii, rotationRate, phases) {

	centers[0][0] = -radii[0]+radii[1]+radii[2]+radii[3];
	centers[1][0] = offset; 

	for (let i = 1; i < radii.length+1; i++) {
		//X
		centers[0][i] = centers[0][i-1] + radii[i-1]*cos(rotationRate[i-1]*t + phases[i-1]); 	
		//Y
		centers[1][i] = centers[1][i-1] - radii[i-1]*sin(rotationRate[i-1]*t + phases[i-1]); 	
	}
}



////////////////////////////////////////////////////////////////////////////////////////////////////
//UPDATE
////////////////////////////////////////////////////////////////////////////////////////////////////

function updateCircleCenters(centers, radii, rotationRate, phases, t) {
	for (let i = 1; i < radii.length+1; i++) {
		centers[0][i] = centers[0][i-1] + radii[i-1]*cos(rotationRate[i-1]*t + phases[i-1]); 	
		centers[1][i] = centers[1][i-1] + radii[i-1]*sin(rotationRate[i-1]*t + phases[i-1]); 	
	}
}


function updateCurve(drawing, offsetX, offsetY, radiiX, radiiY, phasesX, phasesY, t, n) {

	x = cosFourier(offsetX, radiiX, phasesX, t, n);
	y = sinFourier(offsetY, radiiY, phasesY, t, n);
	append(drawing[0], x);
	append(drawing[1], y);
}



////////////////////////////////////////////////////////////////////////////////////////////////////
//FOURRIER
////////////////////////////////////////////////////////////////////////////////////////////////////
//x = offsetX + radiiX[1]*cos(1*t + phaseX[1] + ... + radiiX[n]*cos(n*t + phaseX[n]))
//y = offsetY + radiiY[1]*sin(1*t + phaseY[1] + ... + radiiY[n]*sin(n*t + phaseY[n]))

function cosFourier(offset, radii, phase, t, n) {
	s = offset;
	for (i=1; i<n; i++) {
		s += radii[i]*cos(i*t + phase[i]);
	}
	return s;
}
 
function sinFourier(offset, radii, phase, t, n) {
	s = offset;
	for (i=1; i<n; i++) {
		s += radii[i]*sin(i*t + phase[i]);
	}
	return s;
}



////////////////////////////////////////////////////////////////////////////////////////////////////
//DATA PROCESSING
////////////////////////////////////////////////////////////////////////////////////////////////////

function pickString(result) {
	print(result)

	for (i=0; i<result.length-1; i++) {
		para.push(stringPara[i].split(' '));
	}

	para = transpose(para);

	for (i=0; i<para.length; i++) {
		for (j=0; j<para[0].length; j++) {
			para[i][j] = float(para[i][j]);
		}
	}

	//offsetX = para[0][0];
	//offsetY = para[2][0];
}

function transpose(matrix) {
	return matrix[0].map((col, i) => matrix.map(row => row[i]));
}
