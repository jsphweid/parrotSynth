# parrotSynth
Synth that tries to imitate the timbre of a sound it hears.

# Initial Plan
1. Input
	- going to need to gather a short sample of input at a tone, say 440hz to start
	- perform fft on this and make a fingerprint of sort

2. Synth
	- use flocking js
	- establish basic 'synth skeleton'
	- generate thousands of samples with randomized settings
	- compare each to the original fingerprint (one with least differences) using fft
	- (get most similar and figure out if it can get even closer?)
 	- (possibly repeat that process a lot?)

