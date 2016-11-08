// test 
var arr = [];

function eq(x) {
	return Math.sin(2 * Math.PI * 440 * x);
}

for (let i = 0; i < 44100; i++) {
	arr.push(eq(i / 44100));
}

console.log(arr);

var frameBufferSize = 4096;
var bufferSize = frameBufferSize/2;

var fft = new FFT(bufferSize, 44100);
var signal = new Float32Array(bufferSize);


for (let i = 0; i < bufferSize; i++) {
	signal[i] = arr[i];
}

fft.forward(signal);

var spectrum = fft.spectrum;

console.log(spectrum);


// function setup() {
// 	createCanvas(500, 500);
// }

// function draw() {
// 	beginShape();
// 	for (let i = 0; i < bufferSize; i++) {
// 		var x = (i / bufferSize) * 250;
// 		var y = 500 - (spectrum[i] * 250);
// 		vertex(x,y );
// 	}
// 	endShape();
// }