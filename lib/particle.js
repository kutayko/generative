class Particle {
    constructor(resolution) {
        this.pos = createVector(random(width), random(height));
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);

        this.prePos = this.pos.copy();

        this.resolution = resolution;
        this.maxSpeed = 4;
    }

    update() {
        this.prePos = this.pos.copy();

        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);

        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    applyForce(force) {
        this.acc.add(force);
    }

    follow(flowField) {
        let col = floor(this.pos.x / this.resolution);
        let row = floor(this.pos.y / this.resolution);
        this.applyForce(flowField[row][col]);
    }

    show() {
        stroke(0, 5);

        line(this.prePos.x, this.prePos.y, this.pos.x, this.pos.y);

        this.pos.x = this.pos.x > width ? 0 : this.pos.x;
        this.pos.x = this.pos.x < 0 ? width : this.pos.x;
        this.pos.y = this.pos.y > width ? 0 : this.pos.y;
        this.pos.y = this.pos.y < 0 ? width : this.pos.y;
    }
}