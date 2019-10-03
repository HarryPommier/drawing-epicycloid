////////////////////////////////////////////////////////////////////////////////////////////////////
//DRAW
////////////////////////////////////////////////////////////////////////////////////////////////////

function drawCircles(centers, radii, color) {

	stroke(color);
	noFill();

	for (let i = 1; i < radii.length; i++) {
		ellipse(centers[0][i], centers[1][i], 2*radii[i], 2*radii[i]);
	}
}

function drawRadiusSegments(centers, radii, rotationRate, phases, color) {

	stroke(color);

	for (let i = 1; i < radii.length; i++) {
		line(centers[0][i], centers[1][i], centers[0][i+1], centers[1][i+1]);
	}
} 


function drawCurve(drawing, colors) {

	stroke(colors.drawing);

	for (let i = 0; i < drawing[0].length; i++) {
		line(drawing[0][i], drawing[1][i], drawing[0][i+1], drawing[1][i+1]);
	}
}

function drawBunchX(centers, radii, rotationRate, phases, colors) {
	//Draw circles, segments
	drawCircles(centers, radii, colors.circle);
	drawRadiusSegments(centers, radii, rotationRate, phases, colors.segment);
	stroke(colors.axis);
	xloc = centers[0][radii.length];
	yloc = centers[1][radii.length];
	line(xloc, yloc, xloc, height);
}

function drawBunchY(centers, radii, rotationRate, phases, colors) {
	//Draw circles, segments
	drawCircles(centers, radii, colors.circle);
	drawRadiusSegments(centers, radii, rotationRate, phases, colors.segment);
	stroke(colors.axis);
	xloc = centers[0][radii.length];
	yloc = centers[1][radii.length];
	line(xloc, yloc, width, yloc);
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


function updateCurve(drawing, offsetX, offsetY, radiiX, radiiY, phasesX, phasesY, t) {

	x = cosFourier(offsetX, radiiX, phasesX, t);
	y = sinFourier(offsetY, radiiY, phasesY, t);
	append(drawing[0], x);
	append(drawing[1], y);
	

}



////////////////////////////////////////////////////////////////////////////////////////////////////
//FOURRIER
////////////////////////////////////////////////////////////////////////////////////////////////////
//x = offsetX + radiiX[1]*cos(1*t + phaseX[1] + ... + radiiX[n]*cos(n*t + phaseX[n]))
//y = offsetY + radiiY[1]*sin(1*t + phaseY[1] + ... + radiiY[n]*sin(n*t + phaseY[n]))

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
		s += radii[i]*sin(i*t + phase[i]);
	}
	return s;
}



////////////////////////////////////////////////////////////////////////////////////////////////////
//DATA PROCESSING
////////////////////////////////////////////////////////////////////////////////////////////////////

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

	//offsetX = para[0][0];
	//offsetY = para[2][0];
	//print(offsetX)
	//print(offsetY)
}

function transpose(matrix) {
	return matrix[0].map((col, i) => matrix.map(row => row[i]));
}
