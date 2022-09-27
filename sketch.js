//array posto a contenere i riferimenti
//virtuali ai cerchi in movimento
var circles = [];

//array posto a contenere le specifiche
//per creare le linee
var lines = [];

function preload() {
  // put preload code here
  lines = [
    {
      x1: 0, x2: 1,
      y1: 0.45, y2: 0.8,
      color: color(126, 75, 114),
      weight: 7,
      isHorizontal: 1,
      startLeft: 1
    },
    {
      x1: 0, x2: 1,
      y1: 0.25, y2: 0.6,
      color: color(240, 75, 114),
      weight: 7,
      isHorizontal: 1,
      startLeft: 1
    }
  ]
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // put setup code here
}

function draw() {
  // put drawing code here
  background(230,209,94);

  lines.forEach(element => drawLine(element))
  
  noStroke()
  fill(255, 0, 0)
  circle()
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
function randomLine() {

  let randLine = {
    x1: 0, x2: 0,
    y1: 0, y2: 0,
    color: color(126, 75, 114),
    weight: 7,
    isHorizontal: 1,
    startLeft: 1
  }

  let orientation = Math.round(random());
  let direction = Math.round(random());

  if (orientation) {
    
  }
  else {
    
  }
}
//funzione che crea cerchi di dimensione e colore casuale
function randomCircle() {
  const maxRadius = 200;
  const minRadius = 100;

  //unità al secondo 
  const maxSpeed = 300;
  const minSpeed = 80;

  let randCircle = {
    radius: random(minRadius, maxRadius),
    color: color(random(0, 255), random(0, 255), random(0, 255)),
    center: { x: 0, y: 0 },
    speed: random(minSpeed, maxSpeed)/frameRate(),
    angle: 0,
    distance: 0
    }
  
  return randCircle
}

//funzione che associa a un cerchio una linea da seguire
function assignCircle(obj, follow) {
  let slope = (follow.y1 - follow.y2) / (follow.x1 - follow.x2)

  console.log(slope)
  console.log(Math.atan(slope))
}

//funzione che aggiorna il movimento dei cerchi
function updateCircle(obj) {

}