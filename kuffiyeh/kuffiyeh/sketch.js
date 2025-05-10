let rad = 3;
let wid = 28;
let hei = 40;
let xArr = [14, 28, 14, 0]; // 64 - 36 = 28 50-36 = 14
let yArr = [0, 20, 40, 20]; // 70 - 30 = 40

let squareX = 280;
let squareY = 500;

let offset = 0.1;
let xScale = 0.005;
let yScale = 0.005;

function setup() {
  createCanvas(800, 800);
  background(240);
  frameRate(10);
}

function draw() {
  background(240);
  noFill();
  let s = 5;
  let corners = [
    [width / 2, height / 2],
    [squareX, squareY],
  ];

  for (let i = 0; i < 3; i++) {
    stroke(0, 120);
    strokeWeight(5 + (i % 2) * 5);
    s = 5 + i * 3;
    corners[1] = [squareX + 8 * s, squareY + 8 * s];
    drawRects(corners);
  }

  stroke(10);
  strokeWeight(1);

  for (
    let i = (width - squareY) / 2;
    i < squareX + (width - squareY) / 2;
    i += wid
  ) {
    for (
      let j = (height - squareY) / 2 - hei / 4;
      j < squareY + (height - squareY) / 2 - hei / 4;
      j += hei
    ) {
      push();
      translate(i, j);
      drawBase();
      circleAtCoo(xArr[0], yArr[0]);
      circleAtCoo(xArr[1], yArr[1]);
      circleAtCoo(xArr[2], yArr[2]);
      circleAtCoo(xArr[3], yArr[3]);
      pop();
    }
  }
  console.log((width / 2 - (squareX + 8 * 12) / 2) / rad);
  for (let i = 0; i < width / 2 - (squareX + 8 * 12) / 2; i += rad * 7.6) {
    for (
      let j = height / 2 - (squareY + 8 * 4) / 2;
      j < height / 2 + squareY / 2;
      j += rad * 12
    ) {
      push();
      translate(0, 10);
      scale(1, 0.96);
      drawCurlyBase(i, j);
      pop();

      push();
      translate(width, 10);
      scale(-0.96, 0.96);
      drawCurlyBase(i, j);
      pop();
    }
  }

  for (let i = 0; i < width / 2 - (squareX + 8 * 20) / 2; i += rad * 7.6) {
    for (
      let j = height / 2 - (squareY + 8 * 4) / 2 + rad * 5.5;
      j < height / 2 + squareY / 2;
      j += rad * 12
    ) {
      push();
      translate(0, height - 10);
      rotate(-HALF_PI);
      scale(1, 1);
      drawCurlyBase(i, j);
      pop();

      push();
      translate(0, 10);
      rotate(HALF_PI);
      scale(1, -1);
      drawCurlyBase(i, j);
      pop();
    }
  }

  for (let i = 0; i < rad * 7.6 * 4; i += rad * 7.6) {
    for (let j = 5; j < rad * 12 * 3; j += rad * 12) {
      push();
      translate(0, height - 10);
      rotate(-HALF_PI);
      scale(1, 1);
      drawCurlyBase(i, j);
      pop();

      push();
      translate(0, 10);
      rotate(HALF_PI);
      scale(1, -1);
      drawCurlyBase(i, j);
      pop();

      push();
      translate(width - rad * 7.6 * 5, height - 10);
      rotate(-HALF_PI);
      scale(1, 1);
      drawCurlyBase(i, j);
      pop();

      push();
      translate(width - rad * 7.6 * 5, 10);
      rotate(HALF_PI);
      scale(1, -1);
      drawCurlyBase(i, j);
      pop();
    }
  }

  yScale = (yScale + 0.05) % 0.01;
  xScale = (xScale + 0.05) % 0.01;
  offset = (offset * frameCount * 0.01) % 0.05;
}

function circleAtCoo(x, y) {
  push();
  fill(0);
  translate(x, y);
  rotate(QUARTER_PI / 0.6);
  ellipse(0, 0, rad * 3.4, rad * 1.7);
  pop();
}

function drawBase() {
  beginShape();
  vertex(xArr[0], yArr[0]);
  bezierVertex(
    xArr[0], //x1
    yArr[0] + rad, //y1
    xArr[1], //x2
    yArr[1] - rad * 1.8, //y2
    xArr[1],
    yArr[1]
  );
  bezierVertex(
    xArr[1], //x1
    yArr[1] + rad * 1.8, //y1
    xArr[2], //x2
    yArr[2] - rad, //y2
    xArr[2],
    yArr[2]
  );
  bezierVertex(
    xArr[2],
    yArr[2] - rad,
    xArr[3],
    yArr[3] + rad * 1.8,
    xArr[3],
    yArr[3]
  );

  bezierVertex(
    xArr[3],
    yArr[3] - rad * 1.8,
    xArr[0],
    yArr[0] + rad,
    xArr[0],
    yArr[0]
  );
  endShape(CLOSE);
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

function drawRects(corner) {
  // rect 1
  // rect(width / 2, height / 2, squareX + rad * 8, squareY + rad * 12);
  // let rect = [
  //   [width / 2, height / 2],
  //   [squareX + 8 * stroke, squareY + 8 * stroke],
  // ];

  line(
    corner[0][0] - corner[1][0] / 2 + 12,
    0,
    corner[0][0] - corner[1][0] / 2 + 12,
    height
  );
  line(
    0,
    corner[0][1] - corner[1][1] / 2,
    width,
    corner[0][1] - corner[1][1] / 2
  );
  line(
    corner[0][0] + corner[1][0] / 2 - 8,
    0,
    corner[0][0] + corner[1][0] / 2 - 8,
    height
  );
  line(
    0,
    corner[0][1] + corner[1][1] / 2,
    width,
    corner[0][1] + corner[1][1] / 2
  );
}
