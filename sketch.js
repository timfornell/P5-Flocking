const flock = [];
let sliders = {};
let sliderValues = {};

function setup() {
   createCanvas(1200, 500);

   sliders = {
      "detDistance": createSlider(1, height, value=20, step=1),
      "maxSteeringForce": createSlider(0.05, 1, value=0.05, step=0.05),
      "maxVelocity": createSlider(0.5, 10, value=2, step=0.5),
      "collAvoidance": createSlider(0, 100, value=10, step=0.5),
      "alignment": createSlider(0, 100, value=10, step=0.5),
      "centerAdjust": createSlider(0, 100, value=10, step=0.5)
   };

   offset = width / Object.keys(sliders).length;
   sliders.detDistance.position(10 + 0, height + 10);
   sliders.maxSteeringForce.position(10 + offset, height + 10);
   sliders.maxVelocity.position(10 + 2 * offset , height + 10);
   sliders.collAvoidance.position(10 + 3 * offset, height + 10);
   sliders.alignment.position(10 + 4 * offset, height + 10);
   sliders.centerAdjust.position(10 + 5 * offset, height + 10);

   sliderValues = {
      "detDistance": createP(),
      "maxSteeringForce": createP(),
      "maxVelocity": createP(),
      "collAvoidance": createP(),
      "alignment": createP(),
      "centerAdjust": createP()
   };

   sliderValues.detDistance.position(10 + 0, height + 20);
   sliderValues.maxSteeringForce.position(10 + offset, height + 20);
   sliderValues.maxVelocity.position(10 + 2 * offset , height + 20);
   sliderValues.collAvoidance.position(10 + 3 * offset, height + 20);
   sliderValues.alignment.position(10 + 4 * offset, height + 20);
   sliderValues.centerAdjust.position(10 + 5 * offset, height + 20);

   for (let i = 0; i < 200; i++) {
      flock.push(new Boid(random(0, width), random(0, height), i));
   }
}

function draw() {
   background(51);

   updateParameters();

   for (let boid of flock) {
      boid.move(flock);
      boid.draw();
   }
}

function updateParameters() {
   let parameters = {
      "detDistance": sliders.detDistance.value(),
      "maxSteeringForce": sliders.maxSteeringForce.value(),
      "maxVelocity": sliders.maxVelocity.value(),
      "collAvoidance": sliders.collAvoidance.value(),
      "alignment": sliders.alignment.value(),
      "centerAdjust": sliders.centerAdjust.value()
   };

   sliderValues.detDistance.html("detDistance: " + parameters.detDistance);
   sliderValues.maxSteeringForce.html("maxSteeringForce: " + parameters.maxSteeringForce);
   sliderValues.maxVelocity.html("maxVelocity: " + parameters.maxVelocity);
   sliderValues.collAvoidance.html("collAvoidance: " + parameters.collAvoidance);
   sliderValues.alignment.html("alignment: " + parameters.alignment);
   sliderValues.centerAdjust.html("centerAdjust: " + parameters.centerAdjust);

   Boid.updateParameters(parameters);
}