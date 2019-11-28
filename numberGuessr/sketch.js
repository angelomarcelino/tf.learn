let net;
const CANVAS_WIDTH = 400, CANVAS_HEIGHT = 400;

function setup() {
	createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
	background(0);

	net = new Network([3, 7, 12]);

	// const data = tf.tensor([0, 0, 127, 255], [2, 2]);
	// data.print();

}

function draw() {
	background(0);
	net.draw();
}

