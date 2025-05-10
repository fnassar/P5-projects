// M_2_3_02
//
// Generative Gestaltung – Creative Coding im Web
// ISBN: 978-3-87439-902-9, First Edition, Hermann Schmidt, Mainz, 2018
// Benedikt Groß, Hartmut Bohnacker, Julia Laub, Claudius Lazzeroni
// with contributions by Joey Lee and Niels Poldervaart
// Copyright 2018
//
// http://www.generative-gestaltung.de
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * draws a modulated lissajous curve
 *
 * MOUSE
 * position x        : number of points
 *
 * KEYS
 * d                 : draw mode
 * 1/2               : frequency x -/+
 * 3/4               : frequency y -/+
 * arrow left/right  : phi -/+
 * 7/8               : modulation frequency x -/+
 * 9/0               : modulation frequency y -/+
 * s                 : save png
 */

// is a directive that enables strict mode in JavaScript.
// It helps catch common coding errors and prevents the use of certain error-prone features.
// In this context, it's ensuring that the code follows stricter parsing and error handling rules.

"use strict";

var sketch = function (p) {
  var pointCount = 500;
  var freqX = 1;
  var freqY = 4;
  var phi = 1;

  var modFreqX = 1;
  var modFreqY = 1;
  var modulationPhi = 0;

  var angle;
  var x;
  var y;
  var w;
  var maxDist;
  var oldX;
  var oldY;

  var drawMode = 2;

  let myWid = 600;
  let myHei = 600;

  let maxAmpLevel = 0.1;
  let maxFreqLevel = 0;
  let freq;

  p.preload = function () {
    // Load the MP3 file
    p.soundFile = p.loadSound(
      "./assets/804988__cvltiv8r__bassbeat-140bpm.wav",
      () => console.log("Sound loaded successfully"),
      (error) => console.error("Error loading sound:", error)
    );
  };

  p.setup = function () {
    let cnv = p.createCanvas(800, 800);
    maxDist = p.sqrt(p.sq(myWid / 2 - 50) + p.sq(myHei / 2 - 50));
    cnv.mousePressed(p.playSound);
    p.soundFile.loop();
    p.amplitude = new p5.Amplitude();
    p.fft = new p5.FFT();
  };

  p.draw = function () {
    p.updatefreqVar();

    // freqX = p.mouseX / 200;
    // freqY = p.mouseY / 200;
    freqX = p.map(p.amplitude.getLevel(), 0, maxAmpLevel, 1, 4);
    freqY = p.map(freq, 0, maxFreqLevel, 1, 4);
    pointCount = p.width;
    p.strokeWeight(8);
    for (var i = 0; i <= pointCount; i++) {
      let fc = p.frameCount % 1000;
      let hue = p.noise(i / 100, fc / 100, fc / 1000) * 155;
      p.colorMode(p.HSB, 100);
      p.stroke(hue, 100, 100, 50);
      angle = p.map(i, 0, pointCount, 0, p.TAU);
      x = p.cos(angle * freqX + p.radians(phi)) * p.sin(angle * modFreqX);
      y = p.cos(angle * freqY) * p.sin(angle * modFreqY);
      x *= myWid / 2 - 50;
      y *= myHei / 2 - 50;
      if (i > 0) {
        w = p.dist(x, y, 0, 0);
        // p.stroke((i % 2) * 2, p.map(w, 0, maxDist, 255, 0));
        p.line(oldX, oldY, x, y);
      }
      oldX = x;
      oldY = y;
    }
  };

  // p.keyPressed = function () {
  //   console.log("mouseX", p.mouseX);
  //   console.log("mouseY", p.mouseY);
  // };

  p.playSound = function () {
    if (!p.soundFile.isPlaying()) {
      console.log("Playing sound");
      p.soundFile.play();
    } else {
      p.soundFile.stop();
    }
    // Your code to listen to the MP3 file and update the variables goes here
  };

  p.updatefreqVar = function () {
    let spectrum = p.fft.analyze();
    let nyquist = p.sampleRate() / 2;
    let maxAmp = 0;
    let maxIndex = 0;
    for (let i = 0; i < spectrum.length; i++) {
      if (spectrum[i] > maxAmp) {
        maxAmp = spectrum[i];
        maxIndex = i;
      }
    }
    freq = maxIndex * (nyquist / spectrum.length); // Dominant frequency in Hz
    // console.log("Dominant Frequency: " + freq.toFixed(2) + " Hz", 10, 20);

    if (p.amplitude.getLevel() > maxAmpLevel) {
      maxAmpLevel = p.amplitude.getLevel();
    }
    if (freq > maxFreqLevel) {
      maxFreqLevel = freq;
    }

    p.background(10);

    p.translate(p.width / 2, p.height / 2);

    pointCount = myWid * 2 + 200;
  };
};

var myp5 = new p5(sketch);
