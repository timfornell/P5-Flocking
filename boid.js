class Boid {
   // Tuning parameters
   static detectionDistance = 20;
   static maxSteeringForce = 0.1;
   static maxVelocity = 2;
   static collisionAvoidanceFactor = 0.05;
   static alignmentFactor = 1;
   static centerAdjustmentFactor = 1;

   constructor(x, y, id) {
      this.position = createVector(x, y);
      this.velocity = createVector(random(-2, 2), random(-2, 2));
      this.steeringForce = createVector(0, 0);
      this.id = id;
   }

   static updateParameters(parameters) {
      this.detectionDistance = parameters.detDistance;
      this.maxSteeringForce = parameters.maxSteeringForce;
      this.maxVelocity = parameters.maxVelocity;
      this.collisionAvoidanceFactor = parameters.collAvoidance;
      this.alignmentFactor = parameters.alignment;
      this.centerAdjustmentFactor = parameters.centerAdjust;
   }

   draw() {
      fill(255);
      circle(this.position.x, this.position.y, 10);
      line(
         this.position.x,
         this.position.y,
         this.position.x + 5 * this.velocity.x,
         this.position.y + 5 * this.velocity.y
      );
   }

   move(flock) {
      let neighbours = this.findNeighbours(flock);

      // Reset steering force from last iteration
      this.steeringForce = createVector(0, 0);
      this.adjustVelocityToNeighbours(neighbours);
      this.setVelocity();

      // To introduce some random movement
      // if (random(1) < 0.2) {
      //    this.velocity.setMag(random(2, 3));
      //    this.velocity.rotate(radians(random(-10, 10)));
      // }

      this.position.add(this.velocity);
      this.wrapPosition();
   }

   wrapPosition() {
      if (this.position.x < 0) {
         this.position.x = width;
      }

      if (this.position.x > width) {
         this.position.x = 0;
      }

      if (this.position.y < 0) {
         this.position.y = height;
      }

      if (this.position.y > height) {
         this.position.y = 0;
      }
   }

   setVelocity() {
      this.steeringForce.limit(Boid.maxSteeringForce);
      this.velocity.add(this.steeringForce);
      this.velocity.limit(Boid.maxVelocity);
   }

   clampPosition() {
      this.position.x = min(max(this.position.x, 0), width);
      this.position.y = min(max(this.position.y, 0), height);
   }

   adjustVelocityToNeighbours(neighbours) {
      if (neighbours.length == 0) {
         return;
      }

      let averageVelocity = createVector();
      let averagePosition = createVector();
      let collisionAvoidanceForce = createVector();

      for (let i = 0; i < neighbours.length; i++) {
         let boid = neighbours[i];
         averageVelocity.add(boid.velocity);
         averagePosition.add(boid.position);

         let diff = this.position.copy();
         diff.sub(boid.position);
         diff.div(diff.mag() + 0.01);
         collisionAvoidanceForce.add(diff);
      }

      // Alignment with the average heading
      averageVelocity.div(neighbours.length);
      averageVelocity.sub(this.velocity);
      averageVelocity.mult(Boid.alignmentFactor);
      this.steeringForce.add(averageVelocity);

      // Aim towards average position of flock
      averagePosition.div(neighbours.length);
      averagePosition.sub(this.position);
      averagePosition.mult(Boid.centerAdjustmentFactor);
      this.steeringForce.add(averagePosition);

      // Try and avoid neighbours
      collisionAvoidanceForce.mult(Boid.collisionAvoidanceFactor);
      this.steeringForce.add(collisionAvoidanceForce);
   }

   findNeighbours(flock) {
      let neighbours = [];

      for (let i = 0; i < flock.length; i++) {
         let boid = flock[i];

         if (boid == this) {
            continue;
         }

         let diff = this.position.copy();
         diff.sub(boid.position);

         let distance = sqrt(diff.x ** 2 + diff.y ** 2);
         if (distance <= Boid.detectionDistance) {
            neighbours.push(boid);
         }
      }

      return neighbours;
   }
}