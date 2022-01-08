let sketch = new p5((p) => {

    // Colors
    let bgColor = [40, 50, 97];
    let fgColor = [210, 29, 22];

    p.setup = function () {
        p.createCanvas(600, 600);
        p.colorMode(p.HSL);
        p.background(...bgColor);
        p.stroke(...fgColor);

        p.strokeWeight(2);
        p.noFill();

        maxCircles = 1000000;

        let minDiameter = 5;
        let maxDiameter = 300;
        let circles = [];

        let i = 0;
        while (i < maxCircles) {
            let d = p.random(minDiameter, maxDiameter);
            let x = p.random(d / 2, p.width - d / 2);
            let y = p.random(d / 2, p.height - d / 2);

            let pos = p.createVector(x, y);
            let circle = new Circle(p, pos, d);

            let noOverlap = circles.every((c) => !Circle.overlaps(circle, c));
            if (noOverlap) {
                circles.push(circle);
                circle.draw();
            }

            i++;
        }
    };

    p.draw = function () {

    };

}, 'p5Container');

class Circle {
    constructor(p, pos, d) {
        this.p = p;
        this.pos = pos;
        this.d = d;
    }

    draw() {
        this.p.circle(this.pos.x, this.pos.y, this.d);
    }

    static overlaps(c1, c2) {
        let diffVector = p5.Vector.sub(c1.pos, c2.pos);
        let distance = c1.d / 2 + c2.d / 2;
        return diffVector.mag() < distance;
    }
}