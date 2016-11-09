var audio_context; // establish as global var
var numBins = 1024; // must divide evenly into the float32 array size

$(document).ready(function() {
	audioRecorder.boot();

	// make 'Record Sample' button work
	$("#recordSample").click(function() {
		bang();
	});
});

function bang() {
	// record audio
	audioRecorder.recordSample(4096);
}
function bangContinued(recordedSample) {
	// make fingerprint
	var acousticSpectralFingerprint = fingerprintMaker.getFingerprint(recordedSample);
	var binnedFingerprint = bins.fitInto(acousticSpectralFingerprint, numBins)
	test = binnedFingerprint;
}

bins = {

	fitInto : function(fullDetailSpectrum, numberOfBins) {
		var ret = new Float32Array(numberOfBins);
		// bin by averaging... not sure if that's the correct way
		var binSize = fullDetailSpectrum.length / numberOfBins;
		// hillibilly error handling
		if (!Number.isInteger(binSize)) { console.log('bins must be whole numbers!'); debugger;}
		var sum = 0;
		for (var i = 0, j = 0; i < fullDetailSpectrum.length; i++) {
			sum += fullDetailSpectrum[i];
			if ((i + 1) % binSize === 0) {
				ret[j] = sum / binSize; // avg
				sum = 0; //reset
				j++;
			}
		}
		return ret;
	}
}

fingerprintMaker = {
	getFingerprint : function(sample) {
		var fft = new FFT(sample.length, 44100);
		fft.forward(sample);
		return fft.spectrum;	
	}
}

var test = new Float32Array(1024);

audioRecorder = {

	recordSample : function(sampleLength) {

		var millisecondsToRecord = (sampleLength * 2) / 44.1; // get twice as much to approximate
		
		// record
		recorder && recorder.record();

		// after millisecondsToRecord, stop recording and get data
		setTimeout(function() {
			recorder && recorder.stop();

			recorder.getBuffer(function(buffer) {
				var bufferArray = buffer[0]; // get only first channel and fill var
				// initialize return array and fill
				ret = new Float32Array(sampleLength);
				// fillBufferArray();
				for (let i = 0; i < sampleLength; i++) {
					ret[i] = bufferArray[i]; // will leave the left over behind.
				}

				// before returning, clear the recording buffer
				recorder.clear();
				bangContinued(ret) // keep going
				
			});

		}, millisecondsToRecord);


	},

	// helper to boot
	startUserMedia : function(stream) {
		var input = audio_context.createMediaStreamSource(stream);
		console.log('Media stream created.');
		recorder = new Recorder(input);
		console.log('Recorded initialized.');
	},

	// boot, init
	boot : function() {
		try {
			window.AudioContext = window. AudioContext || window.webkitAudioContext;
			navigator.getUserMedia = navigator.getUserMedia || navigator.webkidGetUserMedia;
			window.URL = window.URL || window.webkitURL;

			audio_context = new AudioContext;
			console.log('Audio context set up!');
			console.log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));
		} catch(e) {
			alert('No web audio support in browser. So none of this will work.');
		}

		navigator.getUserMedia({audio: true}, this.startUserMedia, function(e) {
			console.log('No live audio input: ' + e);
		});
	}
}

// test 
var arr = [];

function eq(x) {
	return Math.sin(2 * Math.PI * 440 * x);
}

for (let i = 0; i < 44100; i++) {
	arr.push(eq(i / 44100));
}

// console.log(arr);



// console.log(spectrum);


function setup() {
	createCanvas(500, 500);
}

function draw() {
	beginShape();
	for (let i = 0; i < test.length; i++) {
		var x = (i / test.length) * 500;
		var y = 500 - (test[i] * 500);
		vertex(x, y);
	}
	endShape();
}