const MAIN_CANVAS_SIZE = 400;
const CANVAS_SIZE= 28;
const PIXEL_SIZE = 10;

let numCanvas;

let trainingData;
  
// let trainingEntry = { "data": [] };
// let cont = 0;
// let trainingSize = 10;
// let dataSize = 0;

const NNoptions = {
//	dataUrl: 'trainingData/xizis.json',
	task: 'classification',
	activationHidden: 'sigmoid',
	activationOutput: 'sigmoid',
//	debug: true,
	learningRate: 0.25,
	inputs: 784,
	outputs: 10,
//	noVal: null,
	hiddenUnits: 72,
//	modelMetrics: ['accuracy'],
	modelLoss: 'meanSquaredError',
//	modelOptimizer: null,
	batchSize: 64,
	epochs: 32,
}

let neuralNetwork;

function preload() {
	trainingData = loadJSON('trainingData/xizis.json', Array);
}

function setup() {
	createCanvas(MAIN_CANVAS_SIZE, MAIN_CANVAS_SIZE);
	numCanvas = new NumCanvas(CANVAS_SIZE, PIXEL_SIZE);
	neuralNetwork = ml5.neuralNetwork(NNoptions);
	background(127);
	for (let i = 0; i < 100; i++){
		neuralNetwork.addData(trainingData.data[i].xs,trainingData.data[i].ys);
	}
	
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

function keyPressed(){
/*	if (keyCode == 32){
		let dataData = {"xs":[], "ys":[]}
		let img = [];
		let ysNum = []
		
		for (let i = 0; i < numCanvas.flatenedPixels.length; i++){
			img[i] = numCanvas.flatenedPixels[i].value;
		}
		dataData.xs = img;

		for (let i = 0; i < 10; i++){
			ysNum[i] = (i == cont ? 1 : 0);
		}
		dataData.ys = ysNum;

		trainingtrainingData.data.push(dataData);
		numCanvas.clearCanvas();
		
		dataSize++;
		
		if (dataSize == trainingSize){
			cont++;
			dataSize = 0;
			console.log(cont);
		}
		if (cont == 10) {
			console.log('FINISHED!');
			saveJSON(trainingEntry, 'xizis.json');
		}
	}
	else */ if (keyCode == BACKSPACE) {
		numCanvas.clearCanvas();
		neuralNetwork.train(whileTraining, doneTraining);
	}
	if (keyCode == ENTER) {
		let img = {"xs" : []};
		for (let i = 0; i < numCanvas.flatenedPixels.length; i++){
			img.xs[i] = numCanvas.flatenedPixels[i].value;
		}
		neuralNetwork.classify(img.xs, gotResults);
	}
}

function gotResults(error, results) {
	if (error) {
	  console.error(error);
	  return;
	}
	console.log(results);
}

function whileTraining(epoch, loss){
	console.log(`epoch: ${epoch}, loss:${loss}`);
}

function doneTraining(){
	  console.log('done!');
}
