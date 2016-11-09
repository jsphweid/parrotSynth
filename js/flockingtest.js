// Initialize Flocking and hold onto a reference
// to the environment.
var environment = flock.init();
environment.start();

var mySynth = flock.synth({
    synthDef: {
        ugen: "flock.ugen.writeBuffer",
    },
});

// // Record a 30 second, 4-channel audio file.
// var synth = flock.synth({
//     synthDef: {
//         ugen: "flock.ugen.writeBuffer",
//         options: {
//             duration: 30,
//             numOutputs: 4
//         },
//         buffer: "recording",
//         sources: [
//             {
//                 ugen: "flock.ugen.sin"
//             },
//             {
//                 ugen: "flock.ugen.square"
//             },
//             {
//                 ugen: "flock.ugen.tri"
//             },
//             {
//                 ugen: "flock.ugen.saw"
//             }
//         ]
//     }
// });
