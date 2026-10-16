//creature
let shape;
let angle;
//background
let addW = 1;
let addS = 2;
let w = 0;
let s = 0;
let interactionRange = 150;
// Mouse avoidance
let vx = 1;
let vy = 2;
let escaping = false;
let escapeTimer = 0;
let changeDirection = 0;
function setup() {
  createCanvas(800, 500);
  shape = 0
  angle = 0
}

function draw() {

  //background
  background(0,150,225);
  drawBackgroundPattern()
  
  //changing shape of creature
  if (shape == 0) {
    drawCreature1(mouseX, mouseY);
  } 
  
  else if (shape == 1) {
  drawCreature2(mouseX, mouseY);
  } 
  
  else if (shape == 2) {
  drawCreature3(mouseX, mouseY)
  }
}
function drawBackgroundPattern() {
  // Moving white circle

let mouseDistance = dist(mouseX, mouseY, w, s);
let escapeRange = 100;
// When the mouse gets close
if (mouseDistance < escapeRange) {
  if (!escaping) {
    escaping = true;
    escapeTimer = 30;

    // Choose a random direction away from the mouse
    let fleeAngle = atan2(s - mouseY, w - mouseX);

    // Add randomness to the escape direction
    fleeAngle += random(-PI / 2, PI / 2);

    // Choose a random escape speed
    let speed = random(4, 9);

    vx = cos(fleeAngle) * speed;
    vy = sin(fleeAngle) * speed;
  }

  // Occasionally change direction while escaping
  if (frameCount % 8 == 0) {
    vx += random(-3, 3);
    vy += random(-3, 3);
  }

  escapeTimer = 30;
}

// When the mouse moves away, return to normal motion
if (mouseDistance >= escapeRange) {
  escapeTimer--;
}

if (escapeTimer <= 0) {
  escaping = false;
}

// Move the circle
if (escaping) {
  w += vx;
  s += vy;
} else {
  w += addW;
  s += addS;
}

// Bounce off the canvas edges
if (w > width - 10 || w < 10) {
  addW = -addW;
  vx = -vx;
  w = constrain(w, 10, width - 10);
}

if (s > height - 10 || s < 10) {
  addS = -addS;
  vy = -vy;
  s = constrain(s, 10, height - 10);
}

// Draw the circle
fill(255);
noStroke();
circle(w, s, 50);

  // Three moving red circles
  fill(250, 50, 1);

  let a = map(cos(frameCount*0.5 / 20), -1, 1, width * 0.0625, width * 0.9375);
  let c = map(sin(frameCount*0.5 / 20), -1, 1, height * 0.05, height * 0.95);

  circle(a, height / 2, 10);
  circle(width / 2, c, 10);
  circle(a, c, 50);

  // Four cyan circles with changing sizes
  push()
fill(1, 255, 255);
drawCyanCircle(width * 0.3125, height * 0.3125, 0);
drawCyanCircle(width * 0.6875, height * 0.3125, PI * 0.5);
drawCyanCircle(width * 0.6875, height * 0.6875, PI);
drawCyanCircle(width * 0.3125, height * 0.6875, PI * 1.5);
  pop()
}
function drawCreature1(x, y) {
  push();
  translate(x, y);
  drawBody(0, 0, 200);
  drawComponent(0,0)
  pop();
}

function drawCreature2(x, y) {
  push();
  translate(x, y);
  drawPeople(0,0)
  pop()
}
function drawCreature3(x, y) {
  push();
  translate(x, y);
  drawPlanet(0,0)
  pop()
}

//components
  //background cyan circle
function drawCyanCircle(x, y, phase) {
  
  let d = dist(mouseX, mouseY, x, y);
  let amp = map(constrain(d,0,interactionRange),0,interactionRange,50, 0);

  let size = map(sin(frameCount / 50 + phase),-1, 1,0, 50) + abs(sin(frameCount / 10)) * amp;

  circle(x, y, size);
}
  
//Creature1-Atom
function drawBody(x, y, size) {
  push();
  translate(x, y);
  rotate(frameCount * 0.1);
  fill(40)
  ellipse(0, 0, size, size * 1.1);
  pop()
}
function drawComponent(x,y){
  for (let i = 1; i <= 4; i++) {

    let diameter = i * 60;
    let radius = diameter / 2;

    noFill();
    stroke(0);
    ellipse(x, y, diameter/2, diameter/2);
    fill(0,0,255)
    circle(x,y,10)

    fill(0);
    noStroke();

    let angle = frameCount*0.01 + i * 30;

    rotate(angle);
    fill(random(0,255),random(0,255),random(0,255))
    circle(radius/2, 0, 20);
  }
}
  //Creature2-People
function drawPeople(x,y){
push();

  translate(x, y);
  angle += 1
  rotate(angle * 0.01);
  scale(6);
  translate(-20, -25);

  //hair
  fill(138,95,9)
  stroke(0);
  strokeWeight(2);
  spline(20,15,25,10,35,19,31,40);
  spline(20,15,15,10,5,19,11,40);
  
  //face
  strokeWeight(0)
  beginShape()
  fill(242,213,143)
  vertex(10,15)
  vertex(10,22.6)
  vertex(10,22.6)
  vertex(20,31.3)
  vertex(30,22.6)
  vertex(30,15)
  vertex(10,15)
  endShape(CLOSE)

  //ear
  arc(30, 19, 5, 5, 0, HALF_PI)
  arc(10, 19, 5, 5, HALF_PI,PI )
 
  //eyes
  fill(250,250)
  ellipse(25, 19, 5, 4)
  ellipse(15,19,5,4)

  fill(5,5,5)
  circle(25,19,3)
  circle(15,19,3)

  fill(250,250)
  circle(25,19.5,1)
  circle(15,19.5,1)
  
  //nose
  beginShape()
  strokeWeight(0.5)
  fill(280,213,143)
  vertex(18.5,19)
  vertex(18.5,24)
  vertex(21.5,24)
  vertex(21.5,19)
  endShape()

  //body
  strokeWeight(1)
  fill(90,9,138)
  triangle(20, 31.3, 10, 40, 30, 40);

  //mouth
  fill(235,121,78)
  stroke(0);
  strokeWeight(0.5);
  spline(17.5,26,20,29,25,24,23,31);

  //cheek
  stroke(26, 203, 232)
  strokeWeight(3);
  point(15, 23);
  point(25, 23);

  //hand
  fill(242,213,143);
  noStroke();
  square(10,34+sin(frameCount),4);
  square(25,34+sin(frameCount),4);
pop()
}
 
  //Creature3-Planet
function drawPlanet(x,y){
  push()
  translate(x,y);
  // Rotate the planet
  rotate(angle*0.01);

  // Draw the ring behind the planet
  noFill();
  stroke(200, 180, 130);
  strokeWeight(8);
  ellipse(0, 0, 220, 75);

  // Draw the planet
  noStroke();
  let r = map(mouseX, 0, width, 255, 0);
  let g = 0;
  let b = map(mouseY, 0, height, 0, 255);
  fill(r, g, b);
  ellipse(0, 0, 100, 100);

  // Update the rotation angle
  angle += 1;
  pop()
}

  function mousePressed() {
  shape++;
  if (shape > 2) {
    shape = 0;
  }
  }