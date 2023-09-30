import { NeuralNetwork } from "./neuralNetwork.js";

const presets = {
	inputs: 2,
	layers: [16],
	outputs: 1,
	learningRate: 0.2,
	decimalPlaces: 5
}

let net = new NeuralNetwork(presets);
net.setActivationFunction([net.sigmoid, net.sigmoid]);

console.log(net);

const trainingData = [{
	inputs: [0, 0],
	targets: [0]
}, {
	inputs: [1, 1],
	targets: [0]
}, {
	inputs: [1, 0],
	targets: [1]
}, {
	inputs: [0, 1],
	targets: [1]
}]

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const pixelWidth = 100;
const pixelHeight = 100;

const pixelSize = 5;

canvas.width = pixelSize * pixelWidth;
canvas.height = pixelSize * pixelHeight;

function loop() {

	for (let i = 0; i < 5000; i++) {
		let data = trainingData[Math.round(Math.random() * (trainingData.length - 1))];
		net.train(data.inputs, data.targets);
	}

	for (let x = 0; x < pixelWidth; x++) {
		for (let y = 0; y < pixelHeight; y++) {

			let guess = net.predict([x / pixelWidth, y / pixelHeight]);
			let col = guess[0] * 255;

			ctx.fillStyle = "rgb(" + col + "," + col + "," + col + ")";
			ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);

		}
	}


	requestAnimationFrame(loop);
}

loop();
