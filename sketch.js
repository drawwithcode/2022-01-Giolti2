//array posto a contenere i riferimenti
//virtuali ai cerchi in movimento
var circles = [];

//array posto a contenere le specifiche
//per creare le linee
var lines = [];

//how many lines I want
let lineNumber = 5

function preload() {
  // put preload code here

  for(let i = 0; i < lineNumber; i++){
    lines.push(randomLine())
  }
}

function circleTimer(){
  let maxTime = 4000;
  let minTime = 1000;

  setTimeout(function(){
    circles.push(randomCircle());
    assignCircle(circles[circles.length-1], random(lines))
    circleTimer();
  }, random(minTime, maxTime))
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // put setup code here

  circleTimer();
}

function draw() {
  // put drawing code here
  background(230,209,94);

  lines.forEach(element => drawLine(element))
  
  circles.forEach(element => updateCircle(element))

  //elimina i cerchi fuori dall'area
  circles = circles.filter(element => Math.abs(element.distance) < (width*2))
}

//funzione per creare linee in base
//alle specifiche di lines[]
function drawLine(obj) {
  //se non è definito un colore, imposta il nero
  if (obj.color) {
    stroke(obj.color)
  }
  else {
    stroke(0)
  }

  //se non è definito un peso, imposta 5
  if (obj.weight) {
    strokeWeight(obj.weight)
  }
  else {
    strokeWeight(5)
  }

  //disegna la linea con riferimento alle dimensioni della finestra
  line(obj.x1*windowWidth, obj.y1*windowHeight, obj.x2*windowWidth, obj.y2*windowHeight)
}

//funzione che crea linee di direzione e colore casuale
//may drop this
function randomLine() {

  let randLine = {
    x1: 0, x2: 1,
    y1: 0, y2: 0,
    color: color(random(0, 255), random(0, 255), random(0, 255)),
    weight: 8,
    startLeft: 1
  }

  let direction = Math.round(random());

  randLine.startLeft = direction;

  //true if going right
  if (direction) {
    randLine.y1 = random(0, 0.7);
    randLine.y2 = random(randLine.y1, 1);
  }
  else {
    randLine.y2 = random(0, 0.7);
    randLine.y1 = random(randLine.y2, 1);
  }

  return randLine;
}

//funzione che crea cerchi di dimensione e colore casuale
function randomCircle() {
  const maxRadius = 70;
  const minRadius = 20;

  //unità al secondo 
  const maxSpeed = 250;
  const minSpeed = 80;

  console.log(frameRate())

  let randCircle = {
    radius: random(minRadius, maxRadius),
    color: color(random(0, 255), random(0, 255), random(0, 255)),
    center: { x: 0, y: 0 }, //inherited from line
    speed: random(minSpeed, maxSpeed)/frameRate(),
    angle: 0, //inherited from line
    distance: -200, //updated dynamically
    startLeft: 0 //inherited from line
    }
  
  return randCircle
}

//funzione che associa a un cerchio una linea da seguire
function assignCircle(obj, follow) {

  //SCREW VECTORS DO NOT TOUCH
  /*let vect1 = createVector(follow.x1*width, follow.y1*height);
  let vect2 = createVector(follow.x2*width, follow.y2*height);
  let angle = vect1.angleBetween(vect2)*/

  //console.log(vect1)
  //console.log(vect2)

  //get angle by trigonometry
  let angle = Math.abs(follow.y2*height - follow.y1*height) / dist(follow.x1*width, follow.y1*height, follow.x2*width, follow.y2*height);
  angle = Math.asin(angle)

  if(!follow.startLeft){
    angle = Math.PI - angle;
  }

  console.log("angle: "+angle*180/Math.PI)

  if(follow.startLeft){
    obj.center.x = follow.x1 * width;
    obj.center.y = follow.y1 * height;
  }
  else{
    obj.center.x = follow.x2 * width;
    obj.center.y = follow.y2 * height;
  }
  
  obj.angle = angle;

  obj.startLeft = follow.startLeft

  console.log(obj)
}

//funzione che aggiorna il movimento dei cerchi
function updateCircle(obj) {
  push();

  translate(obj.center.x, obj.center.y);
  rotate(obj.angle);

  noStroke();
  fill(obj.color);

  circle(obj.distance, (obj.radius+4)*(1-obj.startLeft*2), obj.radius*2);

  obj.distance += obj.speed;

  pop();
}