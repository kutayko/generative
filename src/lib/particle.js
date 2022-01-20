class Particle {
    constructor(x, y) {
        this.pos = createVector(random(width), random(height));
        // this.vel = createVector(0, 0);
        this.vel = p5.Vector.random2D();
        this.acc = createVector(0, 0);
    }

    update() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    applyForce(force) {
        this.acc.add(force)
    }

    show() {
        strokeWeight(4);

        this.pos.x = this.pos.x > width ? 0 : this.pos.x;
        this.pos.x = this.pos.x < 0 ? width : this.pos.x;
        this.pos.y = this.pos.y > width ? 0 : this.pos.y;
        this.pos.y = this.pos.y < 0 ? width : this.pos.y;

        point(this.pos.x, this.pos.y);
        
        strokeWeight(1);
    }
}