let cPtX = 100;
let cPtY = 100;
let img;
let r = 3;
let outHeight = r * 12;
let outWidth = r * 7;

let offset = 0.0001;
let xScale = 0.0005;
let yScale = 0.0005;

function preload() {
  img = loadImage("./../image.png");
}
// D:\P5-projects\kuffiyeh\image.png

function setup() {
  createCanvas(800, 800);
  imageMode(CORNER);
  stroke(0);
  strokeWeight(1);
  fill(150);
  background(240);
  frameRate(10);
}
function draw() {
  background(240);
  yScale = (yScale + 0.0005) % 0.01;
  xScale = (xScale + 0.0005) % 0.01;
  offset = (offset * frameCount * 0.0001) % 0.05;
  for (let i = 0; i < width / 2 - (500 + 8 * 20) / 2; i += r * 7.6) {
    for (
      let j = height / 2 - (500 + 8 * 4) / 2 + r * 5.5;
      j < height / 2 + 500 / 2;
      j += r * 12
    ) {
      ellipse(i, j, actHeight, actHeight);
    }
  }
}

function drawCurlyBase(i, j) {
  let outHeight = rad * 12;
  let noiseVale = noise(i * xScale, j * yScale, offset);
  for (let n = 0; n < 2; n++) {
    push();
    fill(0);
    if (n == 0) {
      translate(i, j);
      scale(1, 1);
    } else {
      translate(i, j + outHeight);
      scale(1, -1);
    }
    beginShape();
    vertex(rad * 0.1 * noiseVale, rad * 6);
    bezierVertex(rad * 1, rad * 6, rad * 2.5, rad * 5, rad * 2.5, rad * 3);
    bezierVertex(rad * 2.5, rad * 0.5, rad * 3, 0, rad * 7, rad * 0);
    bezierVertex(rad * 4, rad, rad * 5, rad * 2, rad * 5, rad * 3);
    bezierVertex(
      rad * 5.5,
      rad * 5,
      rad * 5,
      rad * 5.5,
      rad * 3 * noiseVale,
      rad * 6
    );
    endShape();
    pop();
    //
  }
}
