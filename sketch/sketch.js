const MAIN_CANVAS_SIZE = 400;
const CANVAS_SIZE= 28;
const PIXEL_SIZE = 10;

let numCanvas;

function setup() {
	createCanvas(MAIN_CANVAS_SIZE, MAIN_CANVAS_SIZE);
	numCanvas = new NumCanvas(CANVAS_SIZE, PIXEL_SIZE);
	background(127);
}

function draw() {
	background(127);
	numCanvas.draw();
	if (mouseIsPressed){
		if (mouseX >= numCanvas.offset && mouseY >= numCanvas.offset){
			if (mouseX <=  width - numCanvas.offset && mouseY <= height - numCanvas.offset)
			numCanvas.paintNearest(mouseX, mouseY);
		}
	}
}
