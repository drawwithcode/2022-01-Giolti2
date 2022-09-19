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
    weight: 7
    },
    {
      x1: 0, x2: 1,
      y1: 0.25, y2: 0.6,
      color: color(240, 75, 114),
      weight: 7
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
  console.log(obj)
  if (obj.color) {
    stroke(obj.color)
  }
  else {
    stroke(0)
  }

  if (obj.weight) {
    strokeWeight(obj.weight)
  }
  else {
    strokeWeight(5)
  }

  line(obj.x1*windowWidth, obj.y1*windowHeight, obj.x2*windowWidth, obj.y2*windowHeight)
}
